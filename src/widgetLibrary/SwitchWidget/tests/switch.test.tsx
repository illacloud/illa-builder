import { WrappedSwitch } from "../index"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("switch renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  const handleOnChange = jest.fn()
  const handleUpdateGlobal = jest.fn()
  const handleDeleteGlobal = jest.fn()
  render(
    <WrappedSwitch
      handleUpdateDsl={handleUpdateDSL}
      handleOnChange={handleOnChange}
      handleUpdateGlobalData={handleUpdateGlobal}
      handleDeleteGlobalData={handleDeleteGlobal}
      displayName="test-switch"
    />,
  )
  expect(screen.getByRole("button")).toBeInTheDocument()
  fireEvent.click(screen.getByRole("button"))
  expect(handleUpdateDSL).toBeCalled()
  expect(handleOnChange).toBeCalled()
})
