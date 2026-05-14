import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();

  const links = [
    { path: '/chat', label: 'LegalBot', icon: '💬' },
    { path: '/bail-check', label: 'Bail Check', icon: '🧮' },
    { path: '/lawyers', label: 'Find Lawyers', icon: '👥' }
  ];

  return (
    <aside className="w-[260px] bg-navy flex flex-col justify-between h-full text-white hidden md:flex">
      <div>
        <div className="p-6 flex items-center gap-3">
          <span className="text-2xl">⚖️</span>
          <h1 className="text-xl font-bold">NyayBot</h1>
        </div>
        <nav className="mt-4 flex flex-col gap-1">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`h-12 flex items-center px-6 gap-3 text-[15px] transition-colors ${
                  isActive 
                    ? 'border-l-4 border-saffron bg-saffron-light text-navy font-medium' 
                    : 'text-white hover:bg-navy-light border-l-4 border-transparent'
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
      
      <div className="p-6">
        <select className="w-full bg-navy-light text-white border border-gray-600 rounded-md p-2 mb-4 text-sm focus:outline-none" defaultValue="english">
          <option value="english">English</option>
          <option value="hindi">हिन्दी</option>
          <option value="bengali">বাংলা</option>
          <option value="tamil">தமிழ்</option>
          <option value="telugu">తెలుగు</option>
          <option value="marathi">मराठी</option>
        </select>
        
        <div className="bg-saffron text-navy font-bold text-xs rounded-full py-2 px-3 text-center">
          NALSA Helpline: 15100
        </div>
      </div>
    </aside>
  );
}
