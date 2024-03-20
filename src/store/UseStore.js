import { common_store } from "./Common_Store";
import { data_store } from "./DataStore";
import { deca_store } from "./DECAStore";
import { smplify_store } from "./SmplifyStore";
import { animation_store } from "./AnimationStore";

export default function useStore() {
  return {
    deca_store,
    common_store,
    data_store,
    smplify_store,
    animation_store,
  };
}
