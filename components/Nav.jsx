import styled from "styled-components";
import { FiArrowRight, FiMenu } from "react-icons/fi";

const Nav = () => {
  return (
    <Container>
      <Menu>
        <FiMenu />
      </Menu>
      <Logo>
        <h1>Firmlytical</h1>
      </Logo>
      <Navlinks>
        <ul>
          <li>Home</li>
          <li>Caselaw</li>
          <li>Courts</li>
          <li>Blog</li>
        </ul>
      </Navlinks>
      <Authdiv>
        <button>
          <p>Sign In</p>
          <FiArrowRight />
        </button>
      </Authdiv>
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
    gap: 1rem;
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
