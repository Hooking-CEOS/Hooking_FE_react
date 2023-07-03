import { useState } from "react";
import Button from "@/components/Button";
import styled from "styled-components";

const PROFILE_DATA = [
  {
    idx: 0,
    text: "내 계정",
    link: "/profile",
  },
  {
    idx: 1,
    text: "북마크",
    link: "/bookmark",
  },
  {
    idx: 2,
    text: "문의",
    link: "/question",
  },
  {
    idx: 3,
    text: "로그아웃",
    link: "/",
  },
];

const ProfileDropDown = () => {
  const [hover, setHover] = useState(false);

  const handleDropDown = () => setHover((prev) => !prev);

  return (
    <div
      onMouseOver={handleDropDown}
      onMouseOut={handleDropDown}
    >
      <div className="icon-profile" />
      <Button
        className={`button-white button-big text-normal-600 ${
          hover ? "icon-arrow-unfold" : "icon-arrow-fold"
        }`}
        text="이후킹"
      />
      <ProfileToolTip hover={hover}>
        {PROFILE_DATA.map((data) => (
          <div
            key={data.idx}
            className="tooltip__content text-normal-600"
          >
            {data.text}
          </div>
        ))}
      </ProfileToolTip>
    </div>
  );
};

export default ProfileDropDown;

const ProfileToolTip = styled.div<{ hover: Boolean }>`
  position: absolute;
  display: ${({ hover }) => (hover ? "block" : "none")};
  width: 12.5rem;
  border-radius: 2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.black40};
  background: ${(props) => props.theme.colors.white};

  font-size: 1.8rem;
  color: ${(props) => props.theme.colors.black30};
  padding: 2rem 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  .tooltip__content {
    padding-left: 1.9rem;

    & + .tooltip__content {
      margin-top: 2rem;
    }
    &:nth-last-child(1) {
      padding-top: 2rem;
      border-top: 0.1rem solid ${(props) => props.theme.colors.black40};
    }
    cursor: pointer;
  }
`;
