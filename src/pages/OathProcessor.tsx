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
    // http://localhost:3000/?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIyOTE2NDc5OTQwIiwicm9sZXMiOiJST0xFX1VTRVIiLCJpYXQiOjE2ODk2NjI1NDUsImV4cCI6MTY4OTc0ODk0NX0.owXMwQC3F4iPDOajgNc9UL-LByHNLozZMoG_B_Ru3ls&firstLogin=false
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
