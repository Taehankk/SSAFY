import { ToDoListContextProvider } from './contexts/ToDoList';

import { Header } from './components/organisms/Header';
import { ToDoListPage } from './components/pages/ToDoListPage';
import { ToDoInputPage } from './components/pages/ToDoInputPage';
import { NotFound } from './components/pages/NotFound';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ToDoListContextProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ToDoListPage />} />
          <Route path="/add" element={<ToDoInputPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ToDoListContextProvider>
  );
}

export default App;
