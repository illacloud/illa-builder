import { render, screen } from "@testing-library/react"
import { WrappedRate } from "../index"
import "@testing-library/jest-dom"

test("WrappedRate renders correctly", () => {
  render(<WrappedRate label="test-value" allowHalf value={2.5} />)
  expect(screen.getByText("test-value")).toBeInTheDocument()
  expect(screen.getAllByTitle("StarIcon")?.[0]).toBeInTheDocument()
})
