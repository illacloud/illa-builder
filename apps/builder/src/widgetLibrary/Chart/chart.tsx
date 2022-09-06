import { FC, useMemo } from "react"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js"
import { Line } from "react-chartjs-2"
import {
  ChartWidgetProps,
  WrappedChartProps,
} from "@/widgetLibrary/Chart/interface"
import { css } from "@emotion/react"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const Chart: FC<ChartWidgetProps> = (props) => {
  const { w, h, unitW, unitH } = props

  const data = useMemo(() => {
    return {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          data: [1, 2, 3, 4, 5, 6, 7],
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
        {
          label: "Dataset 2",
          data: [1, 2, 3, 4, 5, 6, 7],
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    }
  }, [])

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      `}
    >
      <Line
        height={h * unitH}
        width={w * unitW}
        datasetIdKey="id"
        data={data}
      />
    </div>
  )
}

export const ChartWidget: FC<WrappedChartProps> = (props) => {
  const { w, h, unitW, unitH } = props
  return <Chart w={w} h={h} unitH={unitH} unitW={unitW} />
}

ChartWidget.displayName = "ChartWidget"
