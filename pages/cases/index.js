import Filter from "../../components/Filter";
import styled from "styled-components";
import { StyledTable } from "../../styles/casesStyles";

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
              <th>Product</th>
              <th>Created At</th>
              <th>Status</th>
              <th>Quantity</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No cases registered yet</td>
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
`;

const FilterWrapper = styled.div`
  max-width: 350px;
`;

const Caseswrapper = styled.div``;
