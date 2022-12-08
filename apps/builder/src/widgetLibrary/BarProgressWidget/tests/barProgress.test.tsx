import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedBarProgress } from "../index"

test("WrappedBarProgress renders correctly", () => {
  render(<WrappedBarProgress value={50} />)
  expect(screen.getByText("50%")).toBeInTheDocument()
})
