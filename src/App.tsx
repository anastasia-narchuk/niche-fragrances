import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { QuizProvider } from './context/QuizContext';
import { Header } from './components/layout/Header';
import { LandingPage } from './pages/LandingPage';
import { MBTISelectPage } from './pages/MBTISelectPage';
import { QuizPage } from './pages/QuizPage';
import { ResultsPage } from './pages/ResultsPage';
import './i18n';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/select" element={<MBTISelectPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <BrowserRouter>
      <QuizProvider>
        <Header />
        <AnimatedRoutes />
      </QuizProvider>
    </BrowserRouter>
  );
}

export default App;
