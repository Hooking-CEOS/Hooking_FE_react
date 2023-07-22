import { useParams } from "react-router-dom";
import styled from "styled-components";
import imgData from "@/assets/datas/imgData.json";
import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";

import { getBrandDetail } from "@/api/brand";

import BrandBanner from "@/components/BrandBanner";
import BrandCard from "@/components/BrandCard";
import { useEffect, useState } from "react";

import { useSetRecoilState } from "recoil";
import { brandModalOverlay, selectedCopy, similarCopyList } from "@/utils/atom";

interface ICardData {
  id: number;
  text: string;
  brandName: string;
  scrapCnt: number;
  createdAt: string;
  index: number;
}

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

  const setSelectedCopy = useSetRecoilState(selectedCopy);
  const setSimilarCopy = useSetRecoilState(similarCopyList);
  const setBrandModal = useSetRecoilState(brandModalOverlay);
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

  useEffect(() => {
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
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // TODO : click시 brandModal 열기
  // TODO : Carousel 추가 in BrandBanner
  return (
    <>
      <BrandBanner
        name={targetData.name_kr}
        link={brandData.brandLink}
      />
      <section className="main">
        <BrandCards>
          {cardData.map((card) => (
            <BrandCard
              key={card.id}
              brandId={card.id}
              text={card.text}
              brandImg={require(`../assets/images/brandIcon/brand-${brandData.brandName.replace(
                / /g,
                ""
              )}.png`)}
              brandName={brandData.brandName}
              onClick={() => handleBrandOpen(card)}
              // onClick={handleBrandOpen}
            />
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
