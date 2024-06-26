import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import BookMark from "@/pages/BookMark";
import BrandDetail from "@/pages/BrandDetail";
import ScrollToTop from "@/hooks/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QnA from "@/pages/QnA";
// import Landing from "@/pages/Landing";
import OathProcessor from "@/pages/OathProcessor";
import CopyDetail from "@/pages/CopyDetail";
import Login from "@/pages/Login";
import Toast from "@/components/Toast";

import { Suspense } from "react";
import Portal from "@/utils/portal";
import {
  isLogined,
  toastPopup,
  loginModalOverlay,
  brandModalOverlay,
  isBigWindow,
} from "@/utils/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import HomeSkeleton from "@/pages/Skeleton/HomeSkeleton";
import SearchSkeleton from "@/pages/Skeleton/SearchSkeleton";
import WIP from "@/pages/WIP";
import MobileViewHome from "@/pages/MobileView/Home";

const HookingRouter = () => {
  const toastOpen = useRecoilValue(toastPopup);
  const isLogin = useRecoilValue(isLogined);
  const windowState = useRecoilValue(isBigWindow);
  const [loginModal, setLoginModal] = useRecoilState(loginModalOverlay);
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);

  const handleClose = () => setLoginModal(false);
  const handleCopyClose = () => setBrandModal(false);

  const routes = [
    // {
    //   path: "/",
    //   name: "Landing",
    //   component: <Landing />,
    // },
    {
      path: "/",
      name: "Home",
      component:
        windowState === 2 ? (
          <MobileViewHome />
        ) : (
          <Suspense fallback={<HomeSkeleton />}>
            <Home />
          </Suspense>
        ),
    },
    {
      path: "/search",
      name: "Search",
      component: (
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
      ),
    },
    {
      path: "/bookmark",
      name: "BookMark",
      component: isLogin ? <BookMark /> : <Navigate to="/" />,
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
    {
      path: "/writing",
      name: "WIP",
      component: <WIP />,
    },
    {
      path: "/profile",
      name: "WIP",
      component: <WIP />,
    },
  ];

  return (
    <>
      <Router>
        <ScrollToTop />
        {windowState !== 2 && <Header />}
        <Routes>
          {routes.map((route, key) => (
            <Route
              key={`router-${key}`}
              path={route.path}
              element={route.component}
            />
          ))}
          <Route
            path="/*"
            element={<>NOTFOUND</>} // TODO: 404 페이지 작업 후 교체
          />
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
        {windowState === 2 ? <>MOBILEFOOTER</> : <Footer />}
      </Router>
    </>
  );
};

export default HookingRouter;
