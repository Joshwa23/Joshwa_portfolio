import { Project, SkillCategory, Experience, Education } from "./types";

export const projectsData: Project[] = [
  {
    id: "surevelcap",
    title: "Surevelcap",
    subtitle: "Surveillance Video Anomaly Detection & Captioning",
    description: "An AI-powered system designed to analyze security feeds, automatically flag anomalous activity, and generate descriptive text subtitles in real time.",
    tags: ["Python", "MIL Neural Net", "ResNeXt-101", "GRU Networks", "GloVe Embeddings", "UCF-Crime"],
    features: [
      "Custom Python-based deep learning architecture using Multiple Instance Learning (MIL) criteria",
      "Feature extraction via ResNeXt-101 yielding top precision and efficiency on multi-dimensional videos",
      "Automatic dynamic captioning via Gated Recurrent Units (GRU) utilizing static GloVe word embeddings",
      "Extensively trained and optimized on massive datasets (UCF-Crime and UCFC-VD)",
      "High-speed pipeline capable of real-time multi-stream anomaly visual reporting"
    ],
    imageAccent: "cyan",
    iconName: "ShieldAlert",
    githubUrl: "https://github.com/Joshwa23/project",
  },
  {
    id: "lofi-music",
    title: "Lo-Fi Music Station",
    subtitle: "Aesthetic YouTube-Integrated Audio Space",
    description: "A highly immersive, web-based music streaming client with custom ambient sounds, aesthetic visualizers, and interactive room layouts.",
    tags: ["React.js", "HTML5 Audio", "YouTube Web API", "Tailwind CSS", "Local Storage", "Framer Motion"],
    features: [
      "Full Integration with search, autocomplete and player pipelines of the YouTube API",
      "Interactive pixel-art dashboard with night-mode toggle, atmospheric weather sound overlays (rain, crackling fire)",
      "Dynamic background visualizer rendering in-sync waves, customized for lo-fi aesthetics",
      "Persistent state memory allowing users to save custom playlist profiles, historical logs and sound settings",
      "Immersive, responsive layout beautifully suited for long-form study sessions or relaxation"
    ],
    imageAccent: "blue",
    iconName: "Music",
    githubUrl: "https://github.com/Joshwa23/project",
  },
  {
    id: "f1-stats",
    title: "F1 Stats Dashboard",
    subtitle: "Interactive Statistics Platform",
    description: "A data-rich interactive web application designed to consolidate, analyze, and display Formula 1 racing metrics, season trajectories, and aerodynamic statistics.",
    tags: ["Python", "Flask", "React.JS", "Tailwind CSS", "Data Scraping", "Chart.js"],
    features: [
      "RESTful API server built on top of Flask for hosting live racing updates and driver statistics",
      "Highly responsive data grid with sorting, searching, and visual metric progress bars",
      "Rich interactive graphs tracing season points, qualifying timings, and team performance trends",
      "Highly optimized HTML/CSS structures supporting rich mobile-first viewports",
      "Live stats synchronization module scraping telemetry data for precise displays"
    ],
    imageAccent: "purple",
    iconName: "Flame",
    githubUrl: "https://github.com/Joshwa23/project",
  }
];

