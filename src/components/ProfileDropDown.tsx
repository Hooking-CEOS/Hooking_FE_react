import { useState, useRef } from "react";
import Button from "@/components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { activeMenu, activeChildMenu } from "@/utils/atom";
import { PROFILE_DATA } from "@/utils/constants";
import useOutSideClick from "@/hooks/useOutSideClick";

interface ProfilePropType {
  className?: string;
}

const ProfileDropDown = ({ className }: ProfilePropType) => {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const [activeChildMenuIdx, setActiveChildMenuIdx] =
    useRecoilState(activeChildMenu);

  const dropdonwRef = useRef(null);
  useOutSideClick(dropdonwRef, () => setHover(false));

  // TODO: icon-arrow-unfold-light 추가
  const getIconClassName = () =>
    activeMenuIdx === 2
      ? `icon-arrow-${hover ? "fold" : "fold"}-light`
      : `icon-arrow-${hover ? "unfold" : "fold"}`;

  return (
    <div
      onClick={() => setHover((prev) => !prev)}
      style={{ position: "relative" }}
      ref={dropdonwRef}
    >
      <Button
        width="15rem"
        className={`${`button-${
          activeMenuIdx === 2 ? "black" : "white"
        } small`} text-subtitle-1 ${className}`}
        icon="icon-profile"
        text="이후킹"
      >
        <span className={getIconClassName()} />
      </Button>
      <DropdownMenu hover={hover}>
        {PROFILE_DATA.map((data) => (
          <div
            aria-label="profile-dropdown"
            key={data.idx}
            className={`dropdown__content ${
              activeChildMenuIdx === data.idx && data.idx !== 3
                ? "dropdown__content--active"
                : "dropdown__content"
            } text-subtitle-1`}
            onClick={() => {
              setActiveMenuIdx(data.idx === 3 ? 0 : 2);
              setActiveChildMenuIdx(data.idx);
              navigate(data.link);
            }}
          >
            {data.text}
          </div>
        ))}
      </DropdownMenu>
    </div>
  );
};

export default ProfileDropDown;

const DropdownMenu = styled.div<{ hover: Boolean }>`
  position: absolute;
  margin-top: 1.2rem;
  left: 1.15rem;
  display: ${({ hover }) => (hover ? "block" : "none")};
  width: 12.5rem;
  border-radius: 2rem;
  border: 0.1rem solid ${({ theme }) => theme.colors.black40};
  background: ${({ theme }) => theme.colors.white};

  color: ${({ theme }) => theme.colors.black30};
  padding: 2rem 0;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.05);

  .dropdown__content {
    padding-left: 1.9rem;
    &--active {
      color: ${({ theme }) => theme.colors.black100};
    }
    &:hover {
      color: ${({ theme }) => theme.colors.black100};
    }
    & + .dropdown__content {
      margin-top: 2rem;
    }
    &:nth-last-child(1) {
      padding-top: 2rem;
      border-top: 0.1rem solid ${({ theme }) => theme.colors.black40};
    }
    cursor: pointer;
  }
`;
