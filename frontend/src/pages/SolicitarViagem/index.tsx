import { useContext, useState } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";

function SolicitarViagem() {
  const [userId, setUserId] = useState<number>(0);
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const { estimateRideApi } = useContext(EstimateRideContext);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setUserId(0);
    setOriginAddress('');
    setDestinationAddress('');  
    await estimateRideApi(String(userId), originAddress, destinationAddress);
  };

  return(
    <div className= 'solictar-viagem-container'>
      <form onSubmit={handleSubmit}>
        <h2>Solicitar Viagem</h2>
        <div>
          <label htmlFor="userId">
            Id do Usuário
          </label>
          <input
          type="number"
          id="userId"
          value={userId}
          min={0}
          onChange={(e) => setUserId(Number(e.target.value))}
          required
          />
        </div>
        <div>
          <label htmlFor="originAddress">
            Endereço de Origem
          </label>
          <input
          type="text"
          id="originAddress"
          value={originAddress}
          onChange={(e) => setOriginAddress(e.target.value)}
          required
          />
        </div>
        <div>
          <label htmlFor="destinationAddress">
            Endereço de Destino
          </label>
          <input
          type="text"
          id="destinationAddress"
          value={destinationAddress}
          onChange={(e) => setDestinationAddress(e.target.value)}
          required
          />
        </div>
        <button type="submit">Calcular Rota</button>
      </form>

    </div>
  )
}

export default SolicitarViagem;