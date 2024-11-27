import { useContext, useState } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";
import './index.css';

function SolicitarViagem() {
  const [userId, setUserId] = useState<number>(1); // Valor inicial 1
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null); // Estado para erros
  const { estimateRideApi, error, loading } = useContext(EstimateRideContext);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!originAddress || !destinationAddress) {
      setFormError("Preencha todos os campos corretamente.");
      return;
    }

    setFormError(null); // Reseta o erro antes da requisição
    try {
      await estimateRideApi(String(userId), originAddress, destinationAddress);
      setUserId(1); // Reseta os campos após a submissão
      setOriginAddress('');
      setDestinationAddress('');
    } catch (err) {
      setFormError("Erro ao solicitar a viagem. Tente novamente.");
    }
  };

  const handleUserIdChange = (value: string) => {
    const numericValue = Number(value);
    setUserId(numericValue < 1 ? 1 : numericValue);
  };

  return (
    <div className="solicitar-viagem-container">
      <form className="solicitar-viagem-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Solicitar Viagem</h2>

        {formError && <p className="form-error">{formError}</p>}
        {error && <p className="form-error">{error}</p>}

        <div className="form-group">
          <label htmlFor="userId" className="form-label">
            Id do Usuário
          </label>
          <input
            type="number"
            id="userId"
            className="form-input"
            value={userId}
            min={1}
            onChange={(e) => handleUserIdChange(e.target.value)}
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

        <button type="submit" className="form-button" disabled={loading}>
          {loading ? "Carregando..." : "Calcular Rota"}
        </button>
      </form>
    </div>
  );
}

export default SolicitarViagem;
