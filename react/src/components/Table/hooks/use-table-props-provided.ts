import { useContext } from "react";
import { TablePropsContext } from "../Table";

export const useTablePropsProvided = () => useContext(TablePropsContext);