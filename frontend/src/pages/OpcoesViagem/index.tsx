import { useContext } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";

function OpcoesViagem() {
  const {estimateRide, confirmRideApi, error, loading} = useContext(EstimateRideContext);

  const googleApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

 

  // const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&path=enc:${estimateRide?.routeResponse.polyline.encodedPolyline}&markers=color:blue%7Clabel:A%7C${estimateRide?.origin.latitude},${estimateRide?.origin.longitude}&markers=color:red%7Clabel:B%7C${estimateRide?.destination.latitude},${estimateRide?.destination.longitude}&key=${googleApiKey}`;

  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red|label:A|${estimateRide?.origin.latitude},${estimateRide?.origin.longitude}&markers=color:green|label:B|${estimateRide?.destination.latitude},${estimateRide?.destination.longitude}&path=color:blue|weight:5|${estimateRide?.origin.latitude},${estimateRide?.origin.longitude}|${estimateRide?.destination.latitude},${estimateRide?.destination.longitude}&key=${googleApiKey}`;

console.log("URL do Mapa:", googleMapsUrl);


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
      <img
          src={googleMapsUrl}
          alt="Mapa da Rota"
          style={{ width: "100%", maxWidth: "600px", height: "auto" }}
        />
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