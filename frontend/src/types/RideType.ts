import { DriverType } from "./DriverType";

export type RideType = {
  id: number,
  date: string,
  origin: string,
  destination: string,
  distance: number,
  duration: string,
  driver: DriverType,
  value: number,
}