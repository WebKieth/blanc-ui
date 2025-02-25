import { useContext } from "react";
import { ViewLayersContext } from "./provider";

export const useViewLayers = () => useContext(ViewLayersContext)