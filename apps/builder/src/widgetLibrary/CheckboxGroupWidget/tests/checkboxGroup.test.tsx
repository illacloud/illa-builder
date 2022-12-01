import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { WrappedCheckbox } from "../index"

test("checkboxGroup renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedCheckbox
      options={[{ label: "1", value: 1 }]}
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByText("1")).toBeInTheDocument()
  fireEvent.click(screen.getByDisplayValue("1"))
  expect(handleUpdateDSL).toBeCalled()
})
