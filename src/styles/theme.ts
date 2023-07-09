import { DefaultTheme, css } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#ffffff",
    white25: "#FFFFFF40",
    white40: "#FFFFFF66",
    black100: "#000235",
    black30: "#0002354D",
    black40: "#00023566",
    black5: "#0002350D",
    point: "#FF7145",
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const flexColumnCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
