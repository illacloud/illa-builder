import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WrappedEditableText } from "../index"
import userEvent from "@testing-library/user-event"
import React from "react"
import { WrappedInputRefType } from "../../Input/interface"

test("WrappedEditableText renders correctly", () => {
  render(<WrappedEditableText value={"test-editable-text"} />)
  expect(screen.getByText("test-editable-text")).toBeInTheDocument()
})

test("WrappedEditableText renders with blur", () => {
  render(
    <WrappedEditableText
      value={"test-editable-text"}
      placeholder={"input-placeholder"}
      label="input"
    />,
  )
  expect(screen.getByText("test-editable-text")).toBeInTheDocument()
  userEvent.click(screen.getByText("test-editable-text"))
  expect(screen.getByPlaceholderText("input-placeholder")).toBeInTheDocument()
  userEvent.click(screen.getByText("input"))
  expect(screen.queryByPlaceholderText("input-placeholder")).toBe(null)
})

test("WrappedEditableText renders correctly when enter", async () => {
  const changeEvent = jest.fn()
  render(
    <WrappedEditableText
      value={"test-editable-text"}
      placeholder={"input-placeholder"}
      onChange={changeEvent}
    />,
  )

  userEvent.click(screen.getByText("test-editable-text"))
  expect(screen.getByPlaceholderText("input-placeholder")).toBeInTheDocument()
  await userEvent.type(
    screen.getByPlaceholderText("input-placeholder"),
    " World!",
  )
  expect(changeEvent).toBeCalled()
})

test("WrappedEditableText renders correctly with prefix and suffix", async () => {
  render(
    <WrappedEditableText
      value={"test-editable-text"}
      prefixIcon={<span>prefixIcon </span>}
      suffixIcon={<span>suffixIcon</span>}
      prefixText={"prefixText"}
      suffixText={"suffixText"}
    />,
  )

  userEvent.click(screen.getByText("test-editable-text"))
  expect(screen.getByText("prefixIcon")).toBeInTheDocument()
  expect(screen.getByText("suffixIcon")).toBeInTheDocument()
  expect(screen.getByText("prefixText")).toBeInTheDocument()
  expect(screen.getByText("suffixText")).toBeInTheDocument()
})

test("WrappedEditableText renders with ref", () => {
  let inputRef: WrappedInputRefType | null
  render(
    <div>
      <WrappedEditableText
        value={"test-editable-text"}
        placeholder={"input-placeholder"}
        ref={(ref) => (inputRef = ref)}
      />
      <button
        onClick={() => {
          inputRef?.focus()
        }}
      >
        click up
      </button>
    </div>,
  )
  expect(screen.queryByPlaceholderText("input-placeholder")).toBe(null)
  fireEvent.click(screen.getByText("click up"))
  expect(screen.queryByPlaceholderText("input-placeholder")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("input-placeholder")).toHaveFocus()
})
