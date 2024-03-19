import { IIconProps } from "@/utils/type";

const FloatingMypageIcon = ({
  width = 24,
  height = 24,
  fill = "#000235",
}: IIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.501 14C20.1877 15.5207 21.3879 17.6224 21.8217 20.0105C22.0191 21.0973 21.1046 22 20 22H4C2.89543 22 1.98087 21.0973 2.1783 20.0105C2.61212 17.6224 3.81226 15.5207 5.49896 14"
        stroke={fill}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="8"
        r="5"
        fill="white"
        stroke={fill}
        strokeWidth="2"
      />
    </svg>
  );
};
export default FloatingMypageIcon;
