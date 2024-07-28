import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home } from './components/pages/Home';
import { DayData } from './components/pages/DayData';
import { TotalData } from './components/pages/TotalData';
import { DataDetail } from './components/organisms/DataDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/data/one" element={<DayData />} />
          <Route path="/data/all" element={<TotalData />} />
          <Route path="/data/detail" element={<DataDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
