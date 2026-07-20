import { useState } from 'react';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  thumbnail: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'ExpediteAI',
    tagline: 'Autonomous AI agent for B2B sales and recruiting outreach',
    description: 'Expedite is an evidence-first outbound intelligence platform that combines LangGraph orchestration, verified lead discovery, ROI analytics, and personalized email drafting to help teams scale outreach efficiently.',
    techStack: ['TypeScript', 'Python', 'FastAPI', 'LangGraph', 'React', 'Vite', 'MongoDB', 'Groq', 'Hunter.io', 'Apollo'],
    liveUrl: 'https://expediteai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/OutboundAI',
    thumbnail: '01'
  },
  {
    id: '2',
    title: 'Kaisen',
    tagline: 'AI-powered security monitoring for infrastructure and LLM agents',
    description: 'Kaisen is a dual-layer security platform that monitors system telemetry and agent behavior in real time using deep Q-learning, anomaly detection, attack graph visualization, and explainable AI-driven interventions.',
    techStack: ['Python', 'React', 'TypeScript', 'Electron', 'Flask', 'TensorFlow', 'Socket.IO', 'D3.js', 'NetworkX'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Kaisen',
    thumbnail: '02'
  },
  {
    id: '3',
    title: 'VoiceAgent',
    tagline: 'Production-ready voice assistant with LiveKit and multimodal AI',
    description: 'A voice-first agent experience built for real-time conversations with speech-to-text, text-to-speech, tool use, and database-backed context, designed for healthcare and enterprise assistants.',
    techStack: ['Next.js', 'Python', 'LiveKit', 'OpenAI', 'Deepgram', 'Cartesia', 'Convex', 'WebRTC'],
    liveUrl: 'https://voice-agent-theta-lilac.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/VoiceAgent',
    thumbnail: '03'
  },
  {
    id: '4',
    title: 'Eliyonix',
    tagline: 'AI-powered solar mini-grid monitoring for rural India',
    description: 'Eliyonix combines IoT telemetry, LangGraph agents, Bedrock-based recommendations, multilingual voice assistance, and predictive alerts to monitor solar grids before failures escalate.',
    techStack: ['Python', 'FastAPI', 'React', 'Vite', 'LangGraph', 'AWS Bedrock', 'Qdrant', 'Ionic', 'MQTT', 'IoT'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Eliyonix',
    thumbnail: '04'
  },
  {
    id: '5',
    title: 'VidyutSeva',
    tagline: 'AI-powered outage intelligence and voice support for power grids',
    description: 'VidyutSeva helps citizens and utilities respond to electricity outages faster through voice AI, real-time outage ingestion, geospatial mapping, and multi-agent diagnosis.',
    techStack: ['FastAPI', 'React', 'AgentScope', 'LangGraph', 'Groq', 'Supabase', 'Qdrant', 'Vapi', 'Leaflet'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/VidyutSeva',
    thumbnail: '05'
  },
  {
    id: '6',
    title: 'Glaze',
    tagline: 'Semantic search over Google Drive files with AI embeddings',
    description: 'Glaze turns Google Drive content into searchable knowledge using natural-language queries, vector embeddings, and a lightweight Chrome extension experience.',
    techStack: ['Python', 'FastAPI', 'Qdrant', 'Google Drive API', 'Google Gemini', 'Chrome Extension', 'Tailwind CSS'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Glaze',
    thumbnail: '06'
  },
  {
    id: '7',
    title: 'IssuePilot',
    tagline: 'AI-powered support ticket management system',
    description: 'IssuePilot streamlines support operations by auto-classifying tickets, generating suggested actions, and presenting a clean dashboard for tracking issues and metrics.',
    techStack: ['Django', 'Django REST Framework', 'React', 'Vite', 'PostgreSQL', 'Gemini', 'Docker'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/IssuePilot',
    thumbnail: '07'
  },
  {
    id: '8',
    title: 'ReadyIndiaAI',
    tagline: 'Multilingual disaster alert system for India',
    description: 'ReadyIndiaAI delivers real-time disaster alerts in multiple Indian languages with AI simplification, geolocation-based insights, and safety guidance for users in crisis situations.',
    techStack: ['Node.js', 'Express', 'React', 'MongoDB', 'Google Gemini', 'Leaflet', 'Tailwind CSS', 'PWA'],
    liveUrl: 'https://ready-india-ai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/ReadyIndiaAI',
    thumbnail: '08'
  },
  {
    id: '9',
    title: 'Wanderpal AI',
    tagline: 'Full-stack AI travel assistant with agentic search',
    description: 'Wanderpal AI combines chat-based trip planning, persistent user profiles, travel recommendations, and agentic tools to help users explore destinations with context-aware assistance.',
    techStack: ['FastAPI', 'React', 'TypeScript', 'Langflow', 'MongoDB', 'Groq', 'SerpAPI', 'OpenTripMap', 'JWT'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Wanderpal-AI',
    thumbnail: '09'
  },
  {
    id: '10',
    title: 'Briefify AI',
    tagline: 'AI-powered document summarization platform',
    description: 'A full-stack web application for document summarization using Generative AI. Features include JWT-based authentication via Spring Security, Tesseract OCR for text extraction, and integration with Groq API for high-speed summarization.',
    techStack: ['Spring Boot', 'React', 'MongoDB', 'Tesseract OCR', 'Groq API', 'JWT', 'Vercel', 'Railway'],
    liveUrl: 'https://briefify-ai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/BriefifyAI',
    thumbnail: '10'
  },
  {
    id: '11',
    title: 'BeastXFitness AI',
    tagline: 'AI-Powered Fitness & Wellness Platform',
    description: 'A comprehensive AI-powered fitness and wellness application designed to help users achieve their health goals. Features personal records tracking, workout management, progress entries, and an AI chatbot powered by Botpress. Built with Spring Boot REST API and React frontend with MongoDB Atlas for data persistence.',
    techStack: ['Spring Boot', 'React', 'TypeScript', 'MongoDB Atlas', 'Botpress', 'JWT', 'Spring Security'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/FitnessAppAI',
    thumbnail: '11'
  },
  {
    id: '12',
    title: 'WorkoutApp',
    tagline: 'AI-powered personal fitness tool with RAG',
    description: 'A fitness application that combines Vector Databases (Astra DB) with AI capabilities using Langflow and RAG (Retrieval Augmented Generation) for contextual workout recommendations. Features real-time macros calculation, AI-powered workout recommendations, and contextual note-taking where gym limitations are considered when generating personalized workouts.',
    techStack: ['Python', 'Streamlit', 'Langflow', 'Astra DB', 'RAG', 'Vector Database'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/WorkoutApp',
    thumbnail: '12'
  },
  {
    id: '13',
    title: 'AyuMitraAI',
    tagline: 'Your nearest health center finding partner AI agent',
    description: 'An intelligent AI agent powered by Motia framework that helps users find their nearest health centers. Built with a polyglot architecture combining TypeScript, Python, and JavaScript, featuring background job processing, event-driven workflows, and AI-powered agent capabilities for healthcare discovery and recommendations.',
    techStack: ['TypeScript', 'Python', 'JavaScript', 'Motia', 'AI Agent', 'Vercel'],
    liveUrl: 'https://ayu-mitra-ai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/AyuMitraAI',
    thumbnail: '13'
  },
  {
    id: '14',
    title: 'TICE - Threat Intelligence Correlation Engine',
    tagline: 'Advanced IP Analysis & Threat Attribution Platform',
    description: 'A full-stack cybersecurity threat intelligence platform that correlates data from multiple OSINT sources (AbuseIPDB, Shodan, IPInfo) to provide comprehensive IP address analysis, risk scoring, and AI-powered threat attribution reports. Features 3D geolocation visualization with Three.js, professional SOC dashboard with glassmorphism design, and export capabilities for threat reports.',
    techStack: ['Python', 'FastAPI', 'React 19', 'Three.js', 'MongoDB', 'Tailwind CSS', 'Shadcn UI'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Novatron_58',
    thumbnail: '14'
  },
  {
    id: '15',
    title: 'RakshakAI',
    tagline: 'Security and Protection AI System',
    description: 'An advanced security and protection platform designed with AI capabilities. RakshakAI focuses on intelligent threat detection and prevention, featuring contextual understanding and adaptive security measures to safeguard users and systems.',
    techStack: ['AI', 'Security', 'Machine Learning', 'Protection Systems'],
    liveUrl: 'https://rakshak-ai-two.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/RakshakAI',
    thumbnail: '15'
  }
];

export const ProjectsApp = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (selectedProject) {
    return (
      <div className="h-full">
        <button 
          onClick={() => setSelectedProject(null)}
          className="flex items-center gap-2 mb-6 text-primary hover:text-primary-glow transition-colors"
        >
          <ArrowLeft size={16} />
          Back to Projects
        </button>
        
        <div className="space-y-6">
          <div>
            <div className="text-4xl mb-2">{selectedProject.thumbnail}</div>
            <h2 className="text-2xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="text-lg opacity-80">{selectedProject.tagline}</p>
          </div>
          
          <p className="text-base leading-relaxed">{selectedProject.description}</p>
          
          <div>
            <h3 className="text-lg font-semibold mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {selectedProject.techStack.map(tech => (
                <span 
                  key={tech}
                  className="px-3 py-1 bg-glass-hover rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="flex gap-4 pt-4">
            {selectedProject.liveUrl && (
              <a 
                href={selectedProject.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-primary-glow transition-colors"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
            {selectedProject.githubUrl && (
              <a 
                href={selectedProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 glass-hover rounded-lg transition-colors"
              >
                <Github size={16} />
                View Code
              </a>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold mb-6">My Projects</h2>
      
      {/* Vertical list with scroll for projects (keeps original grid/cards) */}
      <div className="overflow-y-auto custom-scrollbar pr-4 max-h-[70vh]" tabIndex={0} aria-label="Projects list">
        <div className="grid gap-6">
          {mockProjects.map(project => (
            <div 
              key={project.id}
              className="glass-hover p-6 rounded-xl cursor-pointer transition-all duration-300"
              onClick={() => setSelectedProject(project)}
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl">{project.thumbnail}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="opacity-80 mb-3">{project.tagline}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.slice(0, 3).map(tech => (
                      <span 
                        key={tech}
                        className="px-2 py-1 bg-glass-bg rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-1 bg-glass-bg rounded text-xs">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};