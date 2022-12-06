import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test("WrappedInput renders correctly", () => {
  render(<div>WrappedInput</div>)
  expect(screen.getByText("WrappedInput")).toBeInTheDocument()
})
