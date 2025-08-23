import { Calendar, MapPin, Award } from 'lucide-react';

interface EducationItem {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
  type: 'degree' | 'certification' | 'course';
}

const educationData: EducationItem[] = [
  {
    id: '1',
    title: 'Bachelor of Engineering in Information Science',
    institution: 'JSS Academy of Technical Education',
    location: 'Bengaluru',
    period: '2023 - Present',
    description: 'Currently in 5th semester, maintaining a CGPA of 8.2. Studying computer science fundamentals, data structures, algorithms, and modern software development.',
    achievements: [
      'CGPA: 8.2/10.0',
      'Active participant in technical workshops and projects',
      'Focus on AI and Full Stack Development'
    ],
    type: 'degree'
  },
  {
    id: '2',
    title: 'Pre-University Course (Science)',
    institution: 'Shree Guru Independent PU College',
    location: 'Karnataka',
    period: '2021 - 2023',
    description: 'Completed PUC (12th grade) with focus on Physics, Chemistry, Mathematics, and Computer Science.',
    achievements: [
      'Scored 92% in final examinations',
      'Participated in science exhibitions and competitions'
    ],
    type: 'degree'
  },
  {
    id: '3',
    title: 'Secondary School Education',
    institution: 'Aryan English Medium School',
    location: 'Karnataka',
    period: 'Completed: 2021',
    description: 'Completed secondary education with strong foundation in mathematics and sciences.',
    achievements: [
      'Scored 82% in SSLC (10th) examinations',
      'Participated in various academic competitions'
    ],
    type: 'degree'
  }
];

const getTypeIcon = (type: string) => {
  switch (type) {
    case 'degree':
      return '🎓';
    case 'certification':
      return '🏆';
    case 'course':
      return '📚';
    default:
      return '📖';
  }
};

export const EducationApp = () => {
  return (
    <div className="h-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">Education & Certifications</h2>
        <p className="opacity-80">My academic background and professional development</p>
      </div>
      
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary-glow to-transparent"></div>
        
        <div className="space-y-8">
          {educationData.map((item, index) => (
            <div 
              key={item.id}
              className="relative flex gap-6 glass-hover p-6 rounded-xl ml-2 transition-all duration-300 hover:ml-0"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-8 top-8 w-4 h-4 bg-primary rounded-full border-4 border-background flex items-center justify-center">
                <div className="w-2 h-2 bg-background rounded-full"></div>
              </div>
              
              {/* Content */}
              <div className="flex-1 ml-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getTypeIcon(item.type)}</span>
                    <div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                      <p className="text-primary font-medium">{item.institution}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm opacity-70">
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar size={14} />
                      {item.period}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin size={14} />
                      {item.location}
                    </div>
                  </div>
                </div>
                
                <p className="text-base mb-4 leading-relaxed opacity-90">
                  {item.description}
                </p>
                
                {item.achievements && (
                  <div className="space-y-2">
                    <h4 className="font-medium flex items-center gap-2">
                      <Award size={16} className="text-primary" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-1 ml-6">
                      {item.achievements.map((achievement, idx) => (
                        <li 
                          key={idx}
                          className="text-sm opacity-80 before:content-['•'] before:text-primary before:mr-2"
                        >
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};