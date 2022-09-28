import styled from "styled-components";

const Container = styled.div`
  box-shadow: rgb(0 0 0 / 31%) 0px 0px 1px 0px,
    rgb(0 0 0 / 25%) 0px 11px 20px -8px;
  height: 100vh;
  h1 {
    font-size: 1.5rem;
    font-weight: 600;
    text-align: center;
    color: var(--text-secondary);
    margin-top: 1rem;
  }
  button:first-child {
    position: fixed;
    background: black;
    outline: none;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    padding: 0px 2px;
    svg {
      font-size: 1.5rem;
      color: #fff;
    }
  }
`;

const Styledform = styled.form`
  /* margin: -1rem 1rem 1rem 1rem; */
  padding: 1rem;
  background: var(--sidebar-background);
  border-radius: 15px;
  h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }
  overflow-y: auto;
`;

const Styledinput = styled.div`
  position: relative;
  label {
    position: relative;
    top: 10px;
    left: 15px;
    padding: 10px 5px;
    font-size: 16px;
    color: black;
    pointer-events: none;
    background: white;
    &:focus {
      color: #1ccaff;
    }
  }
  input {
    width: 100%;
    padding: 18px;
    font-size: 1rem;
    margin-bottom: 10px;
    border: none;
    border: 3px solid var(--line-border);
    color: var(--text-secondary);
    outline: none;
    &:focus {
      border: 2px solid #1ccaff;
    }
  }
  div {
    margin-top: -1rem;
    color: var(--loss);
    padding: 0px 15px;
  }
`;

const StyledDropdown = styled.div`
  label {
    position: relative;
    top: 10px;
    left: 15px;
    background: white;
    padding: 5px;
    z-index: 10;
  }
  select {
    width: 100%;
    padding: 15px;
    font-size: 1rem;
    margin-bottom: 20px;
    border: none;
    border: 3px solid var(--line-border);
    color: var(--text-secondary);
    /* border-radius: 10px; */
    outline: none;
    background: none;
    &:focus {
      border: 2px solid #1ccaff;
      color: #1ccaff;
    }
  }
`;

const StyledButton = styled.button`
  width: 100%;
  margin: 1rem 0rem;
  padding: 1.2rem 0.6rem;
  outline: none;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  color: white;
  background: #4269d4;
  box-shadow: rgb(28 202 255 / 24%) 0px 8px 16px 0px;
  cursor: pointer;
`;

export { Container, Styledform, Styledinput, StyledDropdown, StyledButton };
