import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Data from './Data';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Data />} /> {/* Defina a rota da página home */}
      </Routes>
    </Router>
  );
}

export default App;
