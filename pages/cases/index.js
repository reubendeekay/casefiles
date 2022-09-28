import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";
import { supabase } from "../../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";

import { useStateContext } from "../../lib/context";

import {
  FiPlusCircle,
  FiUser,
  FiFile,
  FiDownload,
  FiDownloadCloud,
} from "react-icons/fi";
import { MdFileDownload } from "react-icons/md";

const Index = ({ cases }) => {
  const { user } = useUser();
  const { filteredCases } = useStateContext();

  return (
    <Container>
      <FilterWrapper>
        <Filter judges={cases} />
      </FilterWrapper>
      <Caseswrapper>
        {/* {user && (
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
                <a>Add a PRA Law Report</a>
              </button>
            </Link>
            <Link href="/create">
              <button>
                <FiPlusCircle />
                <a>Add a Case</a>
              </button>
            </Link>
          </Box>
        )} */}
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
                      {Object.keys(caseItem.judgeId)
                        .map((key) => caseItem.judgeId[key])
                        .join(" & ")}
                    </span>
                  </h3>
                </td>
                <td>
                  <h3>
                    Delivery Date:
                    <span>
                      {new Date(caseItem.createdAt)
                        .toISOString()
                        .slice(0, 11)
                        .replace("T", " ")
                        .replace("-", "/")}
                    </span>
                  </h3>
                  <div
                    style={{
                      backgroundColor: "#38c983",
                      padding: "0.5rem",
                      maxWidth: "2rem",
                      marginTop: "0.5rem",
                      borderRadius: "30px",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <MdFileDownload
                      style={{
                        color: "#ffffff",
                      }}
                    />
                  </div>
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
      font-size: 16;
      // font-weight: 600;
    }
  }
`;
