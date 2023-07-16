import Login from "@/pages/Login";
import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import ProfileDropDown from "@/components/ProfileDropDown";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState, useSetRecoilState } from "recoil";

import {
  HEADER_HEIGHT_MO,
  Z_INDEX_HEADER,
  HEADER_LEFT_MENU,
} from "@/utils/constants";
import { activeMenu, activeChildMenu, loginModalOverlay } from "@/utils/atom";
import Portal from "@/utils/portal";

const Header = () => {
  const navigate = useNavigate();

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const [loginModal, setLoginModal] = useRecoilState(loginModalOverlay);
  const setActiveChildMenuIdx = useSetRecoilState(activeChildMenu);

  const handleLogin = () => setLoginModal(true);
  const handleClose = () => setLoginModal(false);

  // TODO: 랜딩페이지 > 로그인 헤더 만들기
  return (
    <HeaderWrapper>
      <div className="header__wrap">
        <div className="header__content--left">
          <Button
            icon="icon-logo"
            text=""
          />
          {loginModal && (
            <Portal selector="#portal">
              <Login onClose={handleClose} />
            </Portal>
          )}
          {HEADER_LEFT_MENU.map((menu) => (
            <Button
              key={menu.idx}
              className={`component-small ${
                activeMenuIdx === menu.idx ? "button-black" : "button-white"
              }`}
              onClick={() => {
                setActiveMenuIdx(menu.idx);
                setActiveChildMenuIdx(-1);
                navigate(menu.path);
              }}
              text={menu.name}
            />
          ))}
        </div>
        <div className="header__content--center">
          <SearchBar />
        </div>
        <div className="header__content--right">
          <ProfileDropDown className="" />
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
    padding: 0 1.9rem 0 4rem;

    .header__content--left {
      display: flex;
      align-items: center;
      margin-right: 5.4rem;

      .icon-logo {
        margin-right: 1rem;
      }
    }

     .header__content--center{
      display: flex;
      margin: auto;
      width: 100%;
      max-width: 100.9rem;
     }

     .header__content--right{
      margin-left: 10rem;
     }
    }
  }
`;
