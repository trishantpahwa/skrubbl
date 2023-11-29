import { DrawingBoard, ViewBoard } from './components';
import { Routes, Route } from 'react-router-dom';
import './App.css'

import {
  Home,
  Room
} from './pages';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/drawer" element={<DrawingBoard />} />
        <Route path="/guesser" element={<ViewBoard />} />
        <Route path="/room/:roomID" element={<Room />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App
