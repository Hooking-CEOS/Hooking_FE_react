import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import styled from "styled-components";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";

const SearchSkeleton = () => {
  return (
    <section className="main qna">
      <div className="qna-copy">
        <div className="qna-copy__wrap">
          <div className="search-result-tab">
            <div className="tab-wrap">
              <GreyBox width={"125px"} style={{ marginTop: "15px" }} />
              <GreyBox
                width={"193px"}
                style={{ marginLeft: "48px", marginTop: "15px" }}
              />
            </div>
          </div>
          <BrandCards>
            {Array.from({ length: 9 }, () => Array(0).fill(0)).map(
              (el, idx) => (
                <SkeletonCard key={idx} />
              )
            )}
          </BrandCards>
        </div>
      </div>
    </section>
  );
};

export default SearchSkeleton;

const GreyBox = styled(SkeletonItem)<{ width: string }>`
  display: flex;
  width: ${(props) => props.width};
  height: 30px;
  background-color: #e5e6eb;
`;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  max-width: 119.4rem;
  height: auto;
  grid-gap: 3rem;
  place-items: center;
`;
