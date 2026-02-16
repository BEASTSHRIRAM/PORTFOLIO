interface Skill {
  name: string;
  category: string;
}

const skills: Skill[] = [
  // Languages
  { name: 'Java', category: 'Languages' },
  { name: 'Python', category: 'Languages' },
  { name: 'HTML', category: 'Languages' },
  { name: 'CSS', category: 'Languages' },
  { name: 'JavaScript', category: 'Languages' },
  { name: 'TypeScript', category: 'Languages' },
  
  // Frameworks & Libraries
  { name: 'Spring Boot', category: 'Frameworks & Libraries' },
  { name: 'React', category: 'Frameworks & Libraries' },
  { name: 'Streamlit', category: 'Frameworks & Libraries' },
  { name: 'LangChain', category: 'Frameworks & Libraries' },
  { name: 'LangFlow', category: 'Frameworks & Libraries' },
  
  // Developer Tools
  { name: 'Git', category: 'Developer Tools' },
  { name: 'Docker', category: 'Developer Tools' },
  { name: 'SonarQube', category: 'Developer Tools' },
  { name: 'Apache Kafka', category: 'Developer Tools' },
  
  // Databases
  { name: 'MySQL', category: 'Databases' },
  { name: 'MongoDB', category: 'Databases' },
  { name: 'PostgreSQL', category: 'Databases' },
];

export const SkillsApp = () => {
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
            
            <div className="flex flex-wrap gap-2">
              {skills
                .filter(skill => skill.category === category)
                .map(skill => (
                  <span
                    key={skill.name}
                    className="px-3 py-1 bg-glass-hover rounded-full text-sm font-medium"
                  >
                    {skill.name}
                  </span>
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