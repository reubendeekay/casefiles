import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    let documents = req.body;
    if (!documents) {
      return res.status(500).json({ message: "No documents provided" });
    }

    try {
      const contentType = documents.match(/data:(.*);base64/)?.[1];
      const base64FileData = documents.split("base64,")?.[1];

      if (!contentType || !base64FileData) {
        return res.status(500).json({ message: "Image data not valid" });
      }

      const fileName = nanoid();
      const ext = contentType.split("/")[1];
      const path = `${fileName}.${ext}`;

      const { data, error: uploadError } = await supabase.storage
        .from(process.env.SUPABASE_BUCKET)
        .upload(path, decode(base64FileData), {
          contentType,
          upsert: true,
        });

      if (uploadError) {
        throw new Error("Unable to upload document to storage");
      }

      const url = `${process.env.SUPABASE_URL.replace(
        ".co",
        ".in"
      )}/storage/v1/object/public/${data.Key}`;

      return res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
