import styled from "styled-components";
import { forwardRef } from "react";
import { useRecoilValue } from "recoil";
import { isChecked } from "@/utils/atom";

interface InputProps {
  type?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  name?: string;
  checked?: boolean | undefined;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
}

const Input = (
  { type = "text", id, className, name, ...props }: InputProps,
  ref: React.LegacyRef<HTMLInputElement> | undefined
) => {
  // checkbox 초기 체크 상태
  let check = useRecoilValue(isChecked(id));

  return (
    <InputWrapper className={type === "text" ? "long" : ""}>
      <input
        type={type}
        className={`input ${className}`}
        defaultChecked={check}
        ref={ref}
        id={id}
        name={name}
        {...props}
      />
    </InputWrapper>
  );
};

const forwardRefInput = forwardRef(Input);
export default forwardRefInput;

const InputWrapper = styled.div<{ className: string }>`
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 100%;
  &.long {
    width: 95%;
  }
  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.black30};
`;
