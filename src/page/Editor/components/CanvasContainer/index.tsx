import { FC, HTMLAttributes, useEffect, useState } from "react"
import { WrappedChart } from "../../../../wrappedComponents/Chart"
import { DATAType } from "../../../../wrappedComponents/Chart/interface"

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const CanvasContainer: FC<CanvasContainerProps> = (props) => {
  const { className } = props
  const [chartDate, setData] = useState<DATAType>({})

  useEffect(() => {
    console.log(
      "chartDate",
      chartDate?.xAxis ? chartDate.xAxis[0] : undefined,
      chartDate.datasets,
      chartDate?.dataMap,
    )
  }, [chartDate])

  return (
    <div className={className}>
      <WrappedChart
        datasets={chartDate.datasets}
        xAxisValues={chartDate?.dataMap ? chartDate?.dataMap["date"] : []}
        groupBy={"animal"}
        type={"Pie"}
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
    </div>
  )
}

CanvasContainer.displayName = "CanvasContainer"
