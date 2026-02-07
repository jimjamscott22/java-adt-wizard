import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice/:adtType" element={<PracticePage />} />
        </Routes>
      </main>
    </div>
  );
}
