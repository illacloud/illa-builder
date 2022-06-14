import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WrappedCircleProgress } from "../index"

test("WrappedCircleProgress renders correctly", () => {
  render(<WrappedCircleProgress value={50} />)
  expect(screen.getByText("50%")).toBeInTheDocument()
})
