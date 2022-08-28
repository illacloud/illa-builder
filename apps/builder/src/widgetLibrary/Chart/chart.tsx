import { FC } from "react"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

export const Chart: FC = (props) => {
  const {} = props

  return (
    <Line
      height="100%"
      datasetIdKey="id"
      data={{
        labels: [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
        ],
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
      }}
    />
  )
}

export const ChartWidget: FC = (props) => {
  const {} = props
  return <Chart {...props} />
}

ChartWidget.displayName = "ChartWidget"
