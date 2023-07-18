import IMG_BRAND_SAMPLE from "@/assets/images/icon-brand-sample.svg";
import BrandCard from "@/components/BrandCard";
import { useEffect } from "react";
import styled from "styled-components";
import { searchModalOverlay, search } from "@/utils/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Masonry from "@/components/Masonry";

const BookMark = () => {
  const HOME_CARD_DATA = [
    {
      id: 1,
      brandName: "미샤",
      text: "#미샤\n\n엘리자베스 올슨 인터뷰 영상 공개🎥\n\n미샤의 브랜드 메시지를 지지하고,\n비타씨 …lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-05-26T01:56:27",
    },
    {
      brandName: "미샤",
      createdAt: "2023-05-26T01:56:27",
      id: 2,
      index: null,
      scrapCnt: 0,
      text: "#미샤\n\n엘리자베스 올슨 인터뷰 영상 공개🎥\n\n미샤의 브랜드 메시지를 지지하고,\n비타씨 탄력 앰플을 가장 좋아하는 이유가 궁금하다면?\n\n솔직하고 당당한 모습의 올슨의 인터뷰 영상을\n끝까지 시청하고 공감 댓글을 남겨주세요:)\n\nElizabeth Olsen Interview Video Revealed 🎥\n\nSupporting Missha’s brand message,\nWhy do you like Vita C elastic ampoules the most?\n\nI want to see Olsen‘s candid and confident interview video\nWatch until the end and leave a empathy comment :)\n\n#MISSHA #비타씨앰플 #Beauty_is_Reality #ElizabethOlsen\n#MisshaGlobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
    },
    {
      id: 3,
      brandName: "미샤",
      text: "#미샤 \n\nMISSHA X ELIZABETH OLSEN\n\n진정한 아름다움은 특정한 누군가만…lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-07-06T19:40:55",
    },
    {
      id: 4,
      brandName: "미샤",
      text: "#미샤\n\n엘리자베스 올슨 인터뷰 영상 공개🎥\n\n미샤의 브랜드 메시지를 지지하고,\n비타씨 …lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-05-26T02:06:32",
    },
    {
      id: 5,
      brandName: "미샤",
      text: "#미샤\n\n” BEAUTY IS REALITY “\n\n일상의 모습이 가장 아름다울 수 있도록,…lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-05-26T02:06:32",
    },
    {
      id: 6,
      brandName: "미샤",
      text: "#미샤\n\n엘리자베스 올슨 인터뷰 영상 공개🎥\n\n미샤의 브랜드 메시지를 지지하고,\n비타씨 탄력 앰플을 가장 좋아하는 이유가 궁금하다면?\n\n솔직하고 당당한 모습의 올슨의 인터뷰 영상을\n끝까지 시청하고 공감 댓글을 남겨주세요:)\n\nElizabeth Olsen Interview Video Revealed 🎥\n\nSupporting Missha’s brand message,\nWhy do you like Vita C elastic ampoules the most?\n\nI want to see Olsen‘s candid and confident interview video\nWatch until the end and leave a empathy comment :)\n\n#MISSHA #비타씨앰플 #Beauty_is_Reality #ElizabethOlsen\n#MisshaGlobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-05-26T01:56:27",
    },
    {
      id: 7,
      brandName: "미샤",
      text: "#미샤 \n\nMISSHA X ELIZABETH OLSEN\n\n진정한 아름다움은 특정한 누군가만…lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-07-06T19:40:55",
    },
    {
      id: 8,
      brandName: "미샤",
      text: "#미샤\n\n엘리자베스 올슨 인터뷰 영상 공개🎥\n\n미샤의 브랜드 메시지를 지지하고,\n비타씨 탄력 앰플을 가장 좋아하는 이유가 궁금하다면?\n\n솔직하고 당당한 모습의 올슨의 인터뷰 영상을\n끝까지 시청하고 공감 댓글을 남겨주세요:)\n\nElizabeth Olsen Interview Video Revealed 🎥\n\nSupporting Missha’s brand message,\nWhy do you like Vita C elastic ampoules the most?\n\nI want to see Olsen‘s candid and confident interview video\nWatch until the end and leave a empathy comment :)\n\n#MISSHA #비타씨앰플 #Beauty_is_Reality #ElizabethOlsen\n#MisshaGlobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-07-06T19:40:55",
    },
    {
      id: 9,
      brandName: "미샤",
      text: "#미샤 \n\nMISSHA X ELIZABETH OLSEN\n\n진정한 아름다움은 특정한 누군가만…lobalAmbassador #Olsen #LIZZIE\n#미샤글로벌앰버서더 #올슨 #리지",
      scrapCnt: 0,
      createdAt: "2023-07-06T19:40:55",
    },
  ];
  const CARD_DATA = [
    {
      idx: 0,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 1,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 2,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 3,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 4,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 5,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 6,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum 휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 7,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 8,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 9,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 10,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
    {
      idx: 11,
      text: "휴대하기 좋은 비건 세럼 립틴트로 어디서든 촉촉한 입술을 가꿔보세요 Get moist lips with the portable vegan serum... 더 보기",
      brand: "이니스프리",
      img: IMG_BRAND_SAMPLE,
    },
  ];

  const setOverlay = useSetRecoilState(searchModalOverlay);
  const [searchState, setSearchState] = useRecoilState(search);

  useEffect(() => {
    // 검색창 창닫기
    setSearchState({ ...searchState, searchFocus: false });
    setOverlay(false);
  }, []);

  return (
    <>
      <section className="main bookmark">
        <div className="bookmark-copy">
          <h1 className="text-heading-2">북마크</h1>
          <Masonry colCount={2}>
            {HOME_CARD_DATA.map((card) => (
              <BrandCard
                saved={true}
                key={card.id}
                brandId={card.id}
                text={card.text}
                brandImg={IMG_BRAND_SAMPLE}
                brandName={card.brandName}
              />
            ))}
          </Masonry>
        </div>
      </section>
    </>
  );
};

export default BookMark;

const BrandCards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: auto;
  grid-gap: 3rem;
`;
