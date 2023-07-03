import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyle = createGlobalStyle`
${normalize}
::-webkit-scrollbar {
   display: none;
}

html {
   font-size: 10px;
   user-select: none;
   box-sizing: border-box;
   font-family: 'SUIT Variable', sans-serif;
}

body {
   height: 100vh;
   display: flex;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: center;
   justify-content: center;
   margin: 0px;
 
   -webkit-font-smoothing: antialiased;
   -moz-osx-font-smoothing: grayscale;
 }
 
 code {
   font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
     monospace;
 }

button{
   width: auto;
   background: none;
   border: none;
   cursor: pointer;
   &:focus{
      outline: none;
   }
}

@font-face {
  font-family: "SUIT Variable";
  font-weight: 100 900;
  src: local("SUIT Variable Regular"),
    url("/fonts/SUIT-Variable.woff2") format("woff2-variations");
}

.swiper {
  width: 100%;
  padding-top: 50px;
  padding-bottom: 50px;
}

.slide-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.swiper-slide-div {
  min-width: 300px;
  height: 300px;
  padding: 1rem;
  box-sizing: border-box;
  transform: translateX(-10px);
  background-color: white;
  border-radius: 0 50% 50% 0;
  box-shadow: 0px 4px 30px 0px rgba(158, 158, 158, 0.5);
}

.swiper-slide:not(.swiper-slide-active) > .slide-wrapper > .swiper-slide-div {
  display: none;
}

.swiper-slide {
  background-position: center;
  background-size: cover;
  width: 300px;
  height: 300px;
}

.swiper-slide img {
  display: block;
  width: 100%;
}

.swiper-slide {
  opacity: 1;
}

.swiper-slide:not(.swiper-slide-active) {
  opacity: 0.3;
}

.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.7 !important;
}

.slide-wrapper > img {
  border-radius: 20px;
  z-index: 999;
}


`;
