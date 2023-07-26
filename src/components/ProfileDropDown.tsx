import { useState, useRef, useEffect } from "react";
import Button from "@/components/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeMenu, activeChildMenu, isLogined } from "@/utils/atom";
import { PROFILE_DATA } from "@/utils/constants";
import useOutSideClick from "@/hooks/useOutSideClick";
import { openKaKaoPlus } from "@/utils/util";
import { removeCookie } from "@/hooks/cookies";
import { getUserProfile } from "@/api/user";

interface ProfilePropType {
  className?: string;
}
interface UserProfileType {
  nickname: string;
  email?: string;
  picture: string;
  gender: string | null;
  ageRange: string | null;
  role: string;
  authorities: Array<object>;
}

const ProfileDropDown = ({ className }: ProfilePropType) => {
  const Navigate = useNavigate();
  const [hover, setHover] = useState(false);
  const setIsLogin = useSetRecoilState(isLogined);
  const [user, setUser] = useState<UserProfileType>();

  const [activeMenuIdx, setActiveMenuIdx] = useRecoilState(activeMenu);
  const [activeChildMenuIdx, setActiveChildMenuIdx] =
    useRecoilState(activeChildMenu);

  const dropdonwRef = useRef(null);
  useOutSideClick(dropdonwRef, () => setHover(false), hover);

  useEffect(() => {
    getUserProfile()
      .then((res) => {
        setUser(res);
        setIsLogin(true);
        //console.log(res);
      })
      .catch((err) => {
        removeCookie("userToken");
        setIsLogin(false);
        Navigate("/");
        console.log(err);
      });
  }, []);
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
        imageUrl={user && user.picture}
        text={(user && user.nickname) || "profile"}
      >
        <span className={getIconClassName()} />
      </Button>
      <DropdownMenu hover={hover}>
        {PROFILE_DATA.map((data) => (
          <div
            aria-label="profile-dropdown"
            key={data.idx}
            className={`dropdown__content ${
              activeChildMenuIdx === data.idx &&
              data.idx !== 3 &&
              data.idx !== 2
                ? "dropdown__content--active"
                : "dropdown__content"
            } text-subtitle-1`}
            onClick={() => {
              if (data.idx === 2) openKaKaoPlus();
              setActiveMenuIdx(data.idx === 3 ? -1 : data.idx === 2 ? 0 : 2);
              setActiveChildMenuIdx(data.idx);
              Navigate(data.link);
              if (data.idx === 3) {
                setIsLogin(false);
                removeCookie("userToken");
              }
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