export const skillsData: SkillCategory[] = [
  {
    title: "Programming",
    color: "cyan",
    skills: [
      { name: "Python", level: 92, info: "Deep learning pipelines, Flask APIs, Scripting" },
      { name: "JavaScript / TS", level: 88, info: "Modern React.js, Node.js backend orchestration" },
      { name: "Java", level: 82, info: "Object Oriented designs, Full Stack trainee standard" },
      { name: "C#", level: 75, info: "Dynamic application forms, backend game structures" },
      { name: "C++", level: 70, info: "Core algorithms, pointer logistics and college projects" }
    ]
  },
  {
    title: "Web Development",
    color: "blue",
    skills: [
      { name: "React.js", level: 90, info: "Hooks, complex states, custom routing and 3D animations" },
      { name: "Node.js", level: 85, info: "Express endpoints, secure middleware and server APIs" },
      { name: "Flask", level: 88, info: "Data routing, light microservices, scraping endpoints" },
      { name: "HTML & CSS", level: 95, info: "Responsive Flexbox/Grid layouts, modern animation frames" },
      { name: "Tailwind CSS", level: 92, info: "Modular utilities, micro-interactions" }
    ]
  },
  {
    title: "Data & Cloud",
    color: "purple",
    skills: [
      { name: "SQL & MySQL", level: 85, info: "Relational modeling, query optimization, joins" },
      { name: "Power BI Cloud", level: 80, info: "Interactive engineering dashboards, data reports" },
      { name: "Machine Learning", level: 85, info: "MIL, Scikit-learn, Pandas, GRU captioning, feature prep" },
      { name: "Git & Versioning", level: 90, info: "Branch management, rebases, collaborative commits" },
      { name: "Microsoft Excel", level: 88, info: "Advanced workbook formulas, pivots, visual graphs" }
    ]
  }
];

export const experiencesData: Experience[] = [
  {
    role: "Machine Learning Engineer Intern",
    company: "VCodez",
    period: "March 2025 – July 2025",
    description: "Specialized in end-to-end model training, data ingestion, and pipeline feature engineering.",
    bullets: [
      "Collaboratively trained and evaluated Scikit-learn classification and regression models.",
      "Engineered clean real-time streaming data ingestion pipelines, resolving structural bottlenecks.",
      "Conducted extensive data modeling and statistical analysis using Python, Scikit-learn, and Pandas.",
      "Designed clean API contracts to pipeline machine learning outputs into web preview portals."
    ],
    skillsGained: ["Machine Learning", "Python", "Scikit-learn", "Pandas", "Feature Engineering"]
  },
  {
    role: "Java Full Stack Developer Trainee",
    company: "Capgemini-affiliated via EduBridge",
    period: "June 2025",
    description: "Underwent intensive, Capgemini-standard full-stack training focused on architecting responsive enterprise apps.",
    bullets: [
      "Engineered structured full-stack systems using Java backend architectures.",
      "Built clean react frontports adhering to modern responsive and modular patterns.",
      "Designed and mapped complex database schemas with rigorous relational integrity rules.",
      "Crafted server-side controller APIs, middleware filters, and authorization protocols."
    ],
    skillsGained: ["Java", "Full Stack", "React", "Database Integration", "Systems Design"]
  },
  {
    role: "AI & Data Intern",
    company: "Indium Software",
    period: "January 2024 – February 2024",
    description: "Contributed to internal AI-focused projects, aiding data ingestion models and experimental UI layout structures.",
    bullets: [
      "Assisted senior engineers with structuring machine learning logic maps and validation workflows.",
      "Integrated key database pipelines, executing heavy cleaning processes on raw telemetry.",
      "Drafted experimental web views to enable user interaction with core modeling prototypes.",
      "Tested and debugged complex REST API endpoints used internally for model triggers."
    ],
    skillsGained: ["AI & Data", "Python Pipelines", "REST APIs", "Web Interactivity", "Data Cleaning"]
  }
];

export const educationData: Education[] = [
  {
    degree: "B.E. in Computer Science & Engineering",
    institution: "Apollo Engineering College",
    period: "Aug 2021 – May 2025",
    perf: "CGPA: 8.5 / 10",
    details: "Focus on AI pipelines, Software Design, Advanced Algorithms, and Web Architectures."
  },
  {
    degree: "XII CBSE (Computer Science)",
    institution: "Sri Krish International School",
    period: "June 2021",
    perf: "Percentage: 75%",
    details: "Core focus on programming, binary algorithms, and general mathematics."
  },
  {
    degree: "X CBSE (General Academic)",
    institution: "Sri Krish International School",
    period: "May 2019",
    perf: "Percentage: 72%"
  }
];
