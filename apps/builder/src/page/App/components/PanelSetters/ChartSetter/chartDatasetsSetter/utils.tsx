import { v4 } from "uuid"
import {
  CHART_DATASET_AGGREGATION_METHOD,
  CHART_TYPE,
} from "@/widgetLibrary/Chart"

export const generateDatasetItem = (chartType: CHART_TYPE) => {
  return {
    id: v4(),
    datasetName: "1",
    datasetValues: "",
    aggregationMethod: CHART_DATASET_AGGREGATION_METHOD.SUM,
    type: chartType,
    color: "blue",
  }
}
