import React from "react";
import { RideType } from "../../types/RideType"; 
import "./index.css";

type RideCardProps = {
  ride: RideType;
};

const RideCard: React.FC<RideCardProps> = ({ ride }) => {
  return (
    <div className="ride-card">
      <div className="ride-card-header">
        <h3>Viagem #{ride.id}</h3>
        <p>{new Date(ride.date).toLocaleString()}</p>
      </div>
      <div className="ride-card-details">
        <p><strong>Motorista:</strong> {ride.driver.name}</p>
        <p><strong>Origem:</strong> {ride.origin}</p>
        <p><strong>Destino:</strong> {ride.destination}</p>
        <p><strong>Distância:</strong> {ride.distance} km</p>
        <p><strong>Duração:</strong> {ride.duration}</p>
        <p><strong>Valor:</strong> R$ {ride.value.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default RideCard;
