import { render, screen } from "@testing-library/react"
import { WrappedButton } from "../index"
import "@testing-library/jest-dom"
import { Button } from "@illa-design/button/src"

test("WrappedButton renders correctly", () => {
  render(<WrappedButton text={"Button"} />)
  expect(screen.getByText("Button")).toBeInTheDocument()
})

test("WrappedButton renders with colors", () => {
  render(
    <div>
      <WrappedButton text={"Button01"} backgroundColor={"#ffcccc"} />
      <WrappedButton text={"Button02"} textColor={"#ffcccc"} />
      <WrappedButton text={"Button03"} />
      <WrappedButton
        text={"Button04"}
        borderColor={"#ff4d4d"}
        backgroundColor={"#ffcccc"}
        textColor={"#ffffff"}
      />
    </div>,
  )

  expect(screen.getByText("Button01").parentElement).toHaveStyle({
    color: "#ffffff",
    "background-color": "#ffcccc",
  })
  expect(screen.getByText("Button02").parentElement).toHaveStyle({
    color: "#ffcccc",
    "background-color": "rgb(19, 74, 224)",
  })
  expect(screen.getByText("Button03").parentElement).toHaveStyle({
    color: "#ffffff",
    "background-color": "rgb(19, 74, 224)",
  })
  expect(screen.getByText("Button04").parentElement).toHaveStyle({
    color: "#ffffff",
    "border-color": "#ff4d4d",
    "background-color": "#ffcccc",
  })
})
