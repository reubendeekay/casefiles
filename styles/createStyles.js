import styled from "styled-components";

const Container = styled.div`
  background: var(--background);
`;

const FormWrapper = styled.div`
  display: flex;
  margin: 1rem 2rem;
  gap: 2rem;
  flex-wrap: nowrap;
  @media (max-width: 768px) {
    flex-direction: column;
    margin: 1rem;
  }
`;

const Maindiv = styled.div`
  background: white;
  padding: 24px;
  flex-grow: 2;
  border-radius: 16px;
  flex-basis: 50%;
`;

const Secondarydiv = styled(Maindiv)`
  flex-grow: 1;
`;

const StyledImage = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  border: 3px dashed var(--line-border);
  padding: 1rem;
  background: #f9f9f9;
  cursor: pointer;
  border-radius: 10px;
  h5 {
    font-weight: 700;
    font-size: 1rem;
    color: var(--text-secondary);
    padding: 0.5rem;
  }
  p {
    font-size: 0.8rem;
    color: #637381;
    span {
      color: var(--button);
      text-decoration: underline;
    }
  }
`;

const StyledUpload = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 1rem;
  gap: 1rem;
  button:first-child {
    padding: 0.7rem;
    border: none;
    background: none;
    font-weight: 700;
    font-size: 0.8rem;
  }
  button:nth-child(2) {
    padding: 0.7rem;
    border: none;
    background: #1ccaff;
    box-shadow: rgb(28 202 255 / 24%) 0px 8px 16px 0px;
    font-weight: 700;
    font-size: 0.8rem;
    color: #212b36;
    border-radius: 10px;
  }
`;

const Preview = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 1rem;
  img {
    border-radius: 10px;
  }
  button {
    position: relative;
    border: none;
    outline: none;
    background: none;
    top: -60px;
    left: -20px;
    svg {
      text-align: center;
      font-size: 1.2rem;
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

const Styledinput = styled.div`
  label {
    position: relative;
    top: 10px;
    left: 15px;
    padding: 10px 5px;
    font-size: 16px;
    color: black;
    pointer-events: none;
    background: white;
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
      border: 3px solid #1ccaff;
    }
  }
  div {
    margin-top: -0.7rem;
    color: var(--loss);
    padding: 0px 15px;
  }
`;
const StyledTextArea = styled.div`
  margin-bottom: 1rem;
  textarea {
    width: 100%;
    min-height: 5rem;
    padding: 1rem;
    font-size: 1rem;
    border: 3px solid var(--line-border);
    &:focus {
      border: 3px solid #1ccaff;
      outline: none;
    }
  }
  label {
    position: relative;
    top: 10px;
    left: 15px;
    background: white;
    padding: 5px;
    z-index: 10;
  }
  div {
    color: var(--loss);
    padding: 0px 15px;
  }
`;

const Styledtagcontainer = styled.div`
  width: 100%;
  border: 3px solid var(--line-border);
  label {
    position: relative;
    top: -10px;
    left: 15px;
    background: white;
    padding: 0px 5px;
    z-index: 10;
  }
`;

const StyledTags = styled.div`
  position: relative;
  top: -10px;
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  padding: 0px 15px;
  gap: 0.5rem;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    background-color: #919eab29;
    border-radius: 16px;
    padding: 0px 10px;
    height: 24px;
    span {
      font-size: 1rem;
      color: var(--text-secondary);
      color: #212b36;
    }
    svg {
      font-size: 1rem;
      color: white;
      cursor: pointer;
      border-radius: 50%;
      background: var(--text-secondary);
    }
  }
  select {
    outline: none;
    border: none;
    background: none;
    font-size: 1rem;
    color: var(--text-secondary);
    padding: 0.5rem;
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
    outline: none;
    background: none;
    &:focus {
      border: 3px solid #1ccaff;
      color: #1ccaff;
    }
  }
`;
const BackgroundWrapper = styled.div`
  background-image: linear-gradient(
    109.6deg,
    rgba(45, 116, 213, 0.85) 11.2%,
    rgba(121, 137, 212, 0.85) 91.2%
  );
  min-height: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    text-align: center;
    font-size: 1.25rem;
    padding: 1rem;
    color: white;
  }
`;
export {
  Container,
  FormWrapper,
  Maindiv,
  Secondarydiv,
  StyledImage,
  StyledUpload,
  Preview,
  StyledButton,
  Styledinput,
  StyledDropdown,
  StyledTextArea,
  BackgroundWrapper,
  Styledtagcontainer,
  StyledTags,
};
