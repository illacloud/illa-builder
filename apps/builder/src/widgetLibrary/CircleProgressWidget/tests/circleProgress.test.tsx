import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WrappedCircleProgress } from "../index"

test("WrappedCircleProgress renders correctly", () => {
  render(<WrappedCircleProgress value={50} w={80} h={80} unitH={1} unitW={1} />)
  expect(screen.getByText("50%")).toBeInTheDocument()
})
