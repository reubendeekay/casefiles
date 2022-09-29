import { supabase } from "../../../lib/supabase";

export default async function handleSearch(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
  const filteredCases = req.body;
  filteredCases.parties ? null : (filteredCases.parties = "");
  if (!filteredCases) {
    return res.status(500).json({ message: "No data provided" });
  }
  try {
    console.log(filteredCases.rulingDate.length);
    if (filteredCases.rulingDate.length == 0) {
      console.log("running");
      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("caseNumber", filteredCases.caseNumber)
        .ilike("plaintiff", `%${filteredCases.parties}%`);
      if (error) {
        throw new Error("Unable to search for cases");
      }
      res.status(200).json(data);
    } else {
      const { data, error } = await supabase
        .from("Case")
        .select("*")
        .eq("caseNumber", filteredCases.caseNumber)
        .ilike("plaintiff", `%${filteredCases.parties}%`)
        .eq("rulingDate", filteredCases.rulingDate);
      if (error) {
        throw new Error("Unable to search for cases");
      }
      res.status(200).json(data);
    }
    // if (error) {
    //   throw new Error("Unable to search for cases");
    // }
    // res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}
