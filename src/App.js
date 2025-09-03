// App.jsx
import { Routes, Route } from 'react-router-dom'
import Download from './components/Download';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      {/* Gerenciamento de Rotas */}
      <Routes>
        {/* Ao acessar a página leva ao componente Upload */}
        <Route path="/" element={<Upload />} />
        {/* Ao acessar a página /Download leva ao componente Download */}
        <Route path="/Download" element={<Download />} />
      </Routes>
    </div>
  )
}

export default App