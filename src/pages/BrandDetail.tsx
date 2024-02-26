import { useParams } from "react-router-dom";
import styled from "styled-components";

import { getBrandDetail } from "@/api/brand";

import BrandBanner from "@/components/Brand/BrandBanner";
import BrandCard from "@/components/Brand/BrandCard";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import { useEffect, useRef, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
  brandModalOverlay,
  search,
  searchModalOverlay,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import { ICardData } from "@/utils/type";
import { getBrandById } from "@/utils/util";
import { useInView } from "react-intersection-observer";

interface IBrandData {
  brandId: number;
  brandLink: string;
  brandName: string;
}

const BrandDetail = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandData, setBrandData] = useState<IBrandData>();
  const [cardData, setCardData] = useState<ICardData[]>([]);
  const [noResult, setNoResult] = useState<boolean>();
  const [nomoreData, setNomoreData] = useState<boolean>(false);
  const [renderSkeleton, setRenderSkeleton] = useState<boolean>(false);
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
  const setOverlay = useSetRecoilState(searchModalOverlay);
  const setDetailOverlay = useSetRecoilState(brandModalOverlay);
  const [searchState, setSearchState] = useRecoilState(search);
  let targetData = getBrandById(Number(brandId));
  console.log("target", targetData);
  const [ref, inView] = useInView();
  const pageNum = useRef(0);
  const handleBrandOpen = (card: any) => {
    let target = {
      brandName: card.brandName,
      cardLink: card.cardLink,
      createdAt: card.createdAt,
      id: card.id,
      index: 0,
      isScrap: card.isScrap,
      scrapCnt: card.scrapCnt,
      text: card.text,
    };

    setSelectedCopy(target);
    setSimilarCopy(
      cardData
        .filter((el) => el.id !== card.id)
        .map((item: any) => ({
          brandName: item.brandName,
          cardLink: item.cardLink,
          createdAt: item.createdAt,
          id: item.id,
          index: 0,
          isScrap: item.isScrap,
          scrapCnt: item.scrapCnt,
          text: item.text,
        }))
    );
    setBrandModal(true);
  };

  const getBrandCard = async (pageNum: number) => {
    const res = await getBrandDetail(targetData.api_id, pageNum);
    // console.log(res);
    if (res.response?.status === 400) {
      setNomoreData(true);
    } else {
      setCardData((prev) => [...prev, ...res.card]);
      setBrandData({
        brandId: res.brandId,
        brandLink: res.brandLink,
        brandName: res.brandName,
      });
      setRenderSkeleton(false);
    }
  };

  // 브랜드 상세 페이지 카드
  useEffect(() => {
    // TODO : 해당 브랜드에서 검색창 연 다음에 브랜드 icon 클릭했을 때 예외처리 필요함
    setSearchState({ ...searchState, searchFocus: false });
    setOverlay(false);
    setDetailOverlay(false);
    getBrandCard(pageNum.current);
  }, [brandId]);

  useEffect(() => {
    if (inView) {
      setRenderSkeleton(true);
      pageNum.current += 1;
      getBrandCard(pageNum.current);
    }
  }, [inView]);

  return targetData ? (
    brandData ? (
      <>
        <BrandBanner
          name={targetData.name_kr}
          link={brandData.brandLink}
        />
        <section className="main">
          <BrandCards>
            {brandData && cardData.length > 0
              ? cardData.map((card) => (
                  <BrandCard
                    key={card.id}
                    brandId={card.id}
                    text={card.text}
                    scrapCnt={card.scrapCnt}
                    isScrap={card.isScrap}
                    brandImg={require(`../assets/images/brandIcon/brand-${brandData.brandName.replace(
                      / /g,
                      ""
                    )}.png`)}
                    brandName={brandData.brandName}
                    onClick={() => handleBrandOpen(card)}
                  />
                ))
              : Array.from({ length: 9 }, () => Array(0).fill(0)).map(
                  (el, idx) => <SkeletonCard key={idx} />
                )}
            {!nomoreData &&
              (renderSkeleton ? (
                Array.from({ length: 3 }, () => Array(0).fill(0)).map(
                  (el, idx) => <SkeletonCard key={idx} />
                )
              ) : (
                <div
                  className="observedDiv"
                  ref={ref}
                />
              ))}
          </BrandCards>
        </section>
      </>
    ) : (
      <>
        <BrandBanner
          name={targetData.name_kr}
          link=""
        />
        <section className="main">
          <BrandCards>
            {Array.from({ length: 12 }, () => Array(0).fill(0)).map(
              (el, idx) => (
                <SkeletonCard key={idx} />
              )
            )}
          </BrandCards>
        </section>
      </>
    )
  ) : (
    <>
      <BrandBanner
        name="skeleton"
        link=""
      />
      <section className="main">
        <BrandCards>
          {Array.from({ length: 12 }, () => Array(0).fill(0)).map((el, idx) => (
            <SkeletonCard key={idx} />
          ))}
        </BrandCards>
      </section>
    </>
  );
};

export default BrandDetail;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 3rem;
  margin-top: 3rem;
`;
