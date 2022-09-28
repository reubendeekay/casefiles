import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

export default async function handleUpload(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
  const files = req.body;
  if (!files) {
    return res.status(500).json({ message: "No data provided" });
  }
  const content = files.content.split(" ");
  try {
    const { data, error } = await supabase.from("Case").insert([
      {
        id: uuidv4(),
        caseNumber: files.caseNumber,
        caseSubject: files.caseSubject,
        caseDescription: files.caseDescription,
        accused: files.accused,
        plaintiff: files.plaintiff,
        caseFiles: Object.assign({}, files.caseFiles),
        caseContent: Object.assign({}, content),
        judgeId: Object.assign({}, files.judge),
        filingDate: files.filingDate,
        hearingDate: files.hearingDate,
        rulingDate: files.rulingDate,
      },
    ]);
    if (error) {
      throw new Error("Unable to upload document to storage");
    }
    res.status(200).json({ message: "Case created successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
}
