import { supabase } from "../../../lib/supabase";

export default async function handleSearch(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
  const { caseNumber } = req.body;
  if (!caseNumber) {
    return res.status(500).json({ message: "No data provided" });
  }
  try {
    const { data, error } = await supabase
      .from("Case")
      .select("*")
      .eq("caseNumber", caseNumber);
    if (error) {
      throw new Error("Unable to upload document to storage");
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
