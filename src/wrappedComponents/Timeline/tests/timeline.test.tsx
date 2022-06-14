import { WrappedTimeline } from "../index"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Timeline renders correctly", () => {
  render(<WrappedTimeline items={["test1", "test2", "test3"]} />)
  expect(screen.getByText("test2")).toBeInTheDocument()
})
