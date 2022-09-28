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
  StyledTextArea,
  Styledtagcontainer,
  BackgroundWrapper,
  StyledTags,
} from "../styles/createStyles";
import { MdCancel } from "react-icons/md";
import { getSession, withPageAuthRequired } from "@auth0/nextjs-auth0";
import prisma from "../lib/prisma";
import toast from "react-hot-toast";
import { FiX } from "react-icons/fi";
import { useRouter } from "next/router";

const Create = ({ judges }) => {
  const hiddenFileInput = useRef(null);
  const [name, setName] = useState([]);
  const [file, setFile] = useState([]);
  const [fileUrl, setFileUrl] = useState([]);
  const [tags, setTags] = useState([]);
  const [chairId, setChairId] = useState([]);
  const router = useRouter();

  const removeFile = (index) => {
    const newFiles = file.filter((image, i) => i !== index);
    setFile(newFiles);
  };

  const addTag = (e) => {
    judges.filter((judge) => {
      if (judge.id === e.target.value) {
        setTags([...tags, judge.name]);
        setChairId([...chairId, judge.id]);
      }
    });
  };
  const removeTag = (index) => {
    const newTags = tags.filter((tag, i) => i !== index);
    setTags(newTags);
    const newChairId = chairId.filter((tag, i) => i !== index);
    setChairId(newChairId);
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
    if (fileUrl.length === 0) {
      return toast.error("Please upload a document before adding the case");
    }
    if (tags.length === 0) {
      return toast.error("Please add at least one chair");
    }
    const caseData = {
      accused: data.accused,
      caseSubject: data.caseSubject,
      caseNumber: data.caseNumber,
      caseDescription: data.description,
      content: data.content,
      filingDate: data.filingDate,
      hearingDate: data.hearingDate,
      judge: chairId,
      plaintiff: data.plaintiff,
      rulingDate: data.rulingDate,
      caseFiles: fileUrl,
    };
    let toastId;
    try {
      toastId = toast.loading("Adding case...");
      fetch("/api/cases/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(caseData),
      }).then((res) => {
        if (res.status === 200) {
          toast.success("Case added successfully🎉", { id: toastId });
          reset();
          router.push("/cases");
        } else {
          toast.error("Unable to add case", { id: toastId });
        }
      });
    } catch (error) {
      toast.error("Unable to add case", { id: toastId });
    }
  };

  return (
    <Container>
      <BackgroundWrapper>
        <h1>ADD A NEW CASE</h1>
      </BackgroundWrapper>
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
              <label>Case Subject*</label>
              <input
                type="text"
                {...register("caseSubject", { required: true })}
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
            <StyledTextArea>
              <label>Case Description*</label>
              <br />
              <textarea {...register("description", { required: true })} />
              {errors.description && <div>This field is required</div>}
            </StyledTextArea>
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
                  style={{ cursor: "pointer" }}
                >
                  Remove all
                </button>
                <button
                  type="button"
                  onClick={() => uploadFiles()}
                  style={{
                    color: "white",
                    background: "#4269d4",
                    cursor: "pointer",
                  }}
                >
                  Upload Files
                </button>
              </StyledUpload>
            )}
            {fileUrl.length > 0 && (
              <h3>Document has been uploaded successfully</h3>
            )}
          </Maindiv>
          <Secondarydiv>
            <Styledtagcontainer>
              <label>Chair</label>
              <StyledTags>
                {tags.length > 0 &&
                  tags.map((tag, index) => (
                    <div key={index}>
                      <span>{tag}</span>
                      <FiX onClick={() => removeTag(index)} />
                    </div>
                  ))}
                <select onChange={addTag}>
                  <option>Select Chair</option>
                  {judges.map((judge) => (
                    <option key={judge.id} value={judge.id}>
                      {judge.name}
                    </option>
                  ))}
                </select>
              </StyledTags>
            </Styledtagcontainer>
            <Styledinput>
              <label>Case Content*</label>
              <input type="text" {...register("content", { required: true })} />
              {errors.plaintiff && <div>This field is required</div>}
            </Styledinput>
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

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps(context) {
    const session = getSession(context.req, context.res);
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

    const judges = await prisma.judge.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return {
      props: { judges },
    };
  },
});
