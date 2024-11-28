import React from "react";
import './index.css'

type DriverCardOptionProps = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  rating: number;
  comment: string;
  value: number;
  onSelect: (driverId: number) => void;
};

const DriverCardOption: React.FC<DriverCardOptionProps> = ({
  id,
  name,
  description,
  vehicle,
  rating,
  comment,
  value,
  onSelect,
}) => {
  return (
    <div className="driver-card-option">
      <p><strong>Nome:</strong> {name}</p>
      <p><strong>Descrição:</strong> {description}</p>
      <p><strong>Veículo:</strong> {vehicle}</p>
      <p><strong>Avaliação:</strong> {rating}</p>
      <p><strong>Comentário:</strong> {comment}</p>
      <p><strong>Valor:</strong> R$ {value.toFixed(2)}</p>
      <button onClick={() => onSelect(id)}>Escolher</button>
    </div>
  );
};

export default DriverCardOption;
