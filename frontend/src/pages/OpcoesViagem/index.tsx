import { useContext } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";

function OpcoesViagem() {
  const {estimateRide, confirmRideApi, error, loading} = useContext(EstimateRideContext);

  if (!estimateRide) {
    return <p>Carregando informações de estimativa...</p>;
  }

  return(
    <div className="opcoes-de-viagem-container">
    <h2>Opções de Viagem</h2>
    {error && <p style={{ color: "red" }}>{error}</p>}
    {loading && <p>Carregando...</p>}
    <div id="mapa">
      <h3>Mapa da Rota</h3>
      {/* <img
        src={`https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${estimateRide.routeResponse}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
        alt="Mapa da Rota"
      /> */}
    </div>

    <div id="opcoes">
      <h3>Motoristas Disponíveis</h3>
      {estimateRide.options.map((driver) => (
        <div key={driver.id} className="driver-option">
          <p><strong>Nome:</strong> {driver.name}</p>
          <p><strong>Descrição:</strong> {driver.description}</p>
          <p><strong>Veículo:</strong> {driver.vehicle}</p>
          <p><strong>Avaliação:</strong> {driver.review.rating}</p>
          <p><strong>Comentário:</strong> {driver.review.comment}</p>
          <p><strong>Valor:</strong> R$ {driver.value.toFixed(2)}</p>
          <button onClick={() => confirmRideApi(driver.id)}>Escolher</button>
        </div>
      ))}
    </div>
  </div>
  )
}

export default OpcoesViagem;