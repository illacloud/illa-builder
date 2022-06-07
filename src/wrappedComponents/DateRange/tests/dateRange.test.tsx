import { render, screen } from "@testing-library/react"
import { WrappedDateRange } from "../index"
import "@testing-library/jest-dom"

test("WrappedDateRange renders correctly", () => {
  render(<WrappedDateRange value={["2022-06-01", "2022-06-02"]} />)
  expect(screen.getByDisplayValue("2022-06-01")).toBeInTheDocument()
})
