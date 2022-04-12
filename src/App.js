import {useState} from 'react';
import { TiZoom } from "react-icons/ti";
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch(){
    if(input === ''){
      alert('Vocẽ não preencheu com um CEP!') 
      return;
    }

    try {
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
    } 
    catch (error) {
      alert('Algo deu errado, tente novamente.')
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title"> Buscador de CEP </h1>

      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..." value={input} onChange={(e) => setInput(e.target.value)} />
        <button className="buttonSearch" onClick={handleSearch}>
          <TiZoom size={20} color="#fff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main>
        <h2>CEP: {cep.cep}</h2>

        <p>Rua: {cep.logradouro}</p>
        <p>complemento: {cep.complemento}</p>
        <p>Bairro: {cep.bairro} </p>
        <p>{cep.localidade} - {cep.uf}</p> 
      </main>
      )}
    </div>
  );
}

export default App;
