import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Label from "../index"

test("Render basic Label", () => {
  render(<Label label="testLabel" />)
  expect(screen.getByText("testLabel")).toBeInTheDocument()
})

test("Render Label Caption", () => {
  render(<Label label="testLabel" labelCaption="testCaption" />)
  expect(screen.getByText("testLabel")).toBeInTheDocument()
  expect(screen.getByText("testCaption")).toBeInTheDocument()
})

test("Render with required", () => {
  render(<Label label="testLabel" required />)
  expect(screen.getByText("*")).toBeInTheDocument()
})

test("Render with labelAlign and labelPosition", () => {
  render(<Label label="testLabel" labelAlign="right" labelPosition="top" />)
  const labelWrapper = screen.getByText("testLabel").parentElement
  expect(labelWrapper).toHaveStyle("text-align: right")
  expect(labelWrapper).toHaveStyle("margin-bottom: 8px")
})
