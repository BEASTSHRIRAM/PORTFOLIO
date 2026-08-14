import { MapPin, Calendar, BriefcaseBusiness, BrainCircuit, Bot, Workflow } from 'lucide-react';
import zyskLogo from '@/assets/zysk-logo.png';

const experienceData = [
  {
    role: 'AI Engineer Intern',
    company: 'Zysk Technologies',
    location: 'Bengaluru, India',
    period: 'August 2026 - Present',
    summary:
      'Currently building AI-powered products and intelligent workflows, with a focus on practical GenAI experiences, automation, and production-ready integrations.',
    highlights: [
      'Developing AI-driven features and prototypes for real-world business use cases.',
      'Working with LLM workflows, prompt design, and agentic application patterns.',
      'Bridging AI systems with backend services, APIs, and modern product experiences.',
    ],
  },
];

export const ExperienceApp = () => {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Experience</h2>
        <p className="opacity-80">Professional journey and current focus</p>
      </div>

      <div className="space-y-6">
        {experienceData.map((item) => (
          <div key={item.role} className="glass-hover p-6 rounded-xl">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-lg bg-primary/10 p-2 shadow-sm ring-1 ring-primary/15">
                  <img src={zyskLogo} alt="Zysk Technologies logo" className="w-10 h-10 object-contain rounded-md" draggable={false} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{item.role}</h3>
                  <p className="text-primary font-medium">{item.company}</p>
                </div>
              </div>

              <div className="text-sm opacity-75 space-y-1">
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>{item.period}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>

            <p className="text-base leading-relaxed opacity-90 mb-5">{item.summary}</p>

            <div className="grid md:grid-cols-3 gap-3">
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-primary font-medium mb-1">
                  <BrainCircuit size={16} />
                  AI
                </div>
                <p className="text-sm opacity-80">LLM workflows and product-driven AI experiences.</p>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-primary font-medium mb-1">
                  <Bot size={16} />
                  Automation
                </div>
                <p className="text-sm opacity-80">Building intelligent systems that reduce manual effort.</p>
              </div>

              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <div className="flex items-center gap-2 text-primary font-medium mb-1">
                  <Workflow size={16} />
                  Integration
                </div>
                <p className="text-sm opacity-80">Connecting AI capabilities with APIs and modern application layers.</p>
              </div>
            </div>

            <div className="mt-5">
              <h4 className="font-medium mb-3">Key Highlights</h4>
              <ul className="space-y-2 ml-5">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="text-sm opacity-80 before:content-['•'] before:text-primary before:mr-2">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceApp;
