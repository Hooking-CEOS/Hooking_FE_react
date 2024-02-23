import styled from "styled-components";
import Button from "@/components/Button";
import { openKaKaoPlus } from "@/utils/util";

const MobileFooter = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        궁금한 점이 있거나 건의하고 싶은 내용이 있으신가요?
        <Button
          className="button-black-small text-body-3"
          text="1:1 문의 >"
          onClick={openKaKaoPlus}
        />
        <div className="subTextArea">
          <FooterTermsandService>
            <span className="terms">
              <a
                href="https://mixolydian-colt-b51.notion.site/143ff06c36e941869574b2ce0685166f?pvs=4"
                target="_blank"
                rel="noreferrer"
              >
                이용약관
              </a>
            </span>
            <span>
              <a
                href="https://mixolydian-colt-b51.notion.site/d6d255c513ad414aafc4ebfda445ee84?pvs=4"
                target="_blank"
                rel="noreferrer"
              >
                개인정보처리방침
              </a>
            </span>
          </FooterTermsandService>
          © 2023-2024. HOOKING. ALL RIGHTS RESERVED.
        </div>
      </FooterContent>
    </FooterWrapper>
  );
};

export default MobileFooter;

const FooterWrapper = styled.div`
  width: 100%;
  padding: 3.2rem 2.4rem 11rem;
  background-color: ${({ theme }) => theme.colors.black3};
`;

const FooterContent = styled.div`
  font-size: 1.4rem;
  font-weight: 300;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.black100};
  .subTextArea {
    margin-top: 2.4rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    color: ${({ theme }) => theme.colors.black40};
  }
`;

const FooterTermsandService = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  width: 100%;

  .terms {
    padding-right: 2rem;
    border-right: 1px solid ${({ theme }) => theme.colors.black40};
  }
`;
