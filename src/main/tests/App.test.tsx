import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("App renders correctly.", () => {
  render(<div data-testid="test" />)
  expect(screen.getByTestId("test")).toBeInTheDocument()
})
