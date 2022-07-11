import { WrappedInputNumber } from "../index"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Input Number renders correctly", async () => {
  const handleUpdateDSL = jest.fn()

  render(
    <WrappedInputNumber
      placeholder="test-mode"
      handleUpdateDsl={handleUpdateDSL}
      handleDeleteGlobalData={() => {}}
      handleUpdateGlobalData={() => {}}
      displayName=""
    />,
  )
  expect(screen.getByPlaceholderText("test-mode")).toBeInTheDocument()
})

test("Input Number thousandSeparator", async () => {
  const handleUpdateDSL = jest.fn()

  render(
    <WrappedInputNumber
      value={11111}
      handleUpdateDsl={handleUpdateDSL}
      openThousandSeparator
      handleDeleteGlobalData={() => {}}
      handleUpdateGlobalData={() => {}}
      displayName=""
    />,
  )
  expect(screen.getByDisplayValue("111,11")).toBeInTheDocument()
})

test("Input Number onChange", async () => {
  const handleUpdateDSL = jest.fn()

  render(
    <WrappedInputNumber
      placeholder="test-mode"
      handleUpdateDsl={handleUpdateDSL}
      openThousandSeparator
      handleDeleteGlobalData={() => {}}
      handleUpdateGlobalData={() => {}}
      displayName=""
    />,
  )
  const input = screen.getByPlaceholderText("test-mode")
  fireEvent.change(input, { target: { value: 1 } })
  fireEvent.blur(input)

  await waitFor(() => {
    expect(handleUpdateDSL).toBeCalled()
  })
})

test("Input Number loading", async () => {
  const handleUpdateDSL = jest.fn()

  render(
    <WrappedInputNumber
      placeholder="test-mode"
      handleUpdateDsl={handleUpdateDSL}
      loading
      handleDeleteGlobalData={() => {}}
      handleUpdateGlobalData={() => {}}
      displayName=""
    />,
  )
  expect(screen.getByTitle("LoadingIcon"))
})
