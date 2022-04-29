import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Editor renders correctly", () => {
  render(<div>Hello</div>)
  expect(screen.getByText("Hello")).toBeInTheDocument()
})
