import Label from "../label"
import { act, fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Render Label without description", () => {
  render(<Label labelName="testName" />)
  expect(screen.getByText("testName")).toBeInTheDocument()
})

test("Render Label with description", async () => {
  render(<Label labelName="testName" labelDesc="testDesc" />)
  await act(async () => {
    fireEvent.mouseEnter(screen.getByText("testName"))
    await new Promise((resolve) => setTimeout(resolve, 200))
  })
  expect(screen.getByText("testDesc")).toBeInTheDocument()
})
