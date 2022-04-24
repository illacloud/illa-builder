import Label from "../label"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Render Label without description", () => {
  render(<Label labelName="testName" />)
  expect(screen.getByText("testName")).toBeInTheDocument()
})
