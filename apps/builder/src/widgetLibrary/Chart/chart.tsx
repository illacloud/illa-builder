import { FC } from "react"

export const Chart: FC = (props) => {
  const {} = props
  return <div></div>
}

export const ChartWidget: FC = (props) => {
  const {} = props
  return <Chart {...props} />
}

ChartWidget.displayName = "ChartWidget"
