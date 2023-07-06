import styled from "styled-components";
import { flexCenter } from "@/styles/theme";
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
  onChange?: (e: any) => void; // TODO: 이벤트 타입 수정
  onFocus?: (e: any) => void;
  ref?: any; // TODO: 타입 수정
}

const Input = (
  { type = "text", id, className, name, ...props }: InputProps,
  ref: any
) => {
  // checkbox 초기 체크 상태
  let check = useRecoilValue(isChecked(id));

  return (
    // type="text"면 width:100%
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
    width: 100%;
  }

  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.black30};
`;
