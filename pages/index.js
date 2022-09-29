import Head from "next/head";
import styled from "styled-components";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import CustomFooter from "./footer";

export default function Home() {
  return (
    <div>
      <Head>
        <title>PPRA Case Search</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero>
        <Infodiv>
          <div>
            <h1>PPRA Case Search</h1>
            <p>
              We provide a wide array of case files from our database. Browse
              through our extensive library from the courtroom to your corner
              office.
            </p>
          </div>
        </Infodiv>
        <Imagediv>
          <Image
            src="/lawyer.png"
            alt="court"
            width={900}
            height={750}
            objectFit={"fill"}
          />
        </Imagediv>
      </Hero>
      <DataSection>
        <h1>Dive In</h1>
        <p>
          Start Exploring our data. Here are some categories you can use to
          check it out
        </p>
        <Datadiv>
          <div>
            <Image
              src="/search-files.svg"
              alt="search"
              width="150"
              height="150"
            />
            <h3>
              Search cases with an intuitive, powerful search engine interface.
            </h3>
          </div>
          <div>
            <Image
              src="/see-trends.svg"
              alt="search"
              width="150"
              height="150"
            />
            <h3>
              Historical Trends lets you visualize the use of terms over time in
              caselaw.
            </h3>
          </div>
          <div>
            <Image src="/download.svg" alt="search" width="150" height="150" />
            <h3>
              Download the data in a variety of formats, including JSON, CSV,
              and XML.
            </h3>
          </div>
        </Datadiv>
      </DataSection>
      <CustomFooter />
    </div>
  );
}

const Hero = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Infodiv = styled.div`
  // background: #f5f8fc;
  flex-basis: 50%;
  padding: 16px 5rem;
  display: flex;
  align-items: center;
  width: 100%;
  div {
    margin: auto;
    h1 {
      font-size: 3rem;
      font-weight: 900;
      line-height: 1;
      padding: 5px;
      // text-align: center;
      font-family: "Roboto", sans-serif;
    }
    p {
      font-size: 1.1rem;
      line-height: 1.5;
      font-weight: 400;
      padding: 5px;
      // text-align: center;
    }
  }
  @media (max-width: 768px) {
    order: 2;
    flex-basis: 100%;
  }
`;

const Imagediv = styled.div`
  flex-basis: 50%;
  @media (max-width: 768px) {
    order: 1;
    flex-basis: 100%;
  }
`;

const DataSection = styled.div`
  background: #edf4ff;
  padding: 1rem;
  h1 {
    font-size: 3rem;
    font-weight: 600;
    text-align: center;
    padding: 5px;
    margin-top: 1rem;
    font-family: "Roboto", sans-serif;
  }
  p {
    font-size: 1.1rem;
    font-weight: 400;
    text-align: center;
    padding: 5px;
  }
`;

const Datadiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 15px;
    gap: 1rem;
    h3 {
      font-size: 0.8rem;
      padding: 5px;
      font-weight: 400;
      text-align: center;
    }
    button {
      padding: 0.5rem 1rem;
      border: 1px solid #000;
      color: black;
      background: white;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
      p {
        font-size: 1rem;
      }
      svg {
        font-size: 1rem;
      }
      &:hover {
        background: black;
        color: white;
        svg {
          transform: translateX(5px);
          transform: scaleX(1.4);
          transition: 0.2s ease-in;
        }
      }
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;
