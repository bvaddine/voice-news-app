import axios from "axios";

const API_KEY = "5506e762f23e40448413da2207ca58fb";
// const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

export const getNews = async ({ page = 1, pageSize = 10 } = {}) => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        apiKey: API_KEY,
        page,
        pageSize,
      },
    });
    console.log("Response for news page: ", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Error fetching news");
  }
};

export const getTotalNews = async () => {
  try {
    const response = await axios.get(`https://newsapi.org/v2/top-headlines`, {
      params: {
        country: "us",
        apiKey: API_KEY,
      },
    });
    console.log("response data:", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Error fetching news");
  }
};

export const getNewsDetails = async (newsId) => {
  console.log("newsid in service", newsId);
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything`, {
      params: {
        apiKey: API_KEY,
        q: newsId,
      },
    });
    // Return the first result as the detailed news data
    console.log("response date in newsitem: ", response.data);
    return response.data.articles[0];
  } catch (error) {
    throw error;
  }
};
