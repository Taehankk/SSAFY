import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataPage } from './pages/dataPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
