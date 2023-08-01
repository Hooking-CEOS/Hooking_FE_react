import { useNavigate } from "react-router-dom";
import SearchBar from "@/components/Search/SearchBar";
import Button from "@/components/Button";
import ProfileDropDown from "@/components/ProfileDropDown";

import styled from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import {
  HEADER_HEIGHT_MO,
  Z_INDEX_HEADER,
  HEADER_LEFT_MENU,
} from "@/utils/constants";
import {
  activeMenu,
  activeChildMenu,
  loginModalOverlay,
  isLogined,
} from "@/utils/atom";

const Header = () => {
  const navigate = useNavigate();

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const setLoginModal = useSetRecoilState(loginModalOverlay);
  const setActiveChildMenuIdx = useSetRecoilState(activeChildMenu);
  const isLogin = useRecoilValue(isLogined);

  const handleLogin = () => setLoginModal(true);

  const MENU = {
    landing: { name: "landing", path: "/", idx: -1 },
    home: { name: "home", path: "/home", idx: 0 },
  };

  return (
    <HeaderWrapper>
      <div className="header__wrap">
        <div className="header__content--left">
          <Button
            icon="icon-logo"
            text=""
            onClick={() => {
              setActiveChildMenuIdx(-1);
              let curMenu = !isLogin ? MENU.landing : MENU.home;
              setActiveMenuIdx(curMenu.idx);
              navigate(curMenu.path);
            }}
          />
          <ul>
            {HEADER_LEFT_MENU.map((menu) => (
              <li key={`menu-li-${menu.idx}`}>
                <Button
                  key={`menu-button-${menu.idx}`}
                  text={menu.name}
                  className={`button-${
                    activeMenuIdx === menu.idx ? "black" : "white"
                  } component-small`}
                  onClick={() => {
                    setActiveMenuIdx(menu.idx);
                    setActiveChildMenuIdx(-1);
                    navigate(menu.path);
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <div className="header__content--center">
          <SearchBar />
        </div>
        <div className="header__content--right">
          {isLogin ? (
            <ProfileDropDown className="" />
          ) : (
            <Button
              text="로그인"
              className="button-orange-outline text-subtitle-1"
              onClick={handleLogin}
            />
          )}
        </div>
      </div>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  height: ${HEADER_HEIGHT_MO};
  z-index: ${Z_INDEX_HEADER};
  background-color: ${(props) => props.theme.colors.white};

  .header__wrap {
    display: flex;
    align-items: center;
    height: 5.4rem;
    margin: 1.6rem 0;
    padding: 0 4rem;

    .header__content--left {
      display: flex;
      align-items: center;
      margin-right: 5.4rem;

      .icon-logo {
        margin-right: 1rem;
      }
      ul {
        display: flex;
      }
    }

    .header__content--center {
      display: flex;
      margin: auto;
      width: 100%;
      max-width: 100.9rem;
    }

    .header__content--right {
      min-width: fit-content;
      margin-left: 10rem; // TODO: 로그인 헤더랑 비교해서 margin-left 수정
      flex: 1;
      margin-right: auto;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
