import { FiMail, FiDollarSign, FiShield, FiCreditCard } from "react-icons/fi";
import styled from "styled-components";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { useStateContext } from "../lib/context";
import { useUser } from "@auth0/nextjs-auth0";
import { useRouter } from "next/router";

const ProfileCard = () => {
  const router = useRouter();
  const { account, setAccount } = useStateContext();
  const userCardRef = useRef();
  const { user, error, isLoading } = useUser();
  const IMAGE_URL = "lh3.googleusercontent.com";

  const onClickOutside = () => setAccount(!account);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userCardRef.current && !userCardRef.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <Container ref={userCardRef}>
      <h3>User Profile</h3>
      <div>
        <ProfileInfo>
          <div>
            <Image
              src={
                user.picture.includes(IMAGE_URL) ? user.picture : "/avatar.png"
              }
              alt="profile"
              height={100}
              width={100}
              objectFit={"cover"}
            />
          </div>
          <div>
            <h3>{user.name}</h3>
            <div>
              <FiMail />
              <span>{user.email}</span>
            </div>
          </div>
        </ProfileInfo>
      </div>
      <LogOutButton onClick={() => router.push("/api/auth/logout")}>
        Log Out
      </LogOutButton>
    </Container>
  );
};

export default ProfileCard;

const Container = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 100;
  background: white;
  max-width: 50vh;
  padding: 1rem 2rem;
  border-radius: 10px;
  h3:nth-child(1) {
    font-weight: 500;
  }
`;

const ProfileInfo = styled.div`
  margin: 1rem 0rem;
  display: flex;
  align-items: center;
  gap: 2rem;
  div:nth-child(1) {
    border-radius: 50%;
    img {
      border-radius: 50%;
    }
  }
  h3 {
    padding: 0.2rem;
    font-size: 1rem;
    color: var(--text-primary);
  }
  p {
    padding: 0.2rem;
    font-size: 1rem;
    color: var(--text-secondary);
  }
  div:nth-child(2) {
    div {
      display: flex;
      gap: 0.5rem;
      align-items: center;
      svg {
        font-size: 1rem;
      }
    }
  }
  svg,
  span {
    color: var(--text-secondary);
  }
`;

const ProfileLinks = styled.div`
  border-top: 1px solid #d5d3d3;
  padding: 1.2rem 0rem;
  display: flex;
  gap: 3rem;
  cursor: pointer;
  button {
    background: #e5fafb;
    border: none;
    outline: none;
    width: 3rem;
    border-radius: 10px;
    svg {
      font-size: 1.5rem;
      color: var(--button);
    }
  }
  h4 {
    font-weight: 500;
  }
  p {
    color: var(--text-secondary);
  }
  &:hover {
    background: #f1f1f1;
  }
`;

const LogOutButton = styled.button`
  width: 100%;
  margin-top: 1rem;
  padding: 0.5rem 0rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  outline: none;
  color: var(--sidebar-background);
  background: #4269d4;
  box-shadow: 0 0 1px 0 rgba(0, 0, 0, 0.31), 0 2px 2px -2px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  &:hover {
    background: #002da7;
  }
`;
