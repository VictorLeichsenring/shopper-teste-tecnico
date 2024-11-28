import { useContext, useEffect, useState } from "react";
import EstimateRideContext from "../../context/EstimateRideContext";
import RideCard from "../../components/RideCard";
import './index.css'

function HistoricoViagem() {
  const [userId, setUserId] = useState<number>(1);            
  const [driverId, setDriverId] = useState<number | null>(null);

  const {
    ridesByCustomer,
    fetchRidesByCustomerApi,
    error,
    loading,
    getDrivers,
    drivers
  } = useContext(EstimateRideContext);

  useEffect(() => {
    getDrivers();
  }, [getDrivers]);

  const handleFilter = async () => {
    if (!userId) {
      alert("Por favor, informe o ID do usuário.");
      return;
    }
    
    await fetchRidesByCustomerApi(
      userId.toString(),
      driverId !== null && driverId !== 0 ? driverId.toString() : undefined // Envia undefined ao invés de null
    );
  };

  const handleUserIdChange = (value: string) => {
    const numericValue = Number(value);
    if (numericValue < 1) {
      setUserId(1); // Define o valor como 1 se for menor
    } else {
      setUserId(numericValue);
    }
  };

  return (
    <div className="historico-viagens-container">
      <h2>Histórico de Viagens</h2>

      <div className="filter-container">
        <label htmlFor="userId">ID do Usuário:</label>
        <input
          type="number"
          id="userId"
          value={userId}
          min={1}
          onChange={(e) => handleUserIdChange(e.target.value)}
        />
      </div>

      <div className="filter-container">
        <label htmlFor="driverId">Selecione o Motorista:</label>
        <select
          id="driverId"
          value={driverId ?? ""}
          onChange={(e) =>
            setDriverId(e.target.value === "" ? null : Number(e.target.value))
          }
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
          <RideCard key={ride.id} ride={ride} /> // Use RideCard para renderizar as viagens
        ))}
      </div>
    </div>
  );
}

export default HistoricoViagem;
