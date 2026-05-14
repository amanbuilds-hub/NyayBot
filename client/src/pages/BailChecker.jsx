import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function BailChecker() {
  const [formData, setFormData] = useState({
    name: '',
    arrestDate: '',
    section: '',
    isFirstOffence: true,
    isCapitalOffence: false,
    state: ''
  });
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const statesList = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Lakshadweep", "Delhi", "Puducherry", "Ladakh", "Jammu and Kashmir"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/api/bail-check', formData);
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching bail eligibility');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-navy">Bail Eligibility Check</h2>
            <p className="text-text-secondary text-sm">Section 479 BNSS 2023</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Prisoner Name (optional)</label>
              <input type="text" className="w-full border border-border rounded-md p-2 focus:ring-1 focus:ring-navy focus:outline-none" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Arrest Date</label>
              <input type="date" required max={new Date().toISOString().split('T')[0]} className="w-full border border-border rounded-md p-2 focus:ring-1 focus:ring-navy focus:outline-none" value={formData.arrestDate} onChange={e => setFormData({...formData, arrestDate: e.target.value})} />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">Section (IPC/BNS)</label>
              <input type="text" required placeholder="e.g. IPC 420" className="w-full border border-border rounded-md p-2 focus:ring-1 focus:ring-navy focus:outline-none" value={formData.section} onChange={e => setFormData({...formData, section: e.target.value})} />
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <label className="text-sm font-medium text-text-primary">Is this a first offence?</label>
              <div className="relative inline-block w-12 mr-2 align-middle select-none">
                <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: formData.isFirstOffence ? 0 : '1.5rem', borderColor: formData.isFirstOffence ? '#1a2744' : '#E2E0D8' }} checked={formData.isFirstOffence} onChange={e => setFormData({...formData, isFirstOffence: e.target.checked})} />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-all duration-300" style={{ backgroundColor: formData.isFirstOffence ? '#1a2744' : '#E2E0D8' }} onClick={() => setFormData({...formData, isFirstOffence: !formData.isFirstOffence})}></label>
              </div>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-border">
              <label className="text-sm font-medium text-text-primary pr-4">Is this a capital offence? (Life/Death sentence)</label>
              <div className="relative inline-block w-12 mr-2 align-middle select-none shrink-0">
                <input type="checkbox" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300" style={{ right: formData.isCapitalOffence ? 0 : '1.5rem', borderColor: formData.isCapitalOffence ? '#C62828' : '#E2E0D8' }} checked={formData.isCapitalOffence} onChange={e => setFormData({...formData, isCapitalOffence: e.target.checked})} />
                <label className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-all duration-300" style={{ backgroundColor: formData.isCapitalOffence ? '#C62828' : '#E2E0D8' }} onClick={() => setFormData({...formData, isCapitalOffence: !formData.isCapitalOffence})}></label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1">State</label>
              <select required className="w-full border border-border rounded-md p-2 focus:ring-1 focus:ring-navy focus:outline-none bg-white" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})}>
                <option value="">Select State...</option>
                {statesList.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <button type="submit" disabled={isLoading} className="w-full bg-saffron text-navy font-bold h-12 rounded-md hover:bg-orange-500 transition-colors flex items-center justify-center mt-6 shadow-sm">
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-navy border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Check Eligibility →"
              )}
            </button>
          </form>
        </div>

        <div>
          {!result ? (
            <div className="bg-white border border-border rounded-xl p-10 flex flex-col items-center justify-center h-full min-h-[400px] text-center shadow-sm">
              <span className="text-6xl text-gray-300 mb-4">⚖️</span>
              <p className="text-text-secondary font-medium mb-6">Fill the details above to check eligibility</p>
              <div className="flex gap-2">
                <span className="px-3 py-1 bg-teal-50 text-teal-700 text-xs font-semibold rounded-full">Free Service</span>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full">BNSS 2023</span>
              </div>
            </div>
          ) : (
            <div className="bg-white border border-border rounded-xl overflow-hidden shadow-md flex flex-col h-full">
              {result.eligible === true ? (
                <div className="bg-green-success text-white p-4 flex items-center gap-3">
                  <span className="text-2xl">✓</span>
                  <h3 className="font-bold text-lg">You may be eligible for bail</h3>
                </div>
              ) : result.eligible === false ? (
                <div className="bg-red-danger text-white p-4 flex items-center gap-3">
                  <span className="text-2xl">✕</span>
                  <h3 className="font-bold text-lg">Not Eligible Yet</h3>
                </div>
              ) : (
                <div className="bg-gray-700 text-white p-4 flex items-center gap-3">
                  <span className="text-2xl">ℹ️</span>
                  <h3 className="font-bold text-lg">Information Not Available</h3>
                </div>
              )}

              <div className="p-6 flex-grow">
                {result.eligible === false && result.monthsRemaining > 0 && (
                  <div className="mb-4 text-red-danger font-medium text-center border border-red-200 bg-red-50 p-2 rounded">
                    Eligible after {result.monthsRemaining} months
                  </div>
                )}
                
                {result.reason && !result.eligible && (
                  <div className="mb-4 text-text-primary text-sm bg-gray-50 p-3 rounded border border-gray-200">
                    <strong>Reason:</strong> {result.reason}
                  </div>
                )}

                <table className="w-full text-sm mb-6 border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-text-secondary">Section</td>
                      <td className="py-3 font-medium text-right">{result.section}</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="py-3 px-2 text-text-secondary">Maximum Sentence</td>
                      <td className="py-3 px-2 font-medium text-right">{result.maxSentenceYears !== undefined && result.maxSentenceYears !== Infinity ? `${result.maxSentenceYears} years` : 'N/A'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-text-secondary">First Offence</td>
                      <td className="py-3 font-medium text-right">{formData.isFirstOffence ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <td className="py-3 px-2 text-text-secondary">Required Time</td>
                      <td className="py-3 px-2 font-medium text-right">{result.monthsRequired !== undefined ? `${result.monthsRequired} months` : 'N/A'}</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-3 text-text-secondary">Time Served</td>
                      <td className="py-3 font-medium text-right">{result.monthsServed !== undefined ? `${result.monthsServed} months` : 'N/A'}</td>
                    </tr>
                    <tr>
                      <td className="py-3 text-text-secondary font-bold">Status</td>
                      <td className={`py-3 font-bold text-right ${result.eligible ? 'text-green-success' : 'text-red-danger'}`}>
                        {result.eligible === true ? '✓ Eligible' : result.eligible === false ? '✕ Not Eligible' : 'Unknown'}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="bg-[#FFFDE7] border border-[#FFF59D] p-3 rounded-md text-xs text-gray-700 mb-6">
                  {result.disclaimer}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <a href="tel:15100" className="bg-saffron text-navy font-bold p-3 rounded text-center text-sm shadow-sm hover:bg-orange-500 transition-colors flex flex-col items-center justify-center">
                    <span className="text-xl mb-1">📞</span>
                    NALSA: 15100
                    <span className="text-[10px] font-normal opacity-80 mt-1">Call now</span>
                  </a>
                  <Link to="/lawyers" className="bg-gray-100 text-text-primary border border-gray-200 font-medium p-3 rounded text-center text-sm hover:bg-gray-200 transition-colors flex flex-col items-center justify-center">
                    <span className="text-xl mb-1">👤</span>
                    Find a Lawyer
                  </Link>
                  <button className="bg-gray-100 text-text-primary border border-gray-200 font-medium p-3 rounded text-center text-sm hover:bg-gray-200 transition-colors flex flex-col items-center justify-center">
                    <span className="text-xl mb-1">📄</span>
                    UTRC Request
                    <span className="text-[10px] font-normal opacity-80 mt-1">Hearing in 3 months</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
