import { useParams } from "react-router-dom";
import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";

import { getBrandDetail } from "@/api/brand";

import BrandBanner from "@/components/Brand/BrandBanner";
import BrandCard from "@/components/Brand/BrandCard";
import { Card as SkeletonCard } from "@/components/Skeleton/Card";
import { useEffect, useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";
import {
  brandModalOverlay,
  search,
  searchModalOverlay,
  selectedCopy,
  similarCopyList,
} from "@/utils/atom";
import { ICardData } from "@/utils/type";

interface IBrandData {
  brandId: number;
  brandLink: string;
  brandName: string;
}

const BrandDetail = () => {
  const { brandId } = useParams<{ brandId: string }>();
  const [brandData, setBrandData] = useState<IBrandData>({
    brandId: 0,
    brandLink: "",
    brandName: "",
  });
  const [cardData, setCardData] = useState<ICardData[]>([]);
  const [noResult, setNoResult] = useState<boolean>();
  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
  const setOverlay = useSetRecoilState(searchModalOverlay);
  // const [searchState, setSearchState] = useRecoilState(search); // 절대 import하지마
  let targetData = imgData.find((item) => item.id === Number(brandId))!;

  const handleBrandOpen = (card: any) => {
    let target = {
      brandName: card.brand.brandName,
      createdAt: card.createdAt,
      id: card.id,
      index: 0,
      scrapCnt: card.scrapCnt,
      text: card.text,
    };

    setSelectedCopy(target);
    setSimilarCopy(
      cardData
        .filter((el) => el.id !== card.id)
        .map((item: any) => ({
          brandName: item.brand.brandName,
          createdAt: item.createdAt,
          id: item.id,
          index: 0,
          scrapCnt: item.scrapCnt,
          text: item.text,
        }))
    );
    setBrandModal(true);
  };

  const getBrandCard = async () => {
    getBrandDetail(targetData.api_id)
      .then((res) => {
        console.log(res);
        setCardData(res.data.card);
        setBrandData({
          brandId: res.data.brandId,
          brandLink: res.data.brandLink,
          brandName: res.data.brandName,
        });
      })
      .catch((err) => console.log(err));
  };

  // 브랜드 상세 페이지 카드
  useEffect(() => {
    //TODO : 검색창 닫기 but search recoil쓰면 안됨
    setOverlay(false);
    getBrandCard();
  }, [brandId]);

  // useEffect(() => {
  //   // 검색창 창닫기
  //   setSearchState({ ...searchState, searchFocus: false });
  //   setOverlay(false);

  //   //api 호출
  //   getBrandCard();
  // }, [brandId]);

  // TODO : click시 brandModal 열기
  // TODO : Carousel 추가 in BrandBanner
  return (
    <>
      <BrandBanner name={targetData.name_kr} link={brandData.brandLink} />
      <section className="main">
        <BrandCards>
          {brandData && cardData.length > 0
            ? cardData.map((card) => (
                <BrandCard
                  key={card.id}
                  brandId={card.id}
                  text={card.text}
                  scrapCnt={card.scrapCnt}
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
