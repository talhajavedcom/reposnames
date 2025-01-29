import { useState } from 'react';
import Header from './components/Header';
import MainLayout from './MainLayout';

const App = () => {
  const [jsonData, setJsonData] = useState({ slide: [] });

  return (
    <>
      <Header jsonData={jsonData} />
      <MainLayout jsonData={jsonData} setJsonData={setJsonData} />
    </>
  );
};

export default App;
