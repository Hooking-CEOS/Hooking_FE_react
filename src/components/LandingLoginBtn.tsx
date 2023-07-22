import styled from "styled-components";

interface ILandingLoginBtn {
  onClick: () => void;
}

const LandingLoginBtn = ({ onClick }: ILandingLoginBtn) => {
  return (
    <LandingLoginBtnWrapper onClick={onClick}>
      <span className="textArea">로그인하기</span>
    </LandingLoginBtnWrapper>
  );
};

export default LandingLoginBtn;

const LandingLoginBtnWrapper = styled.div`
  width: 18rem;
  height: 6rem;
  border: 1px solid ${(props) => props.theme.colors.point};
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  .textArea {
    color: ${(props) => props.theme.colors.point};
    font-size: 1.8rem;
    font-weight: 500;
  }
  position: absolute;
  left: 0;
  cursor: pointer;
`;
