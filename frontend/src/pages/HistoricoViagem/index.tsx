import { useContext, useEffect, useState } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";

function HistoricoViagem() {
  const [userId, setUserId] = useState<number>(0);
  const [driverId, setDriverId] = useState<number | null>(null);

  const { 
    ridesByCustomer,
    fetchRidesByCustomerApi,
    error,
    loading,
    getDrivers,
    drivers
   } =
    useContext(EstimateRideContext);

    useEffect(() => {
      getDrivers();
    }, [getDrivers]);

  const handleFilter = async () => {
    if (!userId) {
      alert("Por favor, informe o ID do usuário.");
      return;
    }

    
    await fetchRidesByCustomerApi(userId.toString(), driverId?.toString());
  };

  return (
    <div className="historico-viagens-container">
      <h2>Histórico de Viagens</h2>

      <div>
        <label htmlFor="userId">ID do Usuário:</label>
        <input
          type="number"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))} 
        />
      </div>

      <div>
        <label htmlFor="driverId">Selecione o Motorista:</label>
        <select
          id="driverId"
          value={driverId ?? ""}
          onChange={(e) =>
            setDriverId(e.target.value === "all" ? null : Number(e.target.value))
          } // Atualiza o estado com null ou número
        >
          <option value="">Todos</option>
          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>
      </div>

      <button onClick={handleFilter} disabled={loading}>
        {loading ? "Carregando..." : "Aplicar Filtro"}
      </button>

      {error && <p className="error">{error}</p>}

      <div className="rides-list">
        {ridesByCustomer?.rides.length === 0 && !loading && (
          <p>Nenhuma viagem encontrada.</p>
        )}

        {ridesByCustomer?.rides.map((ride) => (
          <div key={ride.id} className="ride-item">
            <p>Data e Hora: {new Date(ride.date).toLocaleString()}</p>
            <p>Motorista: {ride.driver.name}</p>
            <p>Origem: {ride.origin}</p>
            <p>Destino: {ride.destination}</p>
            <p>Distância: {ride.distance} km</p>
            <p>Duração: {ride.duration}</p>
            <p>Valor: R$ {ride.value.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoricoViagem;
