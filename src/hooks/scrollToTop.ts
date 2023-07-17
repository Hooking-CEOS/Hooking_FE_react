import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  console.log("[pathname]", pathname);

  useEffect(() => {
    const app = document.querySelector(".app");
    if (app) {
      console.log("[app]", app);

      app.scrollTop = 0;
    }
  }, [pathname]);

  return null;
};

export default ScrollToTop;
