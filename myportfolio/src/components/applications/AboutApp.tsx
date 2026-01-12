import { Download, MapPin, Calendar, Coffee } from 'lucide-react';

export const AboutApp = () => {
  const handleDownloadResume = () => {
    // In a real app, this would download the actual resume
    const link = document.createElement('a');
    link.href = '/resumeSkk.pdf';
    link.download = 'SKResume.pdf';
    link.click();
  };

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Profile Section */}
        <div className="lg:w-1/3">
          <div className="glass-hover p-6 rounded-xl text-center">
            {/* Profile Photo Placeholder */}
            <div className="w-32 h-32 bg-gradient-to-br from-primary to-primary-glow rounded-full mx-auto mb-4 flex items-center justify-center text-4xl font-bold text-black">
              SK
            </div>
            
            <h2 className="text-2xl font-bold mb-2">Shriram Kulkarni</h2>
            <p className="text-primary mb-4">Full Stack Developer & AI Enthusiast</p>
            
            <div className="space-y-2 text-sm opacity-80 mb-6">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={16} />
                Bengaluru, India
              </div>
              <div className="flex items-center justify-center gap-2">
                <Calendar size={16} />
                Student at JSS Academy of Technical Education
              </div>
            </div>
            
            <button 
              onClick={handleDownloadResume}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-black rounded-lg hover:bg-primary-glow transition-colors font-medium"
            >
              <Download size={16} />
              Download Resume
            </button>
          </div>
        </div>
        
        {/* About Content */}
        <div className="lg:w-2/3 space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">About Me</h3>
            <div className="space-y-4 text-base leading-relaxed opacity-90">
              <p>
                I'm a passionate developer currently pursuing my B.E. in Information Science at JSS Academy 
                of Technical Education, Bengaluru with a CGPA of 8.2. I'm deeply interested in building 
                scalable AI-driven solutions that solve real-world problems.
              </p>
              <p>
                My technical journey is marked by a strong foundation in both traditional software 
                development and cutting-edge AI technologies. I've developed several notable projects 
                including Briefify AI and BeastFitness AI, which showcase my ability to integrate 
                modern technologies like Spring Boot, React, and various AI tools.
              </p>
              <p>
                When I'm not coding, you can find me playing football, working on my fitness, or 
                exploring new places. I'm fluent in English, Kannada (native), and Hindi, which 
                helps me collaborate effectively in diverse team settings.
              </p>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">What I Do</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="glass-hover p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Full Stack Development</h4>
                <p className="text-sm opacity-80">
                  Building applications with Spring Boot, React, and modern web technologies. Proficient in Java, Python, JavaScript, and TypeScript.
                </p>
              </div>
              <div className="glass-hover p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">AI & Machine Learning</h4>
                <p className="text-sm opacity-80">
                  Developing AI-driven solutions using LangChain, LangFlow, and integrating with various LLM APIs for intelligent applications.
                </p>
              </div>
              <div className="glass-hover p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">Database & Backend</h4>
                <p className="text-sm opacity-80">
                  Working with MongoDB, PostgreSQL, and implementing secure authentication using JWT and Spring Security.
                </p>
              </div>
              <div className="glass-hover p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-primary">DevOps & Tools</h4>
                <p className="text-sm opacity-80">
                  Experience with Git, Docker, Apache Kafka, and SonarQube. Deploying applications on platforms like Vercel and Railway.
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Fun Facts</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Coffee className="text-primary" size={20} />
                <span>I've consumed over 200 cups of coffee while coding</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl">🚀</span>
                <span>I've launched  projects from concept to production</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl">🌍</span>
                <span>I've collaborated with teams</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-primary text-xl"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};