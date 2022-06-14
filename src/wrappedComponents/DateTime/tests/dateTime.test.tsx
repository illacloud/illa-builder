import { render, screen } from "@testing-library/react"
import { WrappedDateTime } from "../index"
import "@testing-library/jest-dom"

test("WrappedDateTime renders correctly", () => {
  render(<WrappedDateTime placeholder={"2022-06-01"} />)
  expect(screen.getByPlaceholderText("2022-06-01")).toBeInTheDocument()
})
