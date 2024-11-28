import { useContext } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";
import DriverCardOption from "../../components/DriverCardOption";

function OpcoesViagem() {
  const { estimateRide, confirmRideApi, error, loading } = useContext(EstimateRideContext);

  const googleApiKey = import.meta.env.VITE_REACT_APP_GOOGLE_API_KEY;

  const googleMapsUrl = `https://maps.googleapis.com/maps/api/staticmap?size=600x400&markers=color:red|label:A|${estimateRide?.origin.latitude},${estimateRide?.origin.longitude}&markers=color:green|label:B|${estimateRide?.destination.latitude},${estimateRide?.destination.longitude}&path=color:blue|weight:5|${estimateRide?.origin.latitude},${estimateRide?.origin.longitude}|${estimateRide?.destination.latitude},${estimateRide?.destination.longitude}&key=${googleApiKey}`;

  if (!estimateRide) {
    return <p>Carregando informações de estimativa...</p>;
  }

  return (
    <div className="opcoes-de-viagem-container">
      <h2>Opções de Viagem</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Carregando...</p>}

      <div className="content">
        {/* Mapa à esquerda */}
        <div className="map-container">
          <h3>Mapa da Rota</h3>
          <img
            src={googleMapsUrl}
            alt="Mapa da Rota"
            style={{ width: "100%", maxWidth: "600px", height: "auto" }}
          />
        </div>

        {/* Opções de motoristas à direita */}
        <div className="drivers-container">
          <h3>Motoristas Disponíveis</h3>
          {estimateRide.options.map((driver) => (
            <DriverCardOption
              key={driver.id}
              id={driver.id}
              name={driver.name}
              description={driver.description}
              vehicle={driver.vehicle}
              rating={driver.review.rating}
              comment={driver.review.comment}
              value={driver.value}
              onSelect={confirmRideApi}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default OpcoesViagem;
