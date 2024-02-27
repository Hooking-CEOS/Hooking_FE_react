import FloatingBrandIcon from "@/assets/images/icon-floating-brand_component";
import FloatingMypageIcon from "@/assets/images/icon-floating-mypage_component";
import FloatingSearchIcon from "@/assets/images/icon-floating-search_component";
import FloatingWriteIcon from "@/assets/images/icon-floating-write_component";
import styled from "styled-components";

const MobileFloatingBar = () => {
  return (
    <MobileFloatingBarWrapper>
      <FloatingBarContent>
        <span className="iconArea">
          <FloatingSearchIcon />
        </span>
        <span className="iconArea">
          <FloatingBrandIcon />
        </span>
        <span className="iconArea">
          <FloatingWriteIcon />
        </span>
        <span className="iconArea">
          <FloatingMypageIcon />
        </span>
      </FloatingBarContent>
    </MobileFloatingBarWrapper>
  );
};

export default MobileFloatingBar;

const MobileFloatingBarWrapper = styled.div`
  position: fixed;
  width: 100%;
  padding: 0 0.8rem;
  bottom: 3.2rem;
  box-sizing: border-box;
  height: 6rem;
`;

const FloatingBarContent = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #fff;
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.black5};
  border-radius: 60px;
  box-shadow: 0px 6px 40px 0px #ededf1;
  padding: 0 4rem;
  justify-content: space-between;
  align-items: center;
  .iconArea {
    height: 100%;
    aspect-ratio: 1/1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;