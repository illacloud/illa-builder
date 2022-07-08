import { WrappedCheckbox } from "../index"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("checkboxGroup renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedCheckbox
      manualOptions={[{ label: "1", value: 1 }]}
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByText("1")).toBeInTheDocument()
  fireEvent.click(screen.getByDisplayValue("1"))
  expect(handleUpdateDSL).toBeCalled()
})
