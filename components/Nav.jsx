import styled from "styled-components";
import { FiArrowRight, FiMenu, FiChevronDown } from "react-icons/fi";
import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import { useStateContext } from "../lib/context";
import ProfileCard from "./Profilecard";
import { useRouter } from "next/router";
import toast, { Toaster } from "react-hot-toast";

const Nav = () => {
  const { account, setAccount } = useStateContext();
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  const IMAGE_URL = "lh3.googleusercontent.com";
  return (
    <Container>
      <Menu>
        <FiMenu />
      </Menu>
      <Logo onClick={() => router.push("/")}>
        <h1>Firmlytical</h1>
      </Logo>
      <Navlinks>
        <ul>
          <li onClick={() => router.push("/")}>Home</li>
          <li>Statutes</li>
          <li
            onClick={() =>
              user
                ? router.push("/cases")
                : toast.error("You need to login to view the cases")
            }
            style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
          >
            Decisions
            <FiChevronDown />
          </li>

          <li>Courts</li>
          <li
            onClick={() =>
              user
                ? router.push("/create")
                : toast.error("You need to login to view the cases")
            }
          >
            Add Case
          </li>

          <li>PRA Law Reports</li>

        </ul>
      </Navlinks>
      {user ? (
        <Userprofile>
          <Image
            src={
              user.picture.includes(IMAGE_URL) ? user.picture : "/avatar.png"
            }
            alt="profile"
            height={30}
            width={30}
            objectFit={"cover"}
            onClick={() => setAccount(!account)}
          />
          <h3>| Hi, {user.nickname}</h3>
        </Userprofile>
      ) : (
        <Authdiv>
          <button onClick={() => router.push("/api/auth/login")}>
            <p>Sign In</p>
            <FiArrowRight />
          </button>
        </Authdiv>
      )}
      {account && <ProfileCard />}
    </Container>
  );
};

export default Nav;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fffafa;
  padding: 0rem 1rem;
  position: sticky;
  top: 0px;
  z-index: 10;
  @media (max-width: 768px) {
    padding: 1rem;
  }
`;
const Logo = styled.div`
  h1 {
    font-size: 3rem;
    font-weight: 700;
    font-family: "Ms Madi", cursive;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }
  }
`;

const Navlinks = styled.div`
  ul {
    display: flex;
    gap: 2rem;
    li {
      list-style: none;
      font-size: 1rem;
      font-weight: 400;
      cursor: pointer;
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const Authdiv = styled.div`
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 30px;
    color: white;
    background: black;
    display: flex;
    gap: 0.5rem;
    p {
      font-size: 1rem;
    }
    svg {
      font-size: 1rem;
    }
    &:hover {
      background: #656565;
      cursor: pointer;
      svg {
        transform: translateX(5px);
        transform: scaleX(1.4);
        transition: 0.2s ease-in;
      }
    }
  }
`;

const Menu = styled.div`
  display: none;
  svg {
    font-size: 2rem;
  }
  @media (max-width: 768px) {
    display: block;
  }
`;

const Userprofile = styled.div`
  align-self: center;
  display: flex;
  align-items: center;
  img {
    border-radius: 50%;
    cursor: pointer;
  }
`;
