import { createContext } from "react";
import { EstimateRideContextType } from "../types/RideContextType";


const EstimateRideContext = createContext({} as EstimateRideContextType);

export default EstimateRideContext;