import { DefaultTheme, css } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#ffffff",
    white25: "#FFFFFF40",
    white40: "#FFFFFF66",
    white80: "#FFFFFFCC",
    black100: "#000235",
    black30: "#0002354D",
    black40: "#00023566",
    black5: "#0002350D",
    black3: "#00023508",
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
