import { common_store } from "./Common_Store";
import { data_store } from "./DataStore";

export default function useStore() {
  return {
    common_store,
    data_store,
  };
}
