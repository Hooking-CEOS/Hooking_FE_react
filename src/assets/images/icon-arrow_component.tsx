import { IIconProps } from "@/interfaces";

interface ArrowIconProps extends IIconProps {
  direction?: "up" | "right" | "down" | "left";
}
const ArrowIcon = ({
  width = 12,
  height = 8,
  fill = "#000235",
  direction = "up",
}: ArrowIconProps) => {
  let rotationAngle = 0; // Default to 'up'
  switch (direction) {
    case "right":
      rotationAngle = 90;
      break;
    case "down":
      rotationAngle = 180;
      break;
    case "left":
      rotationAngle = 270; // or -90
      break;
    // 'up' case is the default, no need to explicitly handle it
  }

  // Note: Adjust the rotation center if necessary
  const rotationCenterX = 6;
  const rotationCenterY = 4;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        id="icon / fold"
        transform={`rotate(${rotationAngle} ${rotationCenterX} ${rotationCenterY})`}
      >
        <path
          id="Vector 1808"
          d="M1 1.5L6 6.5L11 1.5"
          stroke={fill}
          stroke-opacity="0.4"
          stroke-width="2"
          stroke-linecap="round"
        />
      </g>
    </svg>
  );
};

export default ArrowIcon;
