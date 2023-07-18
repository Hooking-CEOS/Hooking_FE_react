import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import Writing from "@/pages/Writing";
import BookMark from "@/pages/BookMark";
import BrandDetail from "@/pages/BrandDetail";
import ScrollToTop from "@/hooks/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QnA from "@/pages/QnA";
import Landing from "@/pages/Landing";
import OathProcessor from "@/pages/OathProcessor";

const routes = [
  {
    path: "/",
    name: "Landing",
    component: <Landing />,
  },
  {
    path: "/home",
    name: "Home",
    component: <Home />,
  },
  {
    path: "/search",
    name: "Search",
    component: <Search />,
  },
  {
    path: "/profile",
    name: "Profile",
    component: <Profile />,
  },
  {
    path: "/bookmark",
    name: "BookMark",
    component: <BookMark />,
  },
  {
    path: "/writing",
    name: "Writing",
    component: <Writing />,
  },
  {
    path: "/qna",
    name: "QnA",
    component: <QnA />,
  },
  {
    path: "/brand/:brandId",
    name: "Brand",
    component: <BrandDetail />,
  },
  {
    path: "/oath-processor",
    name: "fetchData",
    component: <OathProcessor />,
  },
];

const HookingRouter = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          {routes.map((route, key) => (
            <Route
              key={`router-${key}`}
              path={route.path}
              element={route.component}
            />
          ))}
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default HookingRouter;
