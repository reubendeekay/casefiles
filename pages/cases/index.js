import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";
import Image from "next/image";

const Index = () => {
  return (
    <Container>
      <FilterWrapper>
        <Filter />
      </FilterWrapper>
      <Caseswrapper>
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
                <Image
                  src="/patent-law.jpg"
                  alt="patent-law"
                  width="100"
                  height="100"
                  style={{ borderRadius: "20px" }}
                />
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
