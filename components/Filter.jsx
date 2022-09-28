import { useForm } from "react-hook-form";
import {
  Container,
  StyledButton,
  StyledDropdown,
  Styledform,
  Styledinput,
} from "../styles/filterStyles";
import { useEffect, useRef } from "react";
import { FiX } from "react-icons/fi";
import { useStateContext } from "../lib/context";
import toast, { Toaster } from "react-hot-toast";

const Filter = () => {
  const { setFilter, setFilteredCases, setUsedFilter, filteredCases } =
    useStateContext();
  const filterRef = useRef();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // toast.loading("Filtering cases...");
    const cases = {
      caseNumber: data.caseNumber,
      caseName: data.caseName,
      caseContent: data.caseContent,
      parties: data.parties,
      judge: parseInt(data.judge),
      filingDate: data.filingDate,
      rulingDate: data.rulingDate,
    };
    fetch("/api/cases/searchCase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cases),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length === 0 || Object.keys(data).length === 0) {
          return toast.error("Ooops no cases found");
        }
        setFilteredCases(data);
        setUsedFilter(true);
        toast.success("Cases found");
      })
      .catch((err) => toast.error("Ooops an error occured"));
  };

  return (
    <Container ref={filterRef}>
      <h1
        style={
          //Add padding top to the h1
          { paddingTop: "1.2rem" }
        }
      >
        Search Decision
      </h1>
      <Styledform onSubmit={handleSubmit(onSubmit)}>
        <Styledinput>
          <label>Application Number</label>
          <input type="text" {...register("caseNumber")} />
        </Styledinput>
        <Styledinput>
          <label>Case Content</label>
          <input type="text" {...register("caseContent")} />
        </Styledinput>
        <Styledinput>
          <label>Party Names</label>
          <input type="text" {...register("parties")} />
        </Styledinput>
        <StyledDropdown>
          <label>Quorum Chair</label>
          <select {...register("judge")}>
            <option value="">Select a Judge</option>
            <option value="7">John Doe</option>
            <option value="2">Jane Doe</option>
          </select>
        </StyledDropdown>
        <Styledinput>
          <label>Date of Delivery</label>
          <input type="date" {...register("rulingDate")} />
        </Styledinput>
        <StyledButton type="submit">Search Case</StyledButton>
      </Styledform>
    </Container>
  );
};

export default Filter;
