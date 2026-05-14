import { useState, useEffect } from 'react';
import axios from 'axios';

export default function LawyerDirectory() {
  const [lawyers, setLawyers] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    language: '',
    type: 'All'
  });

  const statesList = [
    "Madhya Pradesh", "Tamil Nadu", "Uttar Pradesh", "Bihar", "Kerala", "Maharashtra", "Delhi"
  ];
  const languagesList = ["Hindi", "English", "Tamil", "Urdu", "Bengali", "Malayalam"];
  const typeFilters = ["All", "NALSA Panel", "Pro Bono", "Tele-Law"];

  const fallbackLawyers = [
    { name: "Adv. Ramesh Kumar Sharma", type: "nalsa", languages: ["Hindi", "English"], specialization: ["Bail Applications", "Criminal Defense"], state: "Madhya Pradesh", district: "Bhopal", available: true, verified: true, avatarBg: "#1a2744" },
    { name: "Adv. Priya Menon", type: "probono", languages: ["Tamil", "English"], specialization: ["Undertrial Rights", "Bail"], state: "Tamil Nadu", district: "Chennai", available: true, verified: true, avatarBg: "#2E7D32" },
    { name: "Adv. Mohammed Iqbal", type: "telelaw", languages: ["Hindi", "Urdu"], specialization: ["Criminal Law", "NDPS"], state: "Uttar Pradesh", district: "Lucknow", available: false, verified: true, avatarBg: "#5c6782" },
    { name: "Adv. Sunita Devi", type: "nalsa", languages: ["Hindi", "Bengali"], specialization: ["Bail", "Women's Rights"], state: "Bihar", district: "Patna", available: true, verified: true, avatarBg: "#7B1FA2" },
    { name: "Adv. Arjun Nair", type: "probono", languages: ["Malayalam", "English"], specialization: ["Constitutional Rights"], state: "Kerala", district: "Kochi", available: true, verified: true, avatarBg: "#E65100" },
    { name: "Adv. Fatima Sheikh", type: "telelaw", languages: ["Hindi", "English", "Urdu"], specialization: ["Criminal Defense"], state: "Maharashtra", district: "Mumbai", available: false, verified: true, avatarBg: "#1565C0" }
  ];

  const fetchLawyers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.state) params.append('state', filters.state);
      if (filters.language) params.append('language', filters.language);
      if (filters.type && filters.type !== 'All') params.append('type', filters.type);
      if (filters.search) params.append('search', filters.search);

      const response = await axios.get(`http://localhost:5000/api/lawyers?${params.toString()}`);
      
      const colorPalette = ["#1a2744", "#2E7D32", "#5c6782", "#7B1FA2", "#E65100", "#1565C0"];
      const enrichedLawyers = response.data.lawyers.map((l, i) => ({
        ...l,
        avatarBg: colorPalette[i % colorPalette.length]
      }));
      
      setLawyers(enrichedLawyers);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Error fetching lawyers:', error);
      setLawyers(fallbackLawyers);
      setTotal(fallbackLawyers.length);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [filters]);

  const getBadgeClass = (type) => {
    switch(type) {
      case 'nalsa': return 'bg-blue-100 text-blue-800';
      case 'probono': return 'bg-green-100 text-green-800';
      case 'telelaw': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'nalsa': return 'NALSA Panel';
      case 'probono': return 'Pro Bono';
      case 'telelaw': return 'Tele-Law';
      default: return type;
    }
  };

  const getInitials = (name) => {
    return name.replace('Adv. ', '').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="flex flex-col h-full bg-[var(--background)]">
      <div className="sticky top-0 bg-white border-b border-border z-10 p-4 md:px-6 shadow-sm">
        <div className="max-w-6xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input 
              type="text" 
              placeholder="Search lawyer or specialization..." 
              className="flex-grow border border-border rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-navy"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
            />
            <select 
              className="border border-border rounded-md px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-navy"
              value={filters.state}
              onChange={(e) => setFilters({...filters, state: e.target.value})}
            >
              <option value="">All States</option>
              {statesList.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select 
              className="border border-border rounded-md px-4 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-navy"
              value={filters.language}
              onChange={(e) => setFilters({...filters, language: e.target.value})}
            >
              <option value="">All Languages</option>
              {languagesList.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {typeFilters.map(t => (
                <button
                  key={t}
                  onClick={() => setFilters({...filters, type: t})}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors border ${
                    filters.type === t 
                      ? 'bg-saffron text-navy border-saffron shadow-sm' 
                      : 'bg-white text-text-secondary border-border hover:bg-gray-50'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="text-text-secondary text-sm font-medium">
              {isLoading ? 'Searching...' : `${total} lawyers found`}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4 md:p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {isLoading ? (
               Array.from({ length: 6 }).map((_, i) => (
                 <div key={i} className="bg-white rounded-xl border border-border p-5 h-64 animate-pulse">
                   <div className="flex gap-4 mb-4">
                     <div className="w-11 h-11 rounded-full bg-gray-200"></div>
                     <div className="flex-1">
                       <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                       <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                     </div>
                   </div>
                   <div className="space-y-3 mt-6">
                     <div className="h-3 bg-gray-200 rounded w-full"></div>
                     <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                   </div>
                 </div>
               ))
            ) : lawyers.map((lawyer, i) => (
              <div key={lawyer._id || i} className="bg-white rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div 
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                    style={{ backgroundColor: lawyer.avatarBg || '#1a2744' }}
                  >
                    {getInitials(lawyer.name)}
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-bold text-navy text-base leading-tight mb-1">{lawyer.name}</h3>
                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeClass(lawyer.type)}`}>
                      {getTypeLabel(lawyer.type)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                  <div className="flex flex-wrap gap-1">
                    {lawyer.languages.map((lang, idx) => (
                      <span key={idx} className="bg-gray-100 border border-gray-200 text-gray-600 text-xs px-2 py-1 rounded-md">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13px] text-text-secondary leading-snug">
                    <span className="font-medium">Spec:</span> {lawyer.specialization.join(', ')}
                  </p>
                  <p className="text-[13px] text-text-secondary flex items-center gap-1">
                    <span className="text-gray-400">📍</span> {lawyer.district}, {lawyer.state}
                  </p>
                  <p className="text-[13px] flex items-center gap-1.5 font-medium">
                    <span className={`w-2 h-2 rounded-full ${lawyer.available ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                    <span className={lawyer.available ? 'text-green-700' : 'text-gray-500'}>
                      {lawyer.available ? 'Available' : 'Busy'}
                    </span>
                  </p>
                </div>

                <div className="border-t border-border pt-4 flex gap-3">
                  <button className="flex-1 py-2 rounded-md border border-navy text-navy font-medium text-sm hover:bg-gray-50 transition-colors">
                    Contact
                  </button>
                  <button className="flex-1 py-2 rounded-md bg-saffron text-navy font-medium text-sm shadow-sm hover:bg-orange-500 transition-colors">
                    Request
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {!isLoading && lawyers.length === 0 && (
            <div className="text-center py-12">
              <p className="text-text-secondary">No lawyers found with these filters.</p>
              <button 
                onClick={() => setFilters({search: '', state: '', language: '', type: 'All'})}
                className="mt-4 text-navy font-medium underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-saffron text-navy py-3 px-4 text-center text-sm md:text-base font-bold shadow-md z-20">
        Need direct help? NALSA Helpline: <a href="tel:15100" className="underline text-black">15100</a> (Toll Free) — Available across India
      </div>
    </div>
  );
}
