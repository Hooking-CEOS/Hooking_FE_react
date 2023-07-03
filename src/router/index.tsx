import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import MyPage from "@/pages/MyPage";

const routes = [
  {
    path: "/",
    name: "Home",
    component: <Home />,
  },
  {
    path: "/mypage",
    name: "Home",
    component: <MyPage />,
  },
];

const HookingRouter = () => {
  return (
    <Router>
      {routes.map((route, key) => (
        <Routes key={key}>
          <Route
            path={route.path}
            element={route.component}
          />
        </Routes>
      ))}
    </Router>
  );
};

export default HookingRouter;
