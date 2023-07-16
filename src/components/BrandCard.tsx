import styled from "styled-components";
import { search } from "@/utils/atom";
import { useRecoilValue } from "recoil";

interface BrandProps {
  text: string;
  brandName: string;
  brandId?: number;
  brandImg?: string;
  onClick?: () => void;
}

// 단어 단위로 쪼개서 단어가 # 또는 @로 시작하면 밑줄

const WordWrap = (word: string) => {
  const searchState = useRecoilValue(search);
  // TODO: searchState값이 있다면 index값에 따라 주황글씨 처리
  word = word.replaceAll("\n", " \n ");
  const words = word.split(" ");
  //  TODO: 문장 맨 앞의 줄바꿈 제거

  return (
    <>
      {words.map((word, index) => {
        return word + " ";
      })}
    </>
  );
};

const BrandCard = ({
  text,
  brandName,
  brandImg,
  brandId,
  onClick,
}: BrandProps) => {
  return (
    <BrandCardWrapper>
      <div className="card-content text-normal-300">
        {WordWrap(text)}
        <span className="more-content">...더 보기</span>
      </div>

      <div className="card-brand">
        <img
          src={brandImg}
          alt="brandImg"
        />
        <span className="component-small">{brandName}</span>
      </div>
    </BrandCardWrapper>
  );
};

export default BrandCard;

const BrandCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 37.8rem;
  max-width: 100%;

  min-height: 27.2rem;
  padding: 3.8rem 4rem;

  border: 0.025rem solid ${(props) => props.theme.colors.black40};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.white};
  position: relative;
  cursor: pointer;

  .card-content {
    position: relative;
    // 여러 줄 말줄임 표시
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
    -webkit-line-clamp: 5;
    max-height: 12rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black100};
    margin-bottom: 2.4rem;

    // 더보기
    .more-content {
      width: 100px;
      position: absolute;
      bottom: -3px;
      text-align: right;
      right: 0;
      //background: white;
      background: linear-gradient(to left, #fff 50%, #fff 60%, transparent);
    }
  }

  .card-brand {
    display: flex;
    align-items: center;
    margin-top: 1.2rem;
    padding-top: 1.2rem;
    position: absolute;
    bottom: 3.8rem;
    width: calc(100% - 8rem);
    border-top: 1px solid ${(props) => props.theme.colors.black30};
    gap: 1rem;
  }
`;
