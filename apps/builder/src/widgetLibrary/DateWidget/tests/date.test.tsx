import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedDate } from "../index"

test("WrappedDate renders correctly", () => {
  const handleUpdateDSL = jest.fn()

  render(<WrappedDate value={"2022-06-01"} handleUpdateDsl={handleUpdateDSL} />)
  expect(screen.getByDisplayValue("2022-06-01")).toBeInTheDocument()
})
