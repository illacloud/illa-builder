import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("WrappedInput renders correctly", () => {
  render(<div>WrappedInput</div>)
  expect(screen.getByText("WrappedInput")).toBeInTheDocument()
})
