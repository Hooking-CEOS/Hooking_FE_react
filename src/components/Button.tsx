interface ButtonProps {
  width?: string;
  className?: string;
  text: string;
  icon?: string;
  children?: JSX.Element;
  onClick?: (e?: any) => void;
}

const Button = ({
  width = "fit-content",
  className,
  icon,
  text,
  onClick,
  children,
  ...props
}: ButtonProps) => {
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
      type="button"
      className={`button ${className}`}
      style={{ width: width }}
      onClick={onClick}
      {...props}
    >
      <div className="button__inner">
        <span className={icon}></span>
        <span>{text}</span>
        {children}
      </div>
    </button>
  );
};

export default Button;
