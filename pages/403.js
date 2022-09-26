import Image from "next/image";
import styled from "styled-components";

const Forbidden = () => {
  return (
    <Conatiner>
      <div>
        <Image src="/403.jpg" alt="forbidden" width="700" height="700" />
      </div>
      <div>
        <h1>403 Forbidden</h1>
        <p>You do not have access to view this page</p>
      </div>
    </Conatiner>
  );
};

export default Forbidden;

const Conatiner = styled.div`
  display: flex;
  align-items: center;
`;
