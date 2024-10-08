import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { DataPage } from './components/pages/DataPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data" element={<DataPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
