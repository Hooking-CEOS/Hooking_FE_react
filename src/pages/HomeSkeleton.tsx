import Filter from "@/components/Filter";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import styled from "styled-components";
import Carousel from "@/components/Carousel";

const HomeSkeleton = () => {
  return (
    <>
      <CarouselDiv>
        <Carousel />
      </CarouselDiv>
      <section className="main">
        <Filter />
        <BrandCards>
          {Array.from({ length: 9 }, () => Array(0).fill(0)).map((el, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </BrandCards>
      </section>
    </>
  );
};

export default HomeSkeleton;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-top: 3rem;
`;

const CarouselDiv = styled.div`
  width: 100%;
  /* height: 360px; */
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(0, 2, 53, 0) 0%,
    rgba(0, 2, 53, 0.03) 100%
  );
`;
