import axios from "axios";

import {
    TAREAS_API_BASE_URL
} from "./Constants";

export default function useTareasApi(){
  const tareasApi = axios.create({
    baseURL: TAREAS_API_BASE_URL,        
  });

  return tareasApi;
}