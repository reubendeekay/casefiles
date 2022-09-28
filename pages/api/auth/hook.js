// pages/api/auth/hook
import { supabase } from "../../../lib/supabase";
import { v4 as uuidv4 } from "uuid";

const handler = async (req, res) => {
  const { email, secret } = req.body;
  // 1
  if (req.method !== "POST") {
    return res.status(403).json({ message: "Method not allowed" });
  }
  // 2
  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return res.status(403).json({ message: `You must provide the secret 🤫` });
  }
  // 3
  if (email) {
    // 4
    try {
      const { data, error } = await supabase.from("User").insert([
        {
          id: uuidv4(),
          email: email,
        },
      ]);
      return res.status(200).json({
        message: `User with email: ${email} has been created successfully!`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: error.message });
    }
  }
};

export default handler;
