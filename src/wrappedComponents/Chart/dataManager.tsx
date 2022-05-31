import { FC, useState } from "react"
import { DATAType } from "@/wrappedComponents/Chart/interface"
import { WrappedChart } from "@/wrappedComponents/Chart/chart"

function getDisplayName(WrappedComponent: FC<any>) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component"
}

export function withData<T>(): FC<T> {
  const ParseredComponent: FC<any> = (dsl) => {
    const [chartDate, setData] = useState<DATAType>({})
    // TODO: wait to add component parser and labelWrapper

    return (
      <>
        <WrappedChart
          datasets={chartDate.datasets}
          xAxisValues={chartDate?.dataMap ? chartDate?.dataMap["date"] : []}
          type={"ScatterPlot"}
          title={"chart"}
          initConfigByData={(xAxis, groupBy, datasets, dataMap) => {
            setData({
              xAxis: xAxis,
              groupBy: groupBy,
              datasets: datasets,
              dataMap: dataMap,
            })
          }}
        />
      </>
    )
  }

  return ParseredComponent
}
