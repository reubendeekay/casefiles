import styled from "styled-components";

const Box = styled.div`
  margin: 1rem;
  flex-basis: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    color: var(--text-secondary);
  }
  button {
    display: flex;
    align-items: center;
    padding: 10px;
    gap: 1rem;
    outline: none;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    background: #03c9d7;
    box-shadow: rgb(28 202 255 / 24%) 0px 8px 16px 0px;
    svg {
      font-size: 1.5rem;
    }
    a {
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const CaseContainer = styled.div`
  margin: 1rem;
  background: #fff;
  padding: 16px;
  flex-basis: 100%;
  max-width: 100%;
  border-radius: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  h1 {
    font-size: 1.3rem;
    text-align: center;
    margin-bottom: 1.5rem;
  }
`;

const CaseWrapper = styled.div`
  overflow: auto;
`;

const SearchInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    padding: 10px;
    border: 1px solid #d5d3d3;
    border-radius: 10px;
    svg {
      font-size: 1.5rem;
      color: var(--text-secondary);
    }
    input {
      font-size: 1rem;
      border: none;
      &:focus {
        outline: none;
        background: none;
      }
    }
    &:focus-within {
      border: 1px solid #1ccaff;
    }
  }
  button {
    border: none;
    outline: none;
    background: none;
    cursor: pointer;
    svg {
      font-size: 1.5rem;
    }
  }
`;

const StyledTable = styled.table`
  min-width: 45rem;
  width: 100%;
  margin: 1rem 0rem;
  border-collapse: collapse;
  border-spacing: 0px;
  thead {
    background: #f4f6f8;
    tr {
      border: none;
      outline: none;
      vertical-align: middle;
      th {
        padding: 16px 10px;
        color: #637381;
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
        :first-of-type {
          border-top-left-radius: 10px;
          border-bottom-left-radius: 10px;
        }
        :last-of-type {
          border-top-right-radius: 10px;
          border-bottom-right-radius: 10px;
        }
      }
    }
  }
  tbody {
    tr {
      vertical-align: top;
      border-bottom: 1px solid #eaeaea;
      td {
        padding: 16px 10px;
        text-align: left;
        font-size: 1rem;
        h3 {
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-secondary);
          span {
            margin-left: 1rem;
            font-weight: 500;
            color: var(--text-primary);
          }
        }
      }
    }
  }
`;

const PaginationDiv = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
  p {
    font-size: 1rem;
  }
  div {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    button {
      border: none;
      outline: none;
      background: none;
      cursor: pointer;
      svg {
        font-size: 1.5rem;
      }
    }
  }
  select {
    border: none;
    outline: none;
    background: none;
  }
  @media (min-width: 600px) {
    gap: 2rem;
  }
`;

export {
  Box,
  CaseContainer,
  CaseWrapper,
  SearchInput,
  StyledTable,
  PaginationDiv,
};
