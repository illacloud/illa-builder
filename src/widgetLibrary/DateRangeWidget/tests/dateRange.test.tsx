import { render, screen } from "@testing-library/react"
import { WrappedDateRange } from "../index"
import "@testing-library/jest-dom"

test("WrappedDateRange renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  const handleUpdateGlobal = jest.fn()
  const handleDeleteGlobal = jest.fn()
  render(
    <WrappedDateRange
      startValue="2022-06-01"
      endValue="2022-06-02"
      handleUpdateDsl={handleUpdateDSL}
      handleUpdateGlobalData={handleUpdateGlobal}
      handleDeleteGlobalData={handleDeleteGlobal}
      displayName="test-date-range"
    />,
  )
  expect(screen.getByDisplayValue("2022-06-01")).toBeInTheDocument()
})
