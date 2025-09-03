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
    title: 'BeastFitness AI',
    tagline: 'AI-powered fitness coaching application',
    description: 'A comprehensive fitness coaching application featuring an AI chatbot and user authentication. Built with Spring Boot REST API and React frontend, integrated with Botpress for intelligent conversation and MongoDB Atlas for data management.',
    techStack: ['Spring Boot', 'React', 'MongoDB Atlas', 'Botpress', 'REST API'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/FitnessAppAI',
    thumbnail: '2'
  },
  {
    id: '3',
    title: 'WorkoutApp',
    tagline: 'Personalized workout management system',
    description: 'An AI-powered workout manager using RAG-based model for contextual recommendations. Built with Streamlit for the interface and integrated with Astra DB for data persistence. Features LangFlow for orchestrating the AI workflow.',
    techStack: ['Python', 'Streamlit', 'LangFlow', 'Astra DB', 'RAG Model'],
    githubUrl: 'https://github.com/BEASTSHRIRAM/WorkoutApp',
    thumbnail: '3'
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
  );
};