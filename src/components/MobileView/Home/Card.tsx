import { ICardData } from "@/utils/type";
import styled from "styled-components";

const MobileCard = ({ data }: { data: ICardData }) => {
  return (
    <MobileCardWrapper>
      <>MObileCard</>
    </MobileCardWrapper>
  );
};

export default MobileCard;

const MobileCardWrapper = styled.div`
  width: calc((100% - 0.8rem) / 2);
  padding: 2.2rem 2.4rem;
  display: flex;
  flex-direction: column;
  border: 1px solid #0002351a;
  border-radius: 2rem;
  height: 22.3rem;
`;
