import Image from "next/image";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateContext } from "../lib/context";
import {
  FormWrapper,
  Maindiv,
  Preview,
  Secondarydiv,
  StyledImage,
  StyledUpload,
  Container,
  StyledButton,
  StyledDropdown,
  Styledinput,
} from "../styles/createStyles";
import Quill from "../components/Quill";
import { MdCancel } from "react-icons/md";
import { getSession } from "@auth0/nextjs-auth0";
import prisma from "../lib/prisma";
import toast from "react-hot-toast";

const Create = () => {
  const { value } = useStateContext();
  const hiddenFileInput = useRef(null);
  const [name, setName] = useState([]);
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);

  const removeFile = (index) => {
    const newFiles = file.filter((image, i) => i !== index);
    setFile(newFiles);
  };

  const handleChange = (e) => {
    for (const file of e.target.files) {
      setName((name) => [...name, file.name]);
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile((file) => [...file, reader.result]);
      };
    }
  };

  const uploadFiles = async () => {
    let toastId;
    try {
      toastId = toast.loading("Uploading files...");
      const data = fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(file),
      });
      const res = await data;
      const json = await res.json();
      setFileUrl(json.url);
      toast.success("Files uploaded successfully", { id: toastId });
    } catch (error) {
      toast.error("Unable to upload", { id: toastId });
    }
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // if (fileUrl.length === 0) {
    //   return toast.error("Please upload a document before adding the case");
    // }
    const caseData = {
      accused: data.accused,
      caseName: data.caseName,
      caseNumber: data.caseNumber,
      caseDescription: value,
      category: parseInt(data.category),
      court: parseInt(data.court),
      filingDate: data.filingDate,
      hearingDate: data.hearingDate,
      judge: parseInt(data.judge),
      plaintiff: data.plaintiff,
      rulingDate: data.rulingDate,
      caseFiles: fileUrl,
    };
    console.log(caseData);
    reset();
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormWrapper>
          <Maindiv>
            <Styledinput>
              <label>Case Number*</label>
              <input
                type="text"
                {...register("caseNumber", { required: true })}
              />
              {errors.caseNumber && <div>This field is required</div>}
            </Styledinput>
            <Styledinput>
              <label>Case Name*</label>
              <input
                type="text"
                {...register("caseName", { required: true })}
              />
              {errors.caseName && <div>This field is required</div>}
            </Styledinput>
            <Styledinput>
              <label>Accused*</label>
              <input type="text" {...register("accused", { required: true })} />
              {errors.accused && <div>This field is required</div>}
            </Styledinput>
            <Styledinput>
              <label>Plaintiff*</label>
              <input
                type="text"
                {...register("plaintiff", { required: true })}
              />
              {errors.plaintiff && <div>This field is required</div>}
            </Styledinput>
            <div>
              <p
                style={{
                  marginTop: "1rem",
                  fontWeight: "500",
                  fontSize: "1rem",
                  color: "var(--text-secondary)",
                }}
              >
                Case Description
              </p>
              <Quill />
            </div>
            <StyledImage onClick={() => hiddenFileInput.current.click()}>
              <div>
                <Image
                  src="/files.svg"
                  alt="files"
                  height={150}
                  width={300}
                  objectFit={"cover"}
                />
              </div>
              <div>
                <h5>Drop or select Files</h5>
                <p>
                  Drop files here or click&nbsp;<span>browse</span>
                  &nbsp;through your machine
                </p>
              </div>
              <input
                type={"file"}
                ref={hiddenFileInput}
                multiple
                style={{ display: "none" }}
                onChange={handleChange}
              />
            </StyledImage>
            <Preview>
              {file.map((element, index) => (
                <div key={element}>
                  <Image
                    src={"/document.png"}
                    alt="image"
                    height={80}
                    width={80}
                    objectFit={"cover"}
                  />
                  <button type="button" onClick={() => removeFile(index)}>
                    <MdCancel />
                  </button>
                  <p>{name[index]}</p>
                </div>
              ))}
            </Preview>
            {file.length > 0 && (
              <StyledUpload>
                <button
                  type="button"
                  onClick={() => {
                    setFile([]);
                    setName([]);
                  }}
                >
                  Remove all
                </button>
                <button type="button" onClick={() => uploadFiles()}>
                  Upload Files
                </button>
              </StyledUpload>
            )}
            {fileUrl.length > 0 && (
              <h3>Document has been uploaded successfully</h3>
            )}
          </Maindiv>
          <Secondarydiv>
            <StyledDropdown>
              <label>Judge</label>
              <select {...register("judge")}>
                <option value="1">John Doe</option>
                <option value="2">Jane Doe</option>
              </select>
            </StyledDropdown>
            <StyledDropdown>
              <label>Court</label>
              <select {...register("court")}>
                <option value="1">Supreme Court</option>
                <option value="2">Court Of Appeal</option>
                <option value="3">High court</option>
                <option value="4">Environmnetal and Land Court</option>
                <option value="5">Employment and Labour Relations court</option>
              </select>
            </StyledDropdown>
            <StyledDropdown>
              <label>Case Category</label>
              <select {...register("category")}>
                <option value="1">Criminal Case</option>
                <option value="2">Civil Case</option>
                <option value="3">Family Case</option>
                <option value="4">Testing Case</option>
                <option value="5">Land Registration</option>
                <option value="6">Immigration</option>
                <option value="7">Administrative Case</option>
              </select>
            </StyledDropdown>
            <Styledinput>
              <label>Filing date</label>
              <input
                type="date"
                {...register("filingDate", { required: true })}
              />
              {errors.filingDate && <div>This field is required</div>}
            </Styledinput>
            <Styledinput>
              <label>Hearing date</label>
              <input
                type="date"
                {...register("hearingDate", { required: true })}
              />
              {errors.hearingDate && <div>This field is required</div>}
            </Styledinput>
            <Styledinput>
              <label>Ruling date</label>
              <input
                type="date"
                {...register("rulingDate", { required: true })}
              />
              {errors.rulingDate && <div>This field is required</div>}
            </Styledinput>
            <StyledButton type="submit">Add Case</StyledButton>
          </Secondarydiv>
        </FormWrapper>
      </form>
    </Container>
  );
};

export default Create;

export const getServerSideProps = async ({ req, res }) => {
  const session = getSession(req, res);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/api/auth/login",
      },
      props: {},
    };
  }

  const user = await prisma.user.findUnique({
    select: {
      email: true,
      role: true,
    },
    where: {
      email: session.user.email,
    },
  });

  if (user.role !== "ADMIN") {
    return {
      redirect: {
        permanent: false,
        destination: "/403",
      },
      props: {},
    };
  }

  return {
    props: {},
  };
};
