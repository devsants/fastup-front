// App.jsx
import { Routes, Route } from 'react-router-dom'
import Download from './components/Download';
import Upload from './components/Upload';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Upload />} />
        <Route path="/Download" element={<Download />} />
      </Routes>
    </div>
  )
}

export default App