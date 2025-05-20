import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UsersPage from './pages/UsersPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />} />
        {/* Aquí puedes agregar más rutas si lo necesitas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
