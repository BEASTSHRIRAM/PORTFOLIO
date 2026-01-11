import React from 'react';
import { Award, Trophy, Code } from 'lucide-react';

interface Hackathon {
  id: number;
  name: string;
  placement: string;
  project: string;
  description: string;
  certificateUrl?: string;
  icon: React.ReactNode;
}

export const InvolvementsApp = () => {
  const hackathons: Hackathon[] = [
    {
      id: 1,
      name: 'IBM Hackathon',
      placement: '🥉 3rd Place',
      project: 'Project Name',
      description: 'An innovative solution showcasing technical excellence and problem-solving skills.',
      certificateUrl: '',
      icon: <Trophy className="w-6 h-6 text-yellow-500" />
    },
    {
      id: 2,
      name: 'lingo.dev Hackathon',
      placement: '4th Place',
      project: 'ReadyIndia',
      description: 'A disaster management platform built with multilingual support to help communities prepare and respond to emergencies.',
      certificateUrl: '',
      icon: <Code className="w-6 h-6 text-blue-500" />
    },
    {
      id: 3,
      name: 'Backend Reloaded Hackathon',
      placement: 'Completion',
      project: 'AyuMitraAI',
      description: 'An AI-powered health center discovery platform using Motia framework for intelligent agent-based recommendations.',
      certificateUrl: '',
      icon: <Award className="w-6 h-6 text-purple-500" />
    },
    {
      id: 4,
      name: 'RILO AUTOMATION Hackathon',
      placement: 'Completion',
      project: 'Product Manager Copilot & Campus Event Copilot',
      description: 'AI-powered automation tools for managing products and organizing campus events efficiently.',
      certificateUrl: '',
      icon: <Code className="w-6 h-6 text-green-500" />
    },
    {
      id: 5,
      name: 'SJBIT Axiom Hackathon',
      placement: 'Completion',
      project: 'TICE - Threat Intelligence Correlation Engine',
      description: 'A comprehensive cybersecurity platform for threat intelligence analysis with 3D visualization and OSINT integration.',
      certificateUrl: '',
      icon: <Award className="w-6 h-6 text-red-500" />
    },
  ];

  return (
    <div className="h-full p-6 overflow-y-auto custom-scrollbar">
      <h2 className="text-2xl font-bold mb-6">Hackathon Involvements</h2>

      <div className="grid gap-4">
        {hackathons.map((hackathon) => (
          <div 
            key={hackathon.id}
            className="glass-hover p-5 rounded-xl transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="flex-shrink-0 pt-1">
                {hackathon.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold">{hackathon.name}</h3>
                  <span className="px-3 py-1 bg-glass-bg rounded-full text-sm font-medium text-primary">
                    {hackathon.placement}
                  </span>
                </div>

                <div className="mb-3">
                  <p className="text-sm opacity-80 mb-1">
                    <span className="font-semibold">Project:</span> {hackathon.project}
                  </p>
                  <p className="text-sm opacity-70">{hackathon.description}</p>
                </div>

                {/* Certificate */}
                <div className="flex gap-3 pt-2">
                  {hackathon.certificateUrl ? (
                    <a 
                      href={hackathon.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-primary text-black rounded-lg text-sm font-medium hover:bg-primary-glow transition-colors"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <span className="px-3 py-1 bg-glass-bg rounded-lg text-sm opacity-60">
                      Certificate coming soon...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-glass-hover rounded-lg text-sm opacity-70">
        <p>These hackathons represent my journey in building innovative solutions and collaborating with talented developers.</p>
      </div>
    </div>
  );
};

export default InvolvementsApp;
