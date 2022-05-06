import { DrawingBoard, ViewBoard } from './components';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Test</h1>} />
        <Route path="/drawer" element={<DrawingBoard />} />
        <Route path="/guesser" element={<ViewBoard />} />
      </Routes>
    </div>
  );
}

export default App
