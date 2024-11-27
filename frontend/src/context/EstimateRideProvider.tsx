import { useCallback, useState } from "react";
import { EstimateRideType } from "../types/EstimateRideType";
import { useNavigate } from "react-router-dom";
import shopperApi from "../utils/fetch";
import EstimateRideContext from "./EstimateRideContext";

function EstimateRideProvider({ children }: {children: React.ReactNode}) {
  const[estimateRide, setEstimateRide] = useState<EstimateRideType | null>(null);
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
        navigate('opcoes');
      } catch (error) {
        console.error("Erro ao solicitar estimativa de viagem:", error);
        setError("Erro ao solicitar estimativa de viagem. Tente novamente.");
      } finally {
        setLoading(false);
      }
  }, [navigate]);
  return (
    <EstimateRideContext.Provider value={{ estimateRide, estimateRideApi, error, loading }}>
      {children}
    </EstimateRideContext.Provider>
  );
}



export default EstimateRideProvider;