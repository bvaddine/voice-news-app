import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Bookmarks from './components/Bookmarks';
import NewsList from './components/NewsList';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NewsItem from './components/NewsItem';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        index: true,
        element: <NewsList />,
      },
      {
        path: "news",
        element: <NewsList />,
      },
      {
        path: "news/:newsId",
        element: <NewsItem />,
      },
      {
        path: "bookmarks",
        element: <Bookmarks />,
      },
      {
        path: "notifications",
        element: <Notifications />,
      },
      {
        path: "settings",
        element: <Settings />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
