import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { Text } from "../index"

test("Text renders correctly", () => {
  render(<Text value="hello builder" />)
  expect(screen.getByText("hello builder")).toBeInTheDocument()
})

test("Text renders with textColor", () => {
  render(<Text value="hello builder" textColor="#ffb3b3" />)
  expect(screen.getByText("hello builder")).toHaveStyle({
    color: "rgb(255, 179, 179)",
  })
})

test("Text renders with markdown", () => {
  render(
    <Text
      value="**hello builder**<https://github.com/illa-family/illa-builder>"
      disableMarkdown={true}
      linkColor="#ffb3b3"
    />,
  )
  expect(screen.getByText("hello builder")).toHaveStyle({
    "font-weight": "bold",
  })
  expect(
    screen.getByText("https://github.com/illa-family/illa-builder"),
  ).toHaveStyle({
    color: "rgb(255, 179, 179)",
  })
})

test("Text renders with align", () => {
  render(
    <div>
      <Text value="left-top" horizontalAlign="start" verticalAlign="top" />
      <Text value="center" horizontalAlign="center" verticalAlign="center" />
      <Text value="right-bottom" horizontalAlign="end" verticalAlign="bottom" />
    </div>,
  )

  expect(screen.getByText("left-top").parentElement).toHaveStyle({
    "justify-content": "start",
    "align-items": "top",
  })
  expect(screen.getByText("center").parentElement).toHaveStyle({
    "justify-content": "center",
    "align-items": "center",
  })
  expect(screen.getByText("right-bottom").parentElement).toHaveStyle({
    "justify-content": "end",
    "align-items": "bottom",
  })
})
