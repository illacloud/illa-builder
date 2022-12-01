import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test("Editor renders correctly", () => {
  render(<div>Hello</div>)
  expect(screen.getByText("Hello")).toBeInTheDocument()
})
