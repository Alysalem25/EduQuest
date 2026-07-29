import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Home from '@/pages/Home';
import FindTutor from '@/pages/FindTutor';
import Login from './pages/Login';
import AdminTutors from './pages/AdminTutors';
import AdminTutors2 from './pages/AdminTutors2';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-tutor" element={<FindTutor />} />
            <Route path="/login" element={<Login />} />
            <Route path="/AdminTutors" element={<AdminTutors />} />
            <Route path="/AdminTutors2" element={<AdminTutors2 />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
