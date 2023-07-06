import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Profile from "@/pages/Profile";
import Writing from "@/pages/Writing";
import BookMark from "@/pages/BookMark";
import QnA from "@/pages/QnA";

const routes = [
  {
    path: "/",
    name: "Home",
    component: <Home />,
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
