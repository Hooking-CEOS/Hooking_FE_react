import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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
import CopyDetail from "@/pages/CopyDetail";
import Login from "@/pages/Login";
import Toast from "@/components/Toast";

import Portal from "@/utils/portal";
import {
  isLogined,
  toastPopup,
  loginModalOverlay,
  brandModalOverlay,
} from "@/utils/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import { useEffect } from "react";

const HookingRouter = () => {
  const toastOpen = useRecoilValue(toastPopup);
  const isLogin = useRecoilValue(isLogined);
  const [loginModal, setLoginModal] = useRecoilState(loginModalOverlay);
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);

  const handleClose = () => setLoginModal(false);
  const handleCopyClose = () => setBrandModal(false);

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
      component: isLogin ? <Profile /> : <Navigate to="/home" />,
    },
    {
      path: "/bookmark",
      name: "BookMark",
      component: isLogin ? <BookMark /> : <Navigate to="/home" />,
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
        {loginModal && (
          <Portal selector="#portal">
            <Login onClose={handleClose} />
          </Portal>
        )}
        {brandModal && (
          <Portal selector="#portal">
            <CopyDetail onClose={handleCopyClose} />
          </Portal>
        )}
        {toastOpen && <Toast />}
        <Footer />
      </Router>
    </>
  );
};

export default HookingRouter;
