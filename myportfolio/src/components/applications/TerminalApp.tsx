import { useState, useRef, useEffect } from 'react';

interface TerminalLine {
  id: number;
  type: 'input' | 'output';
  content: string | React.ReactNode;
}

const INITIAL_MESSAGE = `Last login: ${new Date().toLocaleString()}
Welcome to Sriram's Portfolio Terminal!
Type 'help' to see available commands.
`;

const HELP_TEXT = `
Available commands:
  help          - Show this help message
  about         - About me
  skills        - My technical skills
  projects      - My projects
  contact       - Contact information
  education     - My education
  clear         - Clear the terminal
  social        - Social media links
  whoami        - Who am I?
  pwd           - Print working directory
  ls            - List files
  cat <file>    - Read a file
`;

const ABOUT_TEXT = `
╔══════════════════════════════════════╗
║         SRIRAM KULKARNI              ║
╠══════════════════════════════════════╣
║  Full Stack Developer & AI Enthusiast║
║  Passionate about building           ║
║  innovative solutions                ║
╚══════════════════════════════════════╝
`;

const SKILLS_TEXT = `
📚 Languages:    JavaScript, TypeScript, Python, Java, C++
🔧 Frontend:     React, Next.js, Tailwind CSS, Framer Motion
⚙️ Backend:      Node.js, Express, FastAPI, Django
🗄️ Database:     MongoDB, PostgreSQL, MySQL, Redis
☁️ Cloud:        AWS, GCP, Vercel, Docker
🤖 AI/ML:        TensorFlow, PyTorch, OpenAI API
`;

const CONTACT_TEXT = `
📧 Email:    shrikulk20@gmail.com
🔗 GitHub:   github.com/BEASTSHRIRAM
💼 LinkedIn: linkedin.com/in/sriramkulkarni7878
💻 LeetCode: leetcode.com/u/shriramthebeast
`;

const FILES: { [key: string]: string } = {
  'about.txt': ABOUT_TEXT,
  'skills.txt': SKILLS_TEXT,
  'contact.txt': CONTACT_TEXT,
  'readme.md': '# Welcome to my portfolio!\nRun `help` for available commands.',
};

export default function TerminalApp() {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: 0, type: 'output', content: INITIAL_MESSAGE }
  ]);
  const [currentInput, setCurrentInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const addLine = (type: 'input' | 'output', content: string | React.ReactNode) => {
    setLines(prev => [...prev, { id: Date.now(), type, content }]);
  };

  const processCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    const parts = trimmedCmd.split(' ');
    const command = parts[0];
    const args = parts.slice(1);

    addLine('input', `sriram@portfolio ~ % ${cmd}`);

    switch (command) {
      case '':
        break;
      case 'help':
        addLine('output', HELP_TEXT);
        break;
      case 'about':
        addLine('output', ABOUT_TEXT);
        break;
      case 'skills':
        addLine('output', SKILLS_TEXT);
        break;
      case 'contact':
        addLine('output', CONTACT_TEXT);
        break;
      case 'projects':
        addLine('output', `
🚀 Projects:
  1. macOS Portfolio - This website!
  2. AI Chat Application
  3. E-commerce Platform
  4. Real-time Collaboration Tool
  
Run 'open projects' in Finder to see more!
`);
        break;
      case 'education':
        addLine('output', `
🎓 Education:
  Bachelor of Technology in Computer Science
  Expected Graduation: 2025
`);
        break;
      case 'social':
        addLine('output', `
🌐 Social Links:
  GitHub:     https://github.com/BEASTSHRIRAM
  LinkedIn:   https://linkedin.com/in/sriramkulkarni7878
  LeetCode:   https://leetcode.com/u/shriramthebeast
  Codeforces: https://codeforces.com/profile/Beast7878
`);
        break;
      case 'clear':
        setLines([]);
        break;
      case 'whoami':
        addLine('output', 'sriram');
        break;
      case 'pwd':
        addLine('output', '/Users/sriram/portfolio');
        break;
      case 'ls':
        addLine('output', Object.keys(FILES).join('  '));
        break;
      case 'cat':
        if (args[0] && FILES[args[0]]) {
          addLine('output', FILES[args[0]]);
        } else {
          addLine('output', `cat: ${args[0] || ''}: No such file or directory`);
        }
        break;
      case 'date':
        addLine('output', new Date().toString());
        break;
      case 'echo':
        addLine('output', args.join(' '));
        break;
      default:
        addLine('output', `zsh: command not found: ${command}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(currentInput);
      setCommandHistory(prev => [...prev, currentInput]);
      setHistoryIndex(-1);
      setCurrentInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCurrentInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    }
  };

  return (
    <div
      className="h-full bg-black/90 text-green-400 font-mono text-sm p-4 overflow-y-auto"
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {lines.map(line => (
        <div key={line.id} className={`whitespace-pre-wrap ${line.type === 'input' ? 'text-white' : 'text-green-400'}`}>
          {line.content}
        </div>
      ))}
      
      <div className="flex items-center text-white">
        <span className="text-green-400">sriram@portfolio</span>
        <span className="text-blue-400 mx-1">~</span>
        <span className="text-white mr-2">%</span>
        <input
          ref={inputRef}
          type="text"
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-white caret-white"
          autoFocus
          spellCheck={false}
        />
      </div>
    </div>
  );
}
