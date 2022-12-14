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
        <img src="/logo.png" alt="logo" style={
          {
            maxHeight: "2.1rem",
            marginTop: "1rem",
          }
        } />
      </Logo>
      <Navlinks>
        <ul>
          <li onClick={() => router.push("/")}>Home</li>
          <Dropdown>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              Statutes <FiChevronDown />
            </span>
            <ul style={
              {
                padding: "0.8rem",
              }
            }>
              
          <a href='http://www.kenyalaw.org:8181/exist/kenyalex/actview.xql?actid=Const2010'> The Constitution of Kenya </a>
          <a href='http://www.kenyalaw.org:8181/exist/kenyalex/actview.xql?actid=No.%2033%20of%202015'> The Public Procurement and Asset Disposal Act, 2015 </a>
             

            </ul>
          </Dropdown>
          <li onClick={() => router.push("/cases")}>Decisions</li>
          <Dropdown>
            <span
              style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
            >
              PRA Law Reports <FiChevronDown />
            </span>
            <ul style={
              {
                padding: "0.8rem 1rem",
              }
            }>
              <li>2010-2015</li>
              <li>2016-2017</li>
              <li>2018-2020</li>
              <li>2021-2022</li>
            </ul>
          </Dropdown>
          {user && (
            <Dropdown>
              <span
                style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}
              >
                Admin <FiChevronDown />
              </span>
              <ul style={
                {
                  padding: "0.8rem",
                }
              }>
                <li onClick={() => router.push("/create")}>Add Case</li>
                <li>Add Report</li>
                <li>Add Chair</li>
             
              </ul>
            </Dropdown>
          ) 
          }
         
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
          <h3 style={{
            fontSize: "0.9rem",
            padding: "0rem 0.8rem",
          }}>| Hi, {user.nickname}</h3>
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
  background: white;
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
    gap: 4rem;

    li {
      list-style: none;
      font-size: 1rem;
      font-weight: 400;
      cursor: pointer;
    }
    li:hover {
      color: #4269d4;
      font-weight: 700;
    }
    li:active {
      color: #4269d4;

    }
    a {
      list-style: none;
      font-size: 1rem;
      font-weight: 400;
      cursor: pointer;
      line-height: 2rem;
    }
    a:hover {
      color: #4269d4;
      font-weight: 700;
      line-height: 2rem;

    }
    a:active {
      color: #4269d4;

      line-height: 2rem;

    }
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const Authdiv = styled.div`
  button {
    padding: 0.65rem 2rem;
    border: none;
    border-radius: 30px;
    color: white;
    background: black;
    display: flex;
    gap: 0.5rem;
    margin-top: 0.2rem;
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

const Dropdown = styled.li`
  &:hover,
  &:focus {
    ul {
      display: flex;
    }
  }
  ul {
    position: absolute;
    margin: 0;
    z-index: 5;

    flex-direction: column;
    gap: 0.2rem;
    background: #edf4ff;
    // border: 2px solid #5b5757;
    padding: 0.0rem 0.9rem;
    display: none;
  }
  li {
    list-style: none;
    font-size: 1rem;
    font-weight:500;
    cursor: pointer;
    padding: 0.5rem 1rem;
    display: inline-block;
    padding: 0.5rem 1rem;
    // text-transform: uppercase;
  }
  
`;
