import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { handleValidateCheck } from "../utils"
import { InvalidMessage } from "../index"

test("WrappedInput renders correctly", () => {
  render(<InvalidMessage value="" required />)
  expect(screen.getByText("This field is required")).toBeInTheDocument()
})

test("handleValidateCheck successfully", () => {
  expect(handleValidateCheck({ value: "", required: true })).toBe(
    "This field is required",
  )
  expect(handleValidateCheck({ value: "xxxxxx", maxLength: 5 })).toBe(
    "Must be no more than 5 characters",
  )
  expect(handleValidateCheck({ value: "xxxx", minLength: 5 })).toBe(
    "Must be at least 5 characters",
  )
  expect(
    handleValidateCheck({ value: "xxxxx", maxLength: 5, minLength: 4 }),
  ).toBe(undefined)

  expect(handleValidateCheck({ value: "xxxx", pattern: "URL" })).toBe(
    "Please enter a valid URL",
  )
  expect(
    handleValidateCheck({
      value: "https://github.com/illa-family/illa-builder",
      pattern: "URL",
    }),
  ).toBe(undefined)
  expect(handleValidateCheck({ value: "xxxx", pattern: "Email" })).toBe(
    "Please enter a valid email address",
  )
  expect(
    handleValidateCheck({ value: "opensource@illasoft.com", pattern: "Email" }),
  ).toBe(undefined)
  expect(
    handleValidateCheck({
      value: "illa-builder",
      pattern: "Regex",
      regex: "^.*\\d{3}.*$",
    }),
  ).toBe("Please match the requested format")
  expect(
    handleValidateCheck({
      value: "123",
      pattern: "Regex",
      regex: "^.*\\d{3}.*$",
    }),
  ).toBe(undefined)
})
