import { groupBy as groupByFunc } from "lodash"
export const groupByDatasetsHelper = (data: unknown[], groupBy: string) => {
  return groupByFunc(data, groupBy)
}
