import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getNewsDetails } from '../services/NewsService';
import { useSelector} from 'react-redux'
import { selectIsDarkMode } from '../store/themeSlice';

const NewsItem = () => {
  const { newsId } = useParams();
  const [newsDetails, setNewsDetails] = useState(null);
  const isDarkMode = useSelector(selectIsDarkMode);

  useEffect(() => {
    const fetchNewsDetails = async () => {
        console.log('newsid in newsItem: ',newsId)
      try {
        // Fetch detailed news data using newsId
        const detailsData = await getNewsDetails(newsId);
        setNewsDetails(detailsData); // Set the detailed news data in state
      } catch (error) {
        console.error('Error fetching news details:', error);
      }
    };

    fetchNewsDetails();
  }, [newsId]);

  // Display loading or error message while fetching data
  if (!newsDetails) {
    return <div >Loading...</div>;
  }

  return (
    <div className={` ${isDarkMode ? 'bg-gray-800 text-white h-full' : 'bg-white text-black'}`}>
       <div className={`container mx-auto min-h-screen`}>
      <h2 className="text-3xl font-bold mb-4">{newsDetails.title}</h2>
      <p className={`${isDarkMode ? 'text-white': "text-gray-600"} 'mb-2'`}>{newsDetails.publishedAt}</p>
      <img src={newsDetails.urlToImage} alt="News" className="w-full rounded-md mb-4" />
      <p className={`${isDarkMode ? 'text-white': "text-gray-600"} 'mb-4'`}>{newsDetails.description}</p>
      <p className={`${isDarkMode ? 'text-white': "text-gray-600"} `}>{newsDetails.content}</p>

    </div>
    </div>
   
  );
};

export default NewsItem;


