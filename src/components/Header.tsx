import SearchBar from "@/components/SearchBar";
import Button from "@/components/Button";
import ProfileDropDown from "@/components/ProfileDropDown";

import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { HEADER_HEIGHT_MO, Z_INDEX_HEADER } from "@/utils/constants";

const Header = () => {
  const navigate = useNavigate();
  return (
    <HeaderWrapper>
      <div className="header__wrap">
        <div className="header__content--left">
          <div className="icon-logo" />
          <Button
            className="button-black-1 text-normal-600"
            onClick={() => navigate("/")}
            text="홈"
          />
          <Button
            className="button-white text-normal-600"
            onClick={() => navigate("/")}
            text="글쓰기"
          />
        </div>
        <div className="header__content--center">
          <SearchBar />
        </div>
        <div className="header__content--right">
          <ProfileDropDown />
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

  .header__wrap {
    display: flex;
    margin: 1.6rem 0;
    padding: 0 3rem;

    .header__content--left {
      display: flex;
      align-items: center;

      .icon-logo {
        margin-right: 2.4rem;
      }
    }

     .header__content--center{
      display: flex;
      margin: auto;
     }
    }
  }
`;
