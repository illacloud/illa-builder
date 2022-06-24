import { render, screen } from "@testing-library/react"
import { WrappedDateRange } from "../index"
import "@testing-library/jest-dom"

test("WrappedDateRange renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedDateRange
      startValue="2022-06-01"
      endValue="2022-06-02"
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByDisplayValue("2022-06-01")).toBeInTheDocument()
})
