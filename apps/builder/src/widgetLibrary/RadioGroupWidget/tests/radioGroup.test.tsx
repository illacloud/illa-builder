import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { WrappedRadioGroup } from "../index"

test("RadioGroup renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedRadioGroup
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
