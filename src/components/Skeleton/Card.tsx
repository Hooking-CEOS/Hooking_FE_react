import styled from "styled-components";
import SkeletonItem from "./SkeletonItem";
//import S from "@/components/BrandCard";

// TODO: 레이아웃 모듈화
export const Card = () => {
  return (
    <BrandCardWrapper>
      <div className="card-content">
        <GreyBox width={"250px"} />
        <GreyBox width={"202px"} style={{ marginTop: "8px" }} />
        <GreyBox width={"298px"} style={{ marginTop: "25px" }} />
        <GreyBox width={"250px"} style={{ marginTop: "15px" }} />
      </div>

      <div className="card-brand">
        <span className="brand-icon">
          <Circle className="brand-img" />
          <GreyBox width={"70px"} />
        </span>
      </div>
    </BrandCardWrapper>
  );
};

const GreyBox = styled(SkeletonItem)<{ width: string }>`
  display: flex;
  width: ${(props) => props.width};
  height: 16px;
  background-color: #e5e6eb;
`;

const Circle = styled(SkeletonItem)`
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 50%;
  background-color: #e5e6eb;
`;

const BrandCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 37.8rem;
  max-width: 100%;

  min-height: 27.8rem;
  padding: 3.8rem 4rem;

  border: 0.025rem solid ${(props) => props.theme.colors.black40};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  .card-content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .card-brand {
    display: flex;
    align-items: center;
    padding-top: 2.4rem;
    position: absolute;
    bottom: 2.6rem;
    width: calc(100% - 8rem);
    border-top: 1px solid #0002351f;
    justify-content: space-between;

    .brand-icon {
      min-height: 4.8rem;
      gap: 1rem;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
