import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { FiPlusCircle, FiUser, FiFile } from "react-icons/fi";

const Index = ({ cases }) => {
  console.log(cases);
  const { user } = useUser();
  return (
    <Container>
      <FilterWrapper>
        <Filter judges={cases} />
      </FilterWrapper>
      <Caseswrapper>
        {user && (
          <Box>
            <Link href="/">
              <button>
                <FiUser />
                <a>Add Judge</a>
              </button>
            </Link>
            <Link href="/">
              <button>
                <FiFile />
                <a>Create Report</a>
              </button>
            </Link>
            <Link href="/create">
              <button>
                <FiPlusCircle />
                <a>Create Case</a>
              </button>
            </Link>
          </Box>
        )}
        <StyledTable>
          <thead>
            <tr>
              <th>Case Information</th>
              <th>Client Information</th>
              <th>Case Details</th>
            </tr>
          </thead>
          <tbody>
            {cases.map((caseItem, index) => (
              <tr key={index}>
                <td>
                  <h3>
                    Application No:<span>{caseItem.caseNumber}</span>
                  </h3>
                  <h3>
                    Case Subject:<span>{caseItem.caseSubject}</span>
                  </h3>
                </td>
                <td>
                  <h3>
                    Plaintiff:<span>{caseItem.plaintiff}</span>
                  </h3>
                  <h3>
                    Accused:<span>{caseItem.accused}</span>
                  </h3>
                  <h3>
                    Chairs:
                    <span>
                      {Object.keys(caseItem.judgeId).map((key) => (
                        <span key={key}>{caseItem.judgeId[key]}</span>
                      ))}
                    </span>
                  </h3>
                </td>
                <td>
                  <h3>
                    Date Delivered:
                    <span>
                      {new Date(caseItem.createdAt)
                        .toISOString()
                        .slice(0, 19)
                        .replace("T", " ")}
                    </span>
                  </h3>
                  <h3
                    style={{
                      fontWeight: "400",
                      fontSize: "1rem",
                      padding: "0.1rem",
                      backgroundColor: "#f5a6b6",
                      color: "#d61326",
                      borderRadius: "5px",
                      maxWidth: "6rem",
                      textAlign: "center",
                      marginTop: "0.5rem",
                    }}
                  >
                    pending
                  </h3>
                </td>
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </Caseswrapper>
    </Container>
  );
};

export async function getServerSideProps() {
  const { data: cases, error } = await supabase.from("Case").select("*");
  const finalCases = [];

  for (const item of cases) {
    const judgeNames = [];
    for (const [key, value] of Object.entries(item.judgeId)) {
      const { data: judge, error } = await supabase
        .from("Judge")
        .select("name")
        .eq("id", value);
      judgeNames.push(judge[0].name);
    }
    finalCases.push({ ...item, judgeId: judgeNames });
  }
  return {
    props: {
      cases: finalCases,
    },
  };
}

export default Index;

const Container = styled.div`
  display: flex;
  background: white;
  justify-content: space-between;
  gap: 1rem;
`;

const FilterWrapper = styled.div`
  max-width: 350px;
`;

const Caseswrapper = styled.div`
  flex: 1;
`;

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
    background: #1ccaff;
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
