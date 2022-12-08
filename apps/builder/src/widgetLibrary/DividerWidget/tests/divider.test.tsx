import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedDivider } from "@/widgetLibrary/DividerWidget"

test("WrappedDivider renders correctly", () => {
  render(<WrappedDivider text={"2022-06-01"} />)
  expect(screen.getByText("2022-06-01")).toBeInTheDocument()
})
