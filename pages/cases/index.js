import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";
import Image from "next/image";
import { supabase } from "../../lib/supabase";
import { useUser } from "@auth0/nextjs-auth0";
import Link from "next/link";
import { FiPlusCircle } from "react-icons/fi";

const Index = ({ cases }) => {
  const { user, error, isLoading } = useUser();
  return (
    <Container>
      <FilterWrapper>
        <Filter />
      </FilterWrapper>
      <Caseswrapper>
        {user && (
          <Box>
            <Link href="/">
              <button>
                <FiPlusCircle />
                <a>Add Judge</a>
              </button>
            </Link>
            <Link href="/">
              <button>
                <FiPlusCircle />
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
            <tr>
              <td>
                {/* <Image
                  src="/patent-law.jpg"
                  alt="patent-law"
                  width="100"
                  height="100"
                  style={{ borderRadius: "20px" }}
                /> */}
                <h3>
                  Case No:<span>CSR-001</span>
                </h3>
                <h3>
                  Filing Date:<span>28th june 2022</span>
                </h3>
              </td>
              <td>Just some random data in here</td>
              <td>More Random data about the case</td>
            </tr>
            <tr>
              <td>
                <Image
                  src="/court-session.jpg"
                  alt="patent-law"
                  width="100"
                  height="100"
                  objectFit="cover"
                  style={{ borderRadius: "20px" }}
                />
              </td>
              <td>Just some random data in here</td>
              <td>More Random data about the case</td>
            </tr>
          </tbody>
        </StyledTable>
      </Caseswrapper>
    </Container>
  );
};

export async function getServerSideProps() {
  const { data: cases, error } = await supabase.from("Case").select("*");
  return {
    props: {
      cases,
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
