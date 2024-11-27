import { EstimateRideType } from "./EstimateRideType";

export type EstimateRideContextType = {
  estimateRide: EstimateRideType | null;
  estimateRideApi: (customerId: string, origin: string, destination: string) => void,
  error: string | null;
  loading: boolean;
}