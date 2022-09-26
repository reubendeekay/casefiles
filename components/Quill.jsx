import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useStateContext } from "../lib/context";
import styled from "styled-components";

const Quill = () => {
  const { setValue } = useStateContext();
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }],
    ],
  };
  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      onChange={setValue}
      placeholder="Write Something Awesome..."
      escapeHtml={true}
    />
  );
};

export default Quill;
