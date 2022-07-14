import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Chart renders correctly", () => {
  render(<div>Chart</div>)
  expect(screen.getByText("Chart")).toBeInTheDocument()
})
