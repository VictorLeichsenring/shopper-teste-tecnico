import { DriverType } from "./DriverType"

export type EstimateRideType = {
  origin: {
    latitude: number,
    longitude: number,
  },
  destination: {
    latitude: number,
    longitude: number,
  },
  distance: number,
  duration: string,
  options: DriverType[],
  routeResponse: object,
}