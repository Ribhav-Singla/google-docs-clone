import "./App.css";
import Navbar from "./components/Navbar";
import TextEditor from "./components/TextEditor";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} />} />
          <Route path="/documents/:id" element={<TextEditor />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
