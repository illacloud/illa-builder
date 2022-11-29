import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { WrappedRadioButton } from "../index"

test("radioButton renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedRadioButton
      options={[
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ]}
      value={2}
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByText("1")).toBeInTheDocument()
  fireEvent.click(screen.getByDisplayValue("1"))
  expect(handleUpdateDSL).toBeCalled()
})
