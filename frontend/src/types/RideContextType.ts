import { DriverType } from "./DriverType";
import { EstimateRideType } from "./EstimateRideType";
import { RidesByCustomerType } from "./RidesByCustomerType";

export type EstimateRideContextType = {
  estimateRide: EstimateRideType | null,
  estimateRideApi: (customerId: string, origin: string, destination: string) => void,
  confirmRideApi: (driverId: number) => void,
  error: string | null,
  loading: boolean,
  ridesByCustomer: RidesByCustomerType | null,
  fetchRidesByCustomerApi: (customerId: string, driverId?: string) => void,
  getDrivers: () => void,
  drivers:DriverType[],
}