import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import HomePage from './pages/HomePage';
import PracticePage from './pages/PracticePage';
import OOPPage from './pages/OOPPage';
import AlgorithmsPage from './pages/AlgorithmsPage';
import DataStructuresPage from './pages/DataStructuresPage';
import ComplexityPage from './pages/ComplexityPage';
import StrategiesPage from './pages/StrategiesPage';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/practice/:adtType" element={<PracticePage />} />
          <Route path="/learn/oop" element={<OOPPage />} />
          <Route path="/learn/algorithms" element={<AlgorithmsPage />} />
          <Route path="/learn/data-structures" element={<DataStructuresPage />} />
          <Route path="/learn/complexity" element={<ComplexityPage />} />
          <Route path="/learn/strategies" element={<StrategiesPage />} />
        </Routes>
      </main>
    </div>
  );
}
