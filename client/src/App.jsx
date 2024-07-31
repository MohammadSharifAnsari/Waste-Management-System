import { Navbar,Header,Instruction,Footer,AboutCards,ArticleCards,ContentSection,ArticalSection,DisplayArticals,PageIndex,SignForm,
} from "./components";

import { RouterProvider,createBrowserRouter } from "react-router-dom";
import Layout from "./Layout.jsx"


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
        path: 'Content/:id',
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
function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <- Home Page -> */}
      {/* <Navbar />
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
      <Footer />  */}

      {/* Article Page */}
      {/* <Navbar />
      <Header
        coverHeading="Explore Resources"
        coverContent="Discover practical tips for composting, reducing single-use plastics, and more."
        coverHeight="short"
        coverImageUrl="/images/article_cover.jpg"
      />
      <ArticalSection />
      <PageIndex />
      <Footer /> */}

      {/* Article Display Page */}
      {/* <Navbar />
      <Header
        coverHeading="Explore Resources"
        coverContent="Discover practical tips for composting, reducing single-use plastics, and more."
        coverHeight="short"
        coverImageUrl="/images/article_cover.jpg"
      />
      <DisplayArticals />
      <PageIndex index={1} length={12}/>
      <Footer /> */}

      {/* SignIn Page */}
      {/* <Navbar />
      <SignForm /> */}
    </>
  );
}

export default App;
