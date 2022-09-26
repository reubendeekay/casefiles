import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";

const Index = ({ cases }) => {
  return (
    <Container>
      <FilterWrapper>
        <Filter />
      </FilterWrapper>
      <Caseswrapper>
        <StyledTable>
          <thead>
            <tr>
              <th>Product</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <h1>No data has been registered yet</h1>
          </tbody>
        </StyledTable>
      </Caseswrapper>
    </Container>
  );
};

export default Index;

export async function getServerSideProps() {
  const cases = await prisma.case.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
      judge: {
        select: {
          name: true,
        },
      },
      court: {
        select: {
          name: true,
          location: true,
          room: true,
        },
      },
    },
  });
  return {
    props: {
      cases: JSON.parse(JSON.stringify(cases)),
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const FilterWrapper = styled.div`
  max-width: 350px;
`;

const Caseswrapper = styled.div``;
