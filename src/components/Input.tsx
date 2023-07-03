import styled from "styled-components";
import { flexCenter } from "@/styles/theme";

interface InputProps {
  className?: string;
  placeholder?: string;
}

const Input = ({ className, ...props }: InputProps) => {
  return (
    <InputWrapper>
      <input
        type="text"
        className={`input ${className}`}
        {...props}
      />
    </InputWrapper>
  );
};

export default Input;

const InputWrapper = styled.div`
  ${flexCenter}
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.black30};
`;
