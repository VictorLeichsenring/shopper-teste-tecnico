import { RideType } from "./RideType";

export type RidesByCustomerType = {
  customerId: string,
  rides : RideType[],
}