import { Route, Routes } from 'react-router-dom';
//import './App.css'
import Layout from './components/Layout';
import SolicitarViagem from './pages/SolicitarViagem';
import OpcoesViagem from './pages/OpcoesViagem';
import HistoricoViagem from './pages/HistoricoViagem';


function App() {
  

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<SolicitarViagem />} />
        <Route path="/opcoes" element={<OpcoesViagem />} />
      <Route path="/historico" element={<HistoricoViagem />} />
      </Route>
    </Routes>
  )
}

export default App
