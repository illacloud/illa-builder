import {
  ACTION_RUN_TIME,
  IAdvancedConfig,
} from "@/redux/currentApp/action/actionState"

export const INIT_ACTION_ADVANCED_CONFIG: IAdvancedConfig = {
  runtime: ACTION_RUN_TIME.NONE,
  pages: [],
  delayWhenLoaded: "",
  displayLoadingPage: false,
  isPeriodically: false,
  periodInterval: "",
}
