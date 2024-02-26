import styled from "styled-components";

interface MobileButtonProps {
  children?: JSX.Element;
  fill?: string;
  borderColor?: string;
  onClick?: () => void;
}

const MobileButton = ({
  children,
  fill = "white",
  borderColor,
  onClick,
}: MobileButtonProps) => {
  return (
    <MobileButtonWrapper
      fill={fill}
      borderColor={borderColor}
      onClick={onClick}
    >
      {children}
    </MobileButtonWrapper>
  );
};
export default MobileButton;

const MobileButtonWrapper = styled.div<{ fill: string; borderColor?: string }>`
  padding: 0.8rem 1rem;
  border-radius: 0.8rem;
  flex: 0 0 auto;
  gap: 0.6rem;
  border: 1px solid
    ${(props) => props.borderColor || props.theme.colors.black10};
  background-color: ${(props) => props.fill};
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.black40};
  font-size: 1.4rem;
  font-weight: 600;
`;
