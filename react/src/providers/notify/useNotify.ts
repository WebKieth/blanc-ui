import { useContext } from "react";
import { NotifyContext } from "./provider";

export const useNotify = () => useContext(NotifyContext)