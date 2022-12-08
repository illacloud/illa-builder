import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedTimeline } from "../index"

test("Timeline renders correctly", () => {
  render(<WrappedTimeline items={["test1", "test2", "test3"]} />)
  expect(screen.getByText("test2")).toBeInTheDocument()
})
