import { forwardRef } from "react";
import styled from "styled-components";

interface ButtonProps {
  width?: string;
  type?: "button" | "submit" | "reset" | undefined;
  className?: string;
  text: string;
  icon?: string;
  buttonLabel?: string;
  children?: JSX.Element;
  imageUrl?: string;
  onClick?: (e?: React.MouseEvent<HTMLElement>) => void;
}

const Button = (
  {
    width = "fit-content",
    type = "button",
    className,
    icon,
    text,
    onClick,
    children,
    buttonLabel,
    imageUrl,
    ...props
  }: ButtonProps,
  ref: React.ForwardedRef<HTMLButtonElement>
) => {
  /** 사용방법
   *
   * 1. width가 고정값인 경우 props로 내리기
   *  - <Button width="75px" />
   *  - <Button width="100%" />
   *
   * 2. width가 주어지지 않은 경우 기본은 컨텐츠 너비만큼 차지
   *
   * 3. 왼쪽 아이콘이 있는 경우 icon props로 className 내리기
   *  - <Button icon="icon-delete" />
   *
   * 4. 오른쪽 아이콘이 있는 경우 children으로 내리기
   *  - <Button><span className="icon-reset" /></Button>
   *
   *   - 개별 아이콘에서 margin과 간격 적용하기
   */

  return (
    <button
      type={type}
      className={`button ${className}`}
      style={{ width: width }}
      onClick={onClick}
      ref={ref}
      {...props}
      aria-label={buttonLabel}
    >
      <div className="button__inner">
        {imageUrl && <ProfileImg imageUrl={imageUrl} />}
        <span className={icon}></span>
        <span>{text}</span>
        {children}
      </div>
    </button>
  );
};

export default forwardRef<HTMLButtonElement, ButtonProps>(Button);

const ProfileImg = styled.span<{ imageUrl: string }>`
  width: 3.2rem;
  height: 3.2rem;
  // url repeat position / size
  background: url(${(props) => props.imageUrl}) no-repeat center / cover;
  border-radius: 50%;
  margin-right: 1.2rem;
`;
