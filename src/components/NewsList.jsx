import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSpeechRecognition } from 'react-speech-recognition';
import { getNews, getTotalNews } from "../services/NewsService";
import { useSelector} from 'react-redux'
import { selectIsDarkMode } from '../store/themeSlice';

import { v4 as uuidv4 } from "uuid";

const NewsList = () => {

  const isDarkMode = useSelector(selectIsDarkMode);
  const { transcript, resetTranscript} = useSpeechRecognition();
  const [news, setNews] = useState([]);
  const [totalResults, setTotalResults] = useState(0)
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {

    // Convert the transcript to lowercase for case-insensitive matching
    const command = transcript.toLowerCase();

    // Check if the command is in the map
    if (command.includes('first page')) {
      // Move to the next page
      setCurrentPage(1);
      resetTranscript();
    }else if (command.includes('last page')) {
      // Move to the next page
      setCurrentPage(4);
      resetTranscript();
    }
    else if (command.includes('next page')) {
      // Move to the next page
      setCurrentPage((prevPage) => Math.min(prevPage + 1, 10));
      resetTranscript();
    }else if (command.includes('previous page')) {
      // Move to the previous page
      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      resetTranscript();
    }else if (command.includes('go to page')) {
      // Extract the page number from the voice command
      const matches = command.match(/\d+/);
      if (matches) {
        const requestedPage = parseInt(matches[0], 10);
        // Move to the requested page if it's within the valid range
        setCurrentPage((prevPage) => Math.min(Math.max(requestedPage, 1), 10));
        resetTranscript();
      }
      
    }

    const fetchTotalResults = async () => {
      try {
        const totalResultsData = await getTotalNews();
        setTotalResults(totalResultsData.totalResults);
      } catch (error) {
        console.error('Error fetching total results:', error);
      }
    };
    const fetchNews = async () => {
      try {
        const newsData = await getNews({ page: currentPage });
        setNews(newsData.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    fetchTotalResults();
    fetchNews();
    
  }, [currentPage,transcript,resetTranscript]);

  const totalPages = Math.ceil(totalResults / itemsPerPage);

  return (
    <div className={`contianer ${isDarkMode? 'text-white bg-gray-800 pb-4':'text-black'}`}>
      <div>
      <h2 className="text-2xl font-bold mb-4 text-center">Latest News</h2>
      <div className="mx-auto max-w-screen-lg h-full sapce-y-4">
        {news.map((article) => (
          <div key={uuidv4()} className="border-b border-gray-300 mb-4 pb-4">
            <Link to={`/news/${article.title}`}>
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-600 mb-2">{article.publishedAt}</p>
              <p>{article.description}</p>
            </Link>
          </div>
        ))}
      </div>
      </div>
      <div>
      <div className="mb-4 text-center">
        {currentPage > 1 && (
          <Link
            to={`/news?page=${currentPage - 1}`}
            className="mr-2 px-4 py-2 rounded-md bg-gray-200"
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            {"<<"}
          </Link>
        )}
        
        {Array.from({ length: Math.min(totalPages, 10) }, (_, index) => (
          <Link
            to={`/news?page=${index + 1}`}
            key={index + 1}
            className={`mr-2 px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </Link>
        ))}

        {currentPage < totalPages && (
          <Link
            to={`/news?page=${currentPage + 1}`}
            className="mr-2 px-4 py-2 rounded-md bg-gray-200"
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            {">>"}
          </Link>
        )}
      </div>
      </div>
    
    </div>
  );
};

export default NewsList;
