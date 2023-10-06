import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { activeMenu, isLogined } from "@/utils/atom";
import { useNavigate } from "react-router-dom";
import { setCookie } from "@/hooks/cookies";

const OathProcessor = () => {
  const Navigate = useNavigate();
  const setIsLogin = useSetRecoilState(isLogined);
  const setActiveMenuIdx = useSetRecoilState(activeMenu);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    let url = window.location.href;
    let token = url.split("=")[1]?.split("&")[0];
    let firstLogin = url.split("=")[2];

    if (token !== undefined && firstLogin !== undefined) {
      setActiveMenuIdx(0);
      setCookie("userToken", token);
      setIsLogin(true);
      Navigate("/home");
    } else {
      Navigate("/");
      alert("로그인에 실패했습니다.");
    }
  };

  return <>Loading...</>;
};

export default OathProcessor;
