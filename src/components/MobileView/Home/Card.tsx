import { ICardData } from "@/utils/type";
import styled from "styled-components";
import { removeAllSpace } from "@/utils/util";
import SavedIcon from "@/assets/images/icon-saved_component";
import { useRecoilValue } from "recoil";
import { mobileCardLayout } from "@/utils/atom";

const MobileCard = ({
  data,
  big,
}: {
  data: ICardData;
  big?: "small" | "big";
}) => {
  const cardLayout = useRecoilValue(mobileCardLayout);
  return (
    <MobileCardWrapper
      big={big ?? cardLayout}
      saved={big ? false : data.isScrap ? true : false}
    >
      <CardTextArea>
        {data.text}
        <div className="overlapArea" />
      </CardTextArea>
      <CardGrayLine />
      <CardBottomArea>
        <CardBrandArea>
          <img
            src={require(`../../../assets/images/brandIcon/brand-${removeAllSpace(
              data.brandName
            )}.png`)}
            alt="brand"
          />
          {data.brandName}
        </CardBrandArea>
        {data.isScrap === 1 && <SavedIcon height={20} />}
      </CardBottomArea>
    </MobileCardWrapper>
  );
};

export default MobileCard;

interface MCWProps {
  saved?: boolean;
  big: "small" | "big";
}

const MobileCardWrapper = styled.div<MCWProps>`
  width: ${({ big }) =>
    big === "small" ? "calc((100% - 0.8rem) / 2)" : "100%"};
  padding: 2.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 2.2rem;
  border: 1px solid
    ${(props) => (props.saved ? props.theme.colors.black40 : "#0002351a")};
  border-radius: 2rem;
  background-color: white;
`;
const CardTextArea = styled.div`
  width: 100%;
  height: 11rem;
  word-break: keep-all;
  word-wrap: break-word;
  white-space: pre-wrap;
  font-size: 1.6rem;
  line-height: 150%;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  position: relative;
  .overlapArea {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 4rem;
    background-image: linear-gradient(to top, #ffffff, transparent);
  }
`;

const CardGrayLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.black10};
`;

const CardBottomArea = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const CardBrandArea = styled.div`
  height: 2.8rem;
  width: 100%;
  display: flex;
  gap: 0.8rem;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 600;

  img {
    height: 100%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.black30};
  }
`;
