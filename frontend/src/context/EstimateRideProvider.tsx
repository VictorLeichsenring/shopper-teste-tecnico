import { useCallback, useState } from "react";
import { EstimateRideType } from "../types/EstimateRideType";
import { useNavigate } from "react-router-dom";
import shopperApi from "../utils/fetch";
import EstimateRideContext from "./EstimateRideContext";
import { RidesByCustomerType } from "../types/RidesByCustomerType";
import { DriverType } from "../types/DriverType";

function EstimateRideProvider({ children }: {children: React.ReactNode}) {
  const[estimateRide, setEstimateRide] = useState<EstimateRideType | null>(null);
  const [customerId, setCustomerId] = useState<string>('');
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const  [ridesByCustomer, setRidesByCustomer] = useState<RidesByCustomerType| null>(null);
  const [drivers, setDrivers] = useState<DriverType[]>([])

  const navigate = useNavigate();
  
  const estimateRideApi = useCallback(
    async (customerId: string, origin : string, destination: string) => {
      setLoading(true);
      setError(null);

      try {
        const response = await shopperApi('POST', '/ride/estimate', {
          customer_id:customerId,
          origin,
          destination});
        const data: EstimateRideType = response.data;
        setEstimateRide(data);
        setCustomerId(customerId);
        setOriginAddress(origin);
        setDestinationAddress(destination);
        navigate('opcoes');
      } catch (error) {
        console.error("Erro ao solicitar estimativa de viagem:", error);
        setError("Erro ao solicitar estimativa de viagem. Tente novamente.");
      } finally {
        setLoading(false);
      }
  }, [navigate]);

  const confirmRideApi = useCallback(
    async (driverId: number) => {
      if (!estimateRide) {
        setError("Nenhuma estimativa disponível para confirmar a viagem.");
        return;
      }
      const selectedDriver = estimateRide.options.find((driver) => driver.id === driverId);

      if (!selectedDriver) {
        setError("Motorista selecionado não encontrado.");
        return;
      }

      const requestBody = {
        customer_id: customerId,
        origin: originAddress,
        destination: destinationAddress,
        distance: estimateRide.distance,
        duration: estimateRide.duration,
        driver: {
          id: selectedDriver.id,
          name: selectedDriver.name,
        },
        value: selectedDriver.value,
      };
      try {
        await shopperApi("PATCH", "/ride/confirm", requestBody);
        alert("Viagem confirmada com sucesso!");
        navigate("/historico");
      } catch (error) {
        console.error("Erro ao confirmar viagem:", error);
        setError("Erro ao confirmar viagem. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    [customerId, estimateRide, navigate]
  )

  const fetchRidesByCustomerApi = useCallback(
    async (customerId: string, driverId: string | undefined = undefined) => {
      setLoading(true);
      setError(null);
  
      try {
        const endpoint = driverId
        ? `/ride/${customerId}/${driverId}` // Filtra por driverId
        : `/ride/${customerId}`; // Sem driverId (todos)

      console.log("Endpoint being chamado:", endpoint);
  
        const response = await shopperApi("GET", endpoint);
        setRidesByCustomer(response.data);
      } catch (err) {
        console.error("Erro ao carregar histórico de viagens:", err);
        setError("Erro ao carregar histórico de viagens. Tente novamente.");
      } finally {
        setLoading(false);
      }
    },
    []
  );
  

  const getDrivers = useCallback(async () => {
    try {
      const response = await shopperApi("GET", "/drivers");
      setDrivers(response.data);
    } catch (err) {
      console.error("Erro ao buscar motoristas:", err);
    }
  }, []);
  return (
    <EstimateRideContext.Provider value={{ 
      estimateRide,
      estimateRideApi,
      confirmRideApi,
      ridesByCustomer,
      fetchRidesByCustomerApi,
      getDrivers,
      drivers,
      error,
      loading }}>
      {children}
    </EstimateRideContext.Provider>
  );
}



export default EstimateRideProvider;