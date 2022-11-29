import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Label } from "../index"

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
