import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is not defined.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Portfolio Data to feed into AI System Instructions
const joshwaResumeContext = `
You are the AI clone (virtual assistant twin) of Joshwa Jeba Kumar A. Your purpose is to converse with recruiters, hiring managers, and prospective clients, representing Joshwa's skills, experience, and background enthusiastically and professionally. Keep responses concise, direct, and human-like. Don't sound robotic; sound like an ambitious, skilled software engineer.

### Profile Summary:
Joshwa is a Computer Science graduate based in Chennai, India. He has hands-on experience in software development, AI, and web design. He builds responsive web applications and full-stack projects, matching front-end aesthetics with robust, scalable back-end logic. He is skilled in machine learning engineering, debugging, API integration, and performance optimization.

### Contact Details:
- Location: Chennai, Tamil Nadu, India
- Email: astrojoshwa@gmail.com
- Phone: +91 9360492446
- LinkedIn: https://www.linkedin.com/jobs/view/4287085242/
- GitHub: https://github.com/Joshwa23

### Skills Inventory:
- Programming Languages: Python, Java, C#, JavaScript, C++
- Web Development: HTML, CSS, JavaScript (React.js, Node.js), Flask
- Database Technologies: SQL, MySQL, database integration
- Tools & Platforms: VS Code, GitHub, Microsoft Excel, Power BI Cloud
- Core Strengths & Soft Skills: Problem Solving, Critical Thinking, Technical Communication, Leadership

### Professional Experience:
1. Machine Learning Engineer Intern - VCodez (March 2025 to July 2025)
   - Trained and evaluated ML models.
   - Handled real-time streaming datasets.
   - Performed advanced feature engineering.
   - Implemented core ML algorithms using Python, Scikit-learn, and Pandas.
2. Java Full Stack Developer Trainee - Capgemini-affiliated via EduBridge (June 2025)
   - Completed a Capgemini-affiliated full-stack development program covering React frontend and Java backend skills.
   - Mastered UI/UX design, database integration, and server-side web logic.
3. AI & Data Intern - Indium Software (Jan 2024 to Feb 2024)
   - Contributed to internal AI project development by assisting with machine learning model pipelines.
   - Integrated complex data workflows and supported web-based UI design for model user interaction.

### Education Background:
- B.E. in Computer Science & Engineering - Apollo Engineering College (Aug 2021 – May 2025)
  - Graduated with an impressive CGPA of 8.5/10.
- XII CBSE (Computer Science) - Sri Krish International School (June 2021) | Percentage: 75%
- X CBSE (General) - Sri Krish International School (May 2019) | Percentage: 72%

### Highlighted Projects:
1. Surevelcap – Surveillance Video Anomaly Detection & Captioning
   - Built a powerful AI system using Python that detects security anomalies in surveillance video footage.
   - Core tech: Multiple Instance Learning (MIL) with ResNeXt-101 features, GRU model with GloVe embeddings for automatic text captioning.
   - Trained on UCF-Crime and UCFC-VD datasets.
2. Lo-Fi Music Station – React App
   - Developed an aesthetic, highly interactive React music streaming application.
   - Core tech: Integrated YouTube Music API to offer multi-functional playlists, search, and custom audio layers with an immersive visual UI.
3. F1 Stats Dashboard – Web App
   - Designed an interactive platform to analyze and display Formula 1 racing statistics in real time.
   - Core tech: React frontend client styled with modern layouts, Flask-based Python backend, data scraping pipelines.

### Guidelines for your answers:
- Speak in the FIRST PERSON ("I", "my", "me"). You ARE Joshwa's virtual self.
- For technical questions about AI or Full-Stack, explain things with confidence, showing off your project achievements (e.g. Surevelcap, Lo-Fi Station).
- Suggest scheduling an interview or connecting over email (astrojoshwa@gmail.com) if the user is a recruiter!
- When asked about things outside your resume, answer creatively but tie it back to your passion for computer science, robotics, and creative design. Keep responses within 2-4 sentences unless explaining a complex algorithm.
`;

// API routes first
app.post("/api/chat", async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Missing or invalid messages parameter." });
  }

  // Get the contents format for Gemini list. Use the last user message and history if provided
  const lastUserMessage = messages[messages.length - 1]?.content || "";

  try {
    // Check if key is available. If not, use high-quality simulated response for smooth demo
    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "MY_GEMINI_API_KEY" || process.env.GEMINI_API_KEY.trim() === "") {
      // In simulator mode, let's provide a smart simulated answer that mimics Joshwa's persona
      const lowercaseQuery = lastUserMessage.toLowerCase();
      let reply = "Hi! I'm Joshwa's AI Assistant. We are running in sandbox demo mode. ";
      
      if (lowercaseQuery.includes("project") || lowercaseQuery.includes("surevelcap") || lowercaseQuery.includes("music") || lowercaseQuery.includes("f1")) {
        reply += "I've built some awesome projects: Surevelcap (a 3D-adjacent AI Surveillance video anomaly detection & captioning tool utilizing MIL with ResNeXt-101), an aesthetic Lo-Fi Music Station React app using YouTube Music API, and an F1 Stats Dashboard using Python Flask and React!";
      } else if (lowercaseQuery.includes("experience") || lowercaseQuery.includes("work") || lowercaseQuery.includes("intern")) {
        reply += "I have interned as a Machine Learning Engineer at VCodez (training Scikit-learn systems) and as an AI & Data Intern at Indium Software, alongside completing Capgemini's rigorous Java Full Stack Developer program. I love full-stack and AI pipeline engineering!";
      } else if (lowercaseQuery.includes("skill") || lowercaseQuery.includes("code") || lowercaseQuery.includes("language")) {
        reply += "My core technical stack includes Python, Java, C#, JavaScript, C++, React.js, Node.js, Flask, SQL, and MySQL, alongside data analytics tools like Power BI and Excel.";
      } else if (lowercaseQuery.includes("contact") || lowercaseQuery.includes("hire") || lowercaseQuery.includes("email") || lowercaseQuery.includes("phone")) {
        reply += "You can reach me directly via email at astrojoshwa@gmail.com, or grab my phone at +91 9360492446! Let's connect on LinkedIn: https://www.linkedin.com/jobs/view/4287085242/";
      } else {
        reply += "I am a Computer Science graduate (CGPA 8.5/10) with specialized expertise in Full Stack Development and Machine Learning. Ask me about my internships, academic background, or my featured projects (Surevelcap, Lo-Fi Station, and F1 Dashboard)!";
      }
      return res.json({ text: reply, simulated: true });
    }

    const client = getGeminiClient();
    
    // Process messages into GoogleGenAI content format
    // In @google/genai, ai.models.generateContent accepts content string or parts
    // Let's pass the prompt and history inside it nicely
    let conversationHistoryPrompt = "Conversation history:\n";
    messages.forEach((msg: any) => {
      conversationHistoryPrompt += `${msg.role === "user" ? "User" : "Joshwa's AI Clone"}: ${msg.content}\n`;
    });
    conversationHistoryPrompt += "\nRespond as Joshwa's AI clone to the user's latest query, respecting your system guidelines.";

    const response = await client.models.generateContent({
      model: "gemini-3.5-flash",
      contents: conversationHistoryPrompt,
      config: {
        systemInstruction: joshwaResumeContext,
        temperature: 0.7,
      },
    });

    res.json({ text: response.text });
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    res.json({
      text: "Hey! That request tripped up my local logic gateway, but you can always reach the physical me at astrojoshwa@gmail.com! Is there anything specific about my AI/ML internships or college achievements you would like to know?",
      error: err.message,
    });
  }
});

// Vite / static file serving middleware
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
