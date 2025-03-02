import express from "express";
import cors from "cors";
import { Resend } from "resend";
import "dotenv/config";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send-email", async (req, res) => {
  const { email } = req.body;
  try {
    await resend.emails.send({
      from: "clarifyai <noreply@clarifyai.space>",
      to: email,
      subject: "🎉 Welcome to ClarifyAI - Your Spot is Reserved!",
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px;">
          <h1 style="color: #4F46E5;">🎉 Welcome to ClarifyAI!</h1>
          <p>Thank you for joining our whitelist! 🚀 Your spot has been reserved.</p>
          <p>Stay tuned for updates on how you can start automating your tickets with AI.</p>
        </div>
      `,
    });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email." });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
