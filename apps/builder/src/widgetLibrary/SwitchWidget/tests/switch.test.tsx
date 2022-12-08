import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import { WrappedSwitch } from "../index"

test("switch renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  const handleOnChange = jest.fn()
  render(
    <WrappedSwitch
      handleUpdateDsl={handleUpdateDSL}
      handleOnChange={handleOnChange}
    />,
  )
  expect(screen.getByRole("button")).toBeInTheDocument()
  fireEvent.click(screen.getByRole("button"))
  expect(handleUpdateDSL).toBeCalled()
  expect(handleOnChange).toBeCalled()
})
