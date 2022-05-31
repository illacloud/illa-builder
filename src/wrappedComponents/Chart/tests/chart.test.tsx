import { render } from "@testing-library/react"
import { formatPropsToChartOptions } from "../formatData"
import {
  initData,
  removeSubstitution,
  wrapDataset,
  wrapDatasetByGroup,
  wrapPieDataset,
} from "../utils"

const testData = [
  {
    date: "2010-03-01",
    y: 10,
    y2: 10,
    animal: "dog",
  },
  {
    date: "2010-03-02",
    y: 6,
    y2: 12,
    animal: "dog",
  },
  {
    date: "2010-03-03",
    y: 7,
    y2: 19,
    animal: "frog",
  },
  {
    date: "2010-03-04",
    y: 3,
    y2: 8,
    animal: "cat",
  },
  {
    date: "2010-03-05",
    y: 2,
    y2: 7,
    animal: "cat",
  },
]

test("format data correctly", () => {
  const data = initData(testData)
  const dataset = data.datasets
  const dataMap = data.dataMap
  expect(data.groupBy).toStrictEqual(["date", "y", "y2", "animal"])
  expect(data.xAxis).toStrictEqual(["date", "y", "y2", "animal"])
  expect(data.datasets?.length).toBe(2)
  const wrappedRes = wrapDataset(dataset)
  expect(wrappedRes.datasets[0]).toStrictEqual({
    label: "y",
    data: [10, 6, 7, 3, 2],
    backgroundColor: "#ff4747",
    borderColor: "#ff4747",
    yAxisID: "yAxis",
  })
  const groupBy = "animal"
  const group = dataMap ? dataMap[groupBy] : []
  expect(
    wrapDatasetByGroup(testData, dataset, group, groupBy).datasets.length,
  ).toBe(6)
  expect(wrapPieDataset(dataset).datasets[0].data).toStrictEqual([
    20, 18, 26, 11, 9,
  ])
  expect(
    removeSubstitution("%{x}-%{y}", {
      x: "illa",
      y: "builder",
      datasetLabel: "",
    }),
  ).toBe("illa-builder")
  const option = formatPropsToChartOptions(
    "Line",
    "my chart",
    "category",
    "x-title",
    "y-title",
    "bottom",
    wrappedRes.tooltips,
  )
  expect(option).toMatchInlineSnapshot(`
    Object {
      "plugins": Object {
        "datalabels": Object {
          "formatter": [Function],
        },
        "legend": Object {
          "onClick": [Function],
          "position": "bottom",
        },
        "title": Object {
          "display": true,
          "text": "my chart",
        },
        "tooltip": Object {
          "callbacks": Object {
            "label": [Function],
            "title": [Function],
          },
          "enabled": true,
          "position": "nearest",
          "usePointStyle": false,
        },
      },
      "responsive": true,
      "scales": Object {
        "xAxis": Object {
          "display": true,
          "time": Object {
            "displayFormats": Object {
              "day": "MMM DD",
              "hour": "MMM DD",
              "millisecond": "MMM DD",
              "minute": "MMM DD",
              "month": "MMM DD",
              "quarter": "MMM DD",
              "second": "MMM DD",
              "week": "MMM DD",
              "year": "MMM DD",
            },
            "unit": "day",
            "unitStepSize": 1,
          },
          "title": Object {
            "display": true,
            "text": "x-title",
          },
          "type": "category",
        },
        "yAxis": Object {
          "display": true,
          "title": Object {
            "display": true,
            "text": "y-title",
          },
        },
      },
    }
  `)
})
