import { IIconProps } from "@/interfaces";
import { mobileCardLayout } from "@/utils/atom";
import { useRecoilValue } from "recoil";

interface IFrameIconProps extends IIconProps {
  strokeWidth: number;
}

const FrameIcon = ({
  width = 14,
  height = 14,
  fill = "#000235",
  strokeWidth = 1.5,
}: IFrameIconProps) => {
  const mobileLayout = useRecoilValue(mobileCardLayout);

  return (
    <>
      {mobileLayout === "small" ? (
        <svg
          width={width}
          height={height}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame 1000001308">
            <g id="Group 10748">
              <rect
                id="Rectangle 2861690"
                x="1.25"
                y="1.25"
                width="4.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <rect
                id="Rectangle 2861691"
                x="8.25"
                y="1.25"
                width="4.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <rect
                id="Rectangle 2861693"
                x="8.25"
                y="8.25"
                width="4.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <rect
                id="Rectangle 2861692"
                x="1.25"
                y="8.25"
                width="4.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      ) : (
        <svg
          width={width}
          height={height}
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="Frame 1000001308">
            <g id="Group 10748">
              <rect
                id="Rectangle 2861690"
                x="1.25024"
                y="1.25"
                width="11.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
              <rect
                id="Rectangle 2861694"
                x="1.25024"
                y="8.25"
                width="11.5"
                height="4.5"
                stroke={fill}
                strokeWidth={strokeWidth}
                strokeLinejoin="round"
              />
            </g>
          </g>
        </svg>
      )}
    </>
  );
};

export default FrameIcon;
