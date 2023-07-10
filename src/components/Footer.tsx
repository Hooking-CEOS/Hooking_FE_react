import styled from "styled-components";
import Button from "@/components/Button";

const Footer = () => {
  return (
    <FooterWrapper>
      <div className="footer__wrap">
        <div className="footer-content">
          <span className="icon-logo-big" />
          <p className="text-body-2">
            후킹은 SNS 마케터들을 위한 한 눈에 보는 카피라이팅 레퍼런스
            서비스입니다.
            <br />
            눈길을 후킹하는 문구에서 영감을 받아 나만의 카피를 제작해보세요.
          </p>
          <div className="footer-service-link">
            <span className="footer-grey-text text-body-2">
              © 2023. HOOKING. ALL RIGHTS RESERVED.
            </span>
            <span className="footer-grey-text text-body-2">
              {/* TODO: 링크 삽입 */}
              <a>이용약관</a>
            </span>
            <span className="footer-grey-text text-body-2">
              {/* TODO: 링크 삽입 */}
              <a>개인정보처리방침</a>
            </span>
          </div>
        </div>
        <div className="footer-content">
          <span className="footer-grey-text text-body-2">
            ceos.hooking@gmail.com
            <br />
            평일 10:00am - 5:00pm
          </span>
          <span className="footer-grey-text text-body-2">
            궁금한 점이 있거나 건의하고 싶은 내용이 있으신가요?
          </span>
          {/* TODO: 링크 삽입: 카카오 오픈채팅방 링크 */}
          <Button
            className="button-black-small text-body-3"
            text="1:1 문의"
          >
            <span className="icon-arrow-right" />
          </Button>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-color: ${({ theme }) => theme.colors.black3};
  height: 35.1rem;
  display: flex;
  margin: auto;

  .footer__wrap {
    display: flex;
    margin: 5.6rem auto 11.2rem auto;
    justify-content: center;
    max-width: 119.4rem;
    color: ${({ theme }) => theme.colors.black40};

    .footer-content {
      display: flex;
      flex-direction: column;

      p {
        margin-top: 2.2rem;
      }

      .footer-service-link {
        display: flex;
        gap: 2rem;
        margin-top: 5.6rem;
      }

      & + .footer-content {
        margin-top: 7rem;
        margin-left: 39.5rem;
        margin-right: 2rem;

        .footer-grey-text {
          & + .footer-grey-text {
            margin-top: 1.7rem;
          }
        }

        .button-black-small {
          margin-top: 0.8rem;
        }
      }
    }
  }
`;