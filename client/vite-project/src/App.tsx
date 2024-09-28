import "./App.css";
import Navbar from "./components/Navbar";
import TextEditor from "./components/TextEditor";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { RecoilRoot } from "recoil";

function App() {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={`/documents/${uuidv4()}`} />} />
            <Route path="/documents/:id" element={<><Navbar/><TextEditor /></>}/>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
}

export default App;
