import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ChatBot from './pages/ChatBot';
import BailChecker from './pages/BailChecker';
import LawyerDirectory from './pages/LawyerDirectory';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-100">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-slate-950">
          <Routes>
            <Route path="/" element={<Navigate to="/chat" replace />} />
            <Route path="/chat" element={<ChatBot />} />
            <Route path="/bail-check" element={<BailChecker />} />
            <Route path="/lawyers" element={<LawyerDirectory />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
