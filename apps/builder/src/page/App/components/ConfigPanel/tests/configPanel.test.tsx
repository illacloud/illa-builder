import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"

test("ConfigPanel renders correctly", () => {
  render(<div data-testid="config-panel" />)
  expect(screen.getByTestId("config-panel")).toBeInTheDocument()
})
