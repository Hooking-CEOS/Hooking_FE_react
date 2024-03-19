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
import { BrowserView, MobileView } from "react-device-detect";

import { Suspense } from "react";
import Portal from "@/utils/portal";
import {
  isLogined,
  toastPopup,
  loginModalOverlay,
  brandModalOverlay,
  mobileFilterModalOverlay,
} from "@/utils/atom";
import { useRecoilValue, useRecoilState } from "recoil";
import HomeSkeleton from "@/pages/Skeleton/HomeSkeleton";
import SearchSkeleton from "@/pages/Skeleton/SearchSkeleton";
import WIP from "@/pages/WIP";
import MobileViewHome from "@/pages/MobileView/Home";
import FilterModal from "@/pages/MobileView/FilterModal";
import MobileLogin from "@/pages/MobileView/Login";
import MobileBrandList from "@/pages/MobileView/BrandList";
import MobileBrandDetail from "@/pages/MobileView/BrandDetail";
// import MobileFooter from "@/components/MobileView/Footer";
// import MobileFloatingBar from "@/components/MobileView/FloatingBar";

const HookingRouter = () => {
  const toastOpen = useRecoilValue(toastPopup);
  const isLogin = useRecoilValue(isLogined);
  const [loginModal, setLoginModal] = useRecoilState(loginModalOverlay);
  const [brandModal, setBrandModal] = useRecoilState(brandModalOverlay);
  const [mobileFilterModal, setMobileFilterModal] = useRecoilState(
    mobileFilterModalOverlay
  );

  const handleClose = () => setLoginModal(false);
  const handleCopyClose = () => setBrandModal(false);

  const mobileRoutes = [
    {
      path: "/",
      name: "Home",
      component: <MobileViewHome />,
    },
    {
      path: "/login",
      name: "Login",
      component: <MobileLogin />,
    },
    {
      path: "/mobile/brand",
      name: "BrandList",
      component: <MobileBrandList />,
    },
    {
      path: "/brand/:brandId",
      name: "BrandDetail",
      component: <MobileBrandDetail />,
    },
    {
      path: "/*",
      name: "NOTFOUND",
      component: <WIP />,
    },
  ];

  const routes = [
    // {
    //   path: "/",
    //   name: "Landing",
    //   component: <Landing />,
    // },
    {
      path: "/",
      name: "Home",
      component: (
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
    {
      path: "/*",
      name: "NOTFOUND",
      component: <WIP />,
    },
  ];

  return (
    <>
      <BrowserView>
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
      </BrowserView>
      <MobileView style={{ height: "100%" }}>
        <Router>
          <Routes>
            {mobileRoutes.map((route, key) => (
              <Route
                key={`router-${key}`}
                path={route.path}
                element={route.component}
              />
            ))}
          </Routes>
          <>
            {mobileFilterModal && (
              <Portal selector="#portal">
                <FilterModal />
              </Portal>
            )}
          </>
        </Router>
      </MobileView>
    </>
  );
};

export default HookingRouter;
