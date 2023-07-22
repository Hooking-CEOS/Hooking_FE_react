import styled from "styled-components";

interface ILHBProps {
  onClick: () => void;
}

const LandingHomeBtn = ({ onClick }: ILHBProps) => {
  return (
    <LandingHomeBtnWrapper onClick={onClick}>
      바로 살펴보기
    </LandingHomeBtnWrapper>
  );
};

export default LandingHomeBtn;

const LandingHomeBtnWrapper = styled.div`
  width: 16.5rem;
  height: 6rem;
  background-color: ${(props) => props.theme.colors.point};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  font-size: 1.8rem;
  font-weight: 500;
  line-height: 3.2rem;
  position: absolute;
  right: 18rem;
  bottom: 28rem;
  cursor: pointer;
`;
