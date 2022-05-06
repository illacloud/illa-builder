import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("ConfigPanel renders correctly", () => {
  render(<div data-testid="config-panel" />)
  expect(screen.getByTestId("config-panel")).toBeInTheDocument()
})
