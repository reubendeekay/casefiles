import { nanoid } from "nanoid";
import { decode } from "base64-arraybuffer";
import { supabase } from "../../lib/supabase";

export default async function handler(req, res) {
  if (req.method === "POST") {
    let documents = req.body;
    if (!documents) {
      return res.status(500).json({ message: "No documents provided" });
    }
    const documentURL = JSON.parse(documents);
    const arrayUrl = [];
    for (const document of documentURL) {
      try {
        const contentType = document.match(/data:(.*);base64/)?.[1];
        const base64FileData = document.split("base64,")?.[1];

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

        arrayUrl.push(url);
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
      }
    }
    return res.status(200).json({ url: arrayUrl });
  } else {
    res.setHeader("Allow", ["POST"]);
    res
      .status(405)
      .json({ message: `HTTP method ${req.method} is not supported.` });
  }
}
