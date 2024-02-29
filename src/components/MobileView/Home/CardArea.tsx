import styled from "styled-components";

import { ICardData } from "@/utils/type";
import MobileCard from "./Card";

const MobileCardArea = ({ card }: { card: ICardData[] }) => {
  return (
    <CardAreaWrapper>
      {card.map((cardData: ICardData) => (
        <MobileCard
          key={cardData.id}
          data={cardData}
        />
      ))}
    </CardAreaWrapper>
  );
};

export default MobileCardArea;

const CardAreaWrapper = styled.div`
  width: 100%;
  padding: 0 0.8rem;
  margin-top: 0.2rem;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 0.8rem;
  padding-bottom: 1.6rem;
`;
