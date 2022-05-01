import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/pages/Home'
import Episode from './components/detalhes/Episode'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/episode/:id" element={<Episode />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
