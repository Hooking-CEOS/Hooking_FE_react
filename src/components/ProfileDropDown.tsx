import { useState } from "react";
import Button from "@/components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { activeMenu, activeChildMenu } from "@/utils/atom";
import { PROFILE_DATA } from "@/utils/constants";

interface ProfilePropType {
  className?: string;
}

const ProfileDropDown = ({ className }: ProfilePropType) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const [activeChildMenuIdx, setActiveChildMenuIdx] =
    useRecoilState(activeChildMenu);
  const handleDropDown = () => setHover((prev) => !prev);

  return (
    <div
      onMouseOver={handleDropDown}
      onMouseOut={handleDropDown}
      style={{ position: "relative" }}
    >
      <Button
        width="15rem"
        className={`${
          activeMenuIdx === 2 ? "button-black small" : "button-white"
        } text-normal-600 ${className}`}
        icon="icon-profile"
        text="이후킹"
      >
        <span className={hover ? "icon-arrow-unfold" : "icon-arrow-fold"} />
      </Button>
      <ProfileToolTip hover={hover}>
        {PROFILE_DATA.map((data) => (
          <div
            key={data.idx}
            className={`${
              activeChildMenuIdx === data.idx && data.idx !== 3
                ? "tooltip__content tooltip__content--active"
                : "tooltip__content"
            } text-normal-600`}
            onClick={() => {
              setActiveMenuIdx(data.idx === 3 ? 0 : 2);
              setActiveChildMenuIdx(data.idx);
              navigate(data.link);
            }}
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
  left: 1.15rem;
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

    &--active {
      color: ${(props) => props.theme.colors.black100};
    }

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
