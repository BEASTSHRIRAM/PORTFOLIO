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
    title: 'Briefify AI',
    tagline: 'AI-powered document summarization platform',
    description: 'A full-stack web application for document summarization using Generative AI. Features include JWT-based authentication via Spring Security, Tesseract OCR for text extraction, and integration with Groq API for high-speed summarization.',
    techStack: ['Spring Boot', 'React', 'MongoDB', 'Tesseract OCR', 'Groq API', 'JWT', 'Vercel', 'Railway'],
    liveUrl: 'https://briefify-ai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/BriefifyAI',
    thumbnail: '1'
  },
  {
    id: '2',
    title: 'BeastXFitness AI',
    tagline: 'AI-Powered Fitness & Wellness Platform',
    description: 'A comprehensive AI-powered fitness and wellness application designed to help users achieve their health goals. Features personal records tracking, workout management, progress entries, and an AI chatbot powered by Botpress. Built with Spring Boot REST API and React frontend with MongoDB Atlas for data persistence.',
    techStack: ['Spring Boot', 'React', 'TypeScript', 'MongoDB Atlas', 'Botpress', 'JWT', 'Spring Security'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/FitnessAppAI',
    thumbnail: '2'
  },
  {
    id: '3',
    title: 'WorkoutApp',
    tagline: 'AI-powered personal fitness tool with RAG',
    description: 'A fitness application that combines Vector Databases (Astra DB) with AI capabilities using Langflow and RAG (Retrieval Augmented Generation) for contextual workout recommendations. Features real-time macros calculation, AI-powered workout recommendations, and contextual note-taking where gym limitations are considered when generating personalized workouts.',
    techStack: ['Python', 'Streamlit', 'Langflow', 'Astra DB', 'RAG', 'Vector Database'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/WorkoutApp',
    thumbnail: '3'
  },
  {
    id: '4',
    title: 'AyuMitraAI',
    tagline: 'Your nearest health center finding partner AI agent',
    description: 'An intelligent AI agent powered by Motia framework that helps users find their nearest health centers. Built with a polyglot architecture combining TypeScript, Python, and JavaScript, featuring background job processing, event-driven workflows, and AI-powered agent capabilities for healthcare discovery and recommendations.',
    techStack: ['TypeScript', 'Python', 'JavaScript', 'Motia', 'AI Agent', 'Vercel'],
    liveUrl: 'https://ayu-mitra-ai.vercel.app/',
    githubUrl: 'https://github.com/BEASTSHRIRAM/AyuMitraAI',
    thumbnail: '4'
  },
  {
    id: '5',
    title: 'TICE - Threat Intelligence Correlation Engine',
    tagline: 'Advanced IP Analysis & Threat Attribution Platform',
    description: 'A full-stack cybersecurity threat intelligence platform that correlates data from multiple OSINT sources (AbuseIPDB, Shodan, IPInfo) to provide comprehensive IP address analysis, risk scoring, and AI-powered threat attribution reports. Features 3D geolocation visualization with Three.js, professional SOC dashboard with glassmorphism design, and export capabilities for threat reports.',
    techStack: ['Python', 'FastAPI', 'React 19', 'Three.js', 'MongoDB', 'Tailwind CSS', 'Shadcn UI'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/Novatron_58',
    thumbnail: '5'
  },
  {
    id: '6',
    title: 'RakshakAI',
    tagline: 'Security and Protection AI System',
    description: 'An advanced security and protection platform designed with AI capabilities. RakshakAI focuses on intelligent threat detection and prevention, featuring contextual understanding and adaptive security measures to safeguard users and systems.',
    techStack: ['AI', 'Security', 'Machine Learning', 'Protection Systems'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/RakshakAI',
    thumbnail: '6'
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