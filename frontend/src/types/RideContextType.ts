import { EstimateRideType } from "./EstimateRideType";

export type EstimateRideContextType = {
  estimateRide: EstimateRideType | null;
  estimateRideApi: (customerId: string, origin: string, destination: string) => void,
  confirmRideApi: (driverId: number) => void,
  error: string | null;
  loading: boolean;
}