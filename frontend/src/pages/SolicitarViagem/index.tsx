import { useContext, useState } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";
import './index.css';

function SolicitarViagem() {
  const [userId, setUserId] = useState<number>(0);
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const { estimateRideApi } = useContext(EstimateRideContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setUserId(0);
    setOriginAddress('');
    setDestinationAddress('');
    await estimateRideApi(String(userId), originAddress, destinationAddress);
  };

  return (
    <div className="solicitar-viagem-container">
      <form className="solicitar-viagem-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Solicitar Viagem</h2>
        <div className="form-group">
          <label htmlFor="userId" className="form-label">
            Id do Usuário
          </label>
          <input
            type="number"
            id="userId"
            className="form-input"
            value={userId}
            min={0}
            onChange={(e) => setUserId(Number(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="originAddress" className="form-label">
            Endereço de Origem
          </label>
          <input
            type="text"
            id="originAddress"
            className="form-input"
            value={originAddress}
            onChange={(e) => setOriginAddress(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="destinationAddress" className="form-label">
            Endereço de Destino
          </label>
          <input
            type="text"
            id="destinationAddress"
            className="form-input"
            value={destinationAddress}
            onChange={(e) => setDestinationAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="form-button">
          Calcular Rota
        </button>
      </form>
    </div>
  );
}

export default SolicitarViagem;
