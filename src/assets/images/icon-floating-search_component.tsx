import { IIconProps } from "@/interfaces";

const FloatingSearchIcon = ({
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
        d="M10.421 10.4209L22 21.9998"
        stroke={fill}
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <circle
        cx="10.5"
        cy="10.5"
        r="7.5"
        fill={fill}
        stroke="#000235"
        stroke-width="2"
      />
      <path
        d="M5 10.5C5 7.46243 7.46243 5 10.5 5"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default FloatingSearchIcon;
