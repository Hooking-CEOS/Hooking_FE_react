import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import ProfileDropDown from "@/components/ProfileDropDown";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { activeMenu, activeChildMenu } from "@/utils/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { HEADER_HEIGHT_MO, Z_INDEX_HEADER } from "@/utils/constants";

const Header = () => {
  const navigate = useNavigate();

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const setActiveChildMenuIdx = useSetRecoilState(activeChildMenu);

  const HEADER_LEFT_MENU = [
    {
      idx: 0,
      path: "/",
      name: "홈",
    },
    {
      idx: 1,
      path: "/writing",
      name: "글쓰기",
    },
  ];

  /**
   * Home: 0,
   * Writing: 1,
   * 그외 Prifle: 2
   * (내계정, 북마크, 문의)
   *
   */

  return (
    <HeaderWrapper>
      <div className="header__wrap">
        <div className="header__content--left">
          <Button
            icon="icon-logo"
            text=""
          />
          <Button
            className={`${
              activeMenuIdx === 0 ? "button-black" : "button-white"
            } component-small`}
            onClick={() => {
              setActiveMenuIdx(0);
              setActiveChildMenuIdx(-1);
              navigate("/");
            }}
            text="홈"
          />
          <Button
            className={`${
              activeMenuIdx === 1 ? "button-black" : "button-white"
            } component-small`}
            onClick={() => {
              setActiveMenuIdx(1);
              setActiveChildMenuIdx(-1);
              navigate("/writing");
            }}
            text="글쓰기"
          />
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
