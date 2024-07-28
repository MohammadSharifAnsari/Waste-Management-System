import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Layout from "./Layout.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Header,
  Instruction,
  AboutCards,
  ArticleCards,
  ContentSection,
  ArticalSection,
  DisplayArticals,
  PageIndex,
  SignForm,
} from "./components/index.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: (
          <>
            <Header
              coverHeading="Waste Less, Recycle More: Your Path to Sustainable Living"
              coverContent="Join our community in reducing waste and making a positive impact on
              the planet. Track your waste, find recycling centers, and access
              valuable resources to help you live more sustainably."
              allowLink
            />
            <Instruction />
            <AboutCards />
            <ArticleCards />
          </>
        ),
      },
      {
        path: "resourses",
        element: (
          <>
            <Header
              coverHeading="Explore Resources"
              coverContent="Discover practical tips for composting, reducing single-use plastics, and more."
              coverHeight="short"
              coverImageUrl="/images/article_cover.jpg"
            />
            <DisplayArticals />
            <PageIndex index={1} length={12} />
          </>
        ),
      },
      {
        path: "signIn",
        element: <SignForm />,
      },
      {
        path: "Content",
        element: (
          <>
            <Header
              coverHeading="Explore Resources"
              coverContent="Discover practical tips for composting, reducing single-use plastics, and more."
              coverHeight="short"
              coverImageUrl="/images/article_cover.jpg"
            />
            <ArticalSection />
            <PageIndex />
          </>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
