import { render, screen } from "@testing-library/react"
import { WrappedDate } from "../index"
import "@testing-library/jest-dom"

test("WrappedButton renders correctly", () => {
  render(<WrappedDate defaultValue={"2022-06-01"} />)
  expect(screen.getByDisplayValue("2022-06-01")).toBeInTheDocument()
})
