import styled from "styled-components";

interface IBrandMoodButtonProps {
  name: string;
  size?: string;
}

const BrandMoodButton = ({ name, size }: IBrandMoodButtonProps) => {
  return (
    <BrandMoodButtonWrapper>
      <BrandMoodText size={size}>{name}</BrandMoodText>
    </BrandMoodButtonWrapper>
  );
};

export default BrandMoodButton;

const BrandMoodButtonWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white25};
  border-radius: 60px;
  width: max-content;
  padding: 1.1rem 1.6rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const BrandMoodText = styled.div<{ size?: string }>`
  font-size: ${(props) => (props.size === "small" ? "12px" : "16px")};
  font-weight: ${(props) => (props.size === "small" ? "600" : "700")};
  color: white;
`;
