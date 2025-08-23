import { useState, useEffect } from 'react';

interface Skill {
  name: string;
  level: number;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', level: 90, category: 'Languages' },
  { name: 'Python', level: 85, category: 'Languages' },
  { name: 'JavaScript', level: 85, category: 'Languages' },
  { name: 'TypeScript', level: 80, category: 'Languages' },
  { name: 'Kotlin', level: 75, category: 'Languages' },
  
  // Frameworks & Libraries
  { name: 'Spring Boot', level: 90, category: 'Frameworks & Libraries' },
  { name: 'React', level: 85, category: 'Frameworks & Libraries' },
  { name: 'Streamlit', level: 80, category: 'Frameworks & Libraries' },
  { name: 'LangChain', level: 80, category: 'Frameworks & Libraries' },
  { name: 'LangFlow', level: 75, category: 'Frameworks & Libraries' },
  
  // Developer Tools
  { name: 'Git', level: 90, category: 'Developer Tools' },
  { name: 'Docker', level: 85, category: 'Developer Tools' },
  { name: 'SonarQube', level: 80, category: 'Developer Tools' },
  { name: 'Apache Kafka', level: 75, category: 'Developer Tools' },
  
  // Databases
  { name: 'MongoDB', level: 85, category: 'Databases' },
  { name: 'PostgreSQL', level: 80, category: 'Databases' },
];

export const SkillsApp = () => {
  const [animatedSkills, setAnimatedSkills] = useState<Record<string, number>>({});
  
  useEffect(() => {
    // Animate skill bars on mount
    const timer = setTimeout(() => {
      const animated = skills.reduce((acc, skill) => {
        acc[skill.name] = skill.level;
        return acc;
      }, {} as Record<string, number>);
      setAnimatedSkills(animated);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Technical Skills</h2>
        <p className="opacity-80">My expertise across different technologies and tools</p>
      </div>
      
      <div className="space-y-8">
        {categories.map(category => (
          <div key={category} className="space-y-4">
            <h3 className="text-lg font-semibold text-primary">{category}</h3>
            
            <div className="space-y-3">
              {skills
                .filter(skill => skill.category === category)
                .map(skill => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm opacity-70">{skill.level}%</span>
                    </div>
                    
                    <div className="w-full bg-glass-bg rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-1000 ease-out"
                        style={{
                          width: `${animatedSkills[skill.name] || 0}%`,
                          background: 'var(--gradient-primary)'
                        }}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 pt-6 border-t border-glass-border">
        <h3 className="text-lg font-semibold mb-4">Additional Expertise</h3>
        <div className="flex flex-wrap gap-2">
          {[
            'Data Structures & Algorithms', 'DBMS', 'Operating Systems', 
            'Generative AI', 'LLMs', 'RESTful APIs', 'JWT Authentication',
            'CI/CD', 'DevOps', 'Spring Security'
          ].map(skill => (
            <span 
              key={skill}
              className="px-3 py-1 bg-glass-hover rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};