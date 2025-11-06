import express from "express";
import db from "../config/db.js";
const router = express.Router();

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
    if (!rows.length) return res.status(200).json({ message: "If the email exists, a reset link will be sent." });
    console.log("Forgot password requested for:", email);
    return res.status(200).json({ message: "If the email exists, a reset link will be sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error processing request" });
  }
});

export default router;
