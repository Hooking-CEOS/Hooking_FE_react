import styled from "styled-components";
import { search } from "@/utils/atom";
import { useRecoilValue } from "recoil";
import { useState } from "react";
import Button from "@/components/Button";

interface BrandProps {
  text: string;
  brandName: string;
  brandId?: number;
  brandImg?: string;
  saved?: boolean;
  onClick?: () => void;
}

// 단어 단위로 쪼개서 단어가 # 또는 @로 시작하면 밑줄

const WordWrap = (word: string) => {
  const searchState = useRecoilValue(search);
  // TODO: searchState값이 있다면 index값에 따라 주황글씨 처리
  word = word.replaceAll("\n", " \n ");
  const words = word.split(" ");

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
  saved,
  onClick,
}: BrandProps) => {
  const [hover, setHover] = useState(false);

  return (
    <BrandCardWrapper
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="card-content text-normal-300">
        {WordWrap(text)}
        <span className="more-content" />
      </div>

      <div className="card-brand">
        <span className="brandIcon">
          <img src={brandImg} alt="brandImg" />
          <span className="component-small">{brandName}</span>
        </span>
        {saved ? (
          <Button
            icon="icon-saved-outline"
            className="button-orange-outline-saved component-small "
            text="저장됨"
          />
        ) : hover ? (
          <Button
            icon="icon-saved-white-large"
            className="button-orange component-small"
            text="저장"
          />
        ) : (
          <></>
        )}
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

  min-height: 27.8rem;
  padding: 3.8rem 4rem;

  border: 0.025rem solid ${(props) => props.theme.colors.black40};
  border-radius: 2rem;
  background: ${(props) => props.theme.colors.white};
  position: relative;
  cursor: pointer;
  &:hover {
    background: linear-gradient(
        0deg,
        rgba(255, 113, 69, 0.05) 0%,
        rgba(255, 113, 69, 0.05) 100%
      ),
      #fff;
    border: 0.025rem solid ${(props) => props.theme.colors.point};
    .more-content {
      background: linear-gradient(
        180deg,
        rgba(255, 248, 246, 0) 0%,
        #fff8f6 72.4%
      ) !important;
    }
  }

  .card-content {
    position: relative;
    // 여러 줄 말줄임 표시
    display: -webkit-box;
    -webkit-box-orient: vertical;
    width: 100%;
    white-space: pre-wrap;
    overflow: hidden;
    max-height: 12rem;
    min-height: 12rem;
    font-size: 1.6rem;
    color: ${(props) => props.theme.colors.black100};
    margin-bottom: 2.4rem;
    word-break: keep-all;

    // 더보기
    .more-content {
      width: 100%;
      height: 2.4rem;
      position: absolute;
      bottom: 0px;
      text-align: right;
      right: 0;
      //background: white;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        #fff 72.4%
      );
    }
  }

  .card-brand {
    display: flex;
    align-items: center;
    padding-top: 2.4rem;
    position: absolute;
    bottom: 2.6rem;
    width: calc(100% - 8rem);
    border-top: 1px solid ${(props) => props.theme.colors.black30};
    gap: 1rem;
  }
`;
