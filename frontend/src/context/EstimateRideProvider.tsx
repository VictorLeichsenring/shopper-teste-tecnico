import { useCallback, useState } from "react";
import { EstimateRideType } from "../types/EstimateRideType";
import { useNavigate } from "react-router-dom";
import shopperApi from "../utils/fetch";
import EstimateRideContext from "./EstimateRideContext";

function EstimateRideProvider({ children }: {children: React.ReactNode}) {
  const[estimateRide, setEstimateRide] = useState<EstimateRideType | null>(null);
  const [customerId, setCustomerId] = useState<string>('');
  const [originAddress, setOriginAddress] = useState<string>('');
  const [destinationAddress, setDestinationAddress] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
  return (
    <EstimateRideContext.Provider value={{ 
      estimateRide,
      estimateRideApi,
      confirmRideApi,
      error,
      loading }}>
      {children}
    </EstimateRideContext.Provider>
  );
}



export default EstimateRideProvider;