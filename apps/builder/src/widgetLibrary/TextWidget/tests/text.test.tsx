import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { Text } from "../index"

test("Text renders correctly", () => {
  render(<Text value="hello builder" />)
  expect(screen.getByText("hello builder")).toBeInTheDocument()
})

test("Text renders with textColor", () => {
  render(<Text value="hello builder" textColor="purple" />)
  expect(screen.getByText("hello builder")).toHaveStyle({
    color: "#833fdf",
  })
})

test("Text renders with markdown", () => {
  render(
    <Text
      value="**hello builder**<https://github.com/illacloud/illa-builder>"
      disableMarkdown={true}
      linkColor="purple"
    />,
  )
  expect(screen.getByText("hello builder")).toHaveStyle({
    "font-weight": "bold",
  })
  expect(
    screen.getByText("https://github.com/illacloud/illa-builder"),
  ).toHaveStyle({
    color: "#833fdf",
  })
})

test("Text renders with align", () => {
  render(
    <div>
      <Text value="left-top" horizontalAlign="start" verticalAlign="start" />
      <Text value="center" horizontalAlign="center" verticalAlign="center" />
      <Text value="right-bottom" horizontalAlign="end" verticalAlign="end" />
    </div>,
  )

  expect(screen.getByText("left-top").parentElement).toHaveStyle({
    "justify-content": "start",
    "align-items": "start",
  })
  expect(screen.getByText("center").parentElement).toHaveStyle({
    "justify-content": "center",
    "align-items": "center",
  })
  expect(screen.getByText("right-bottom").parentElement).toHaveStyle({
    "justify-content": "end",
    "align-items": "end",
  })
})
