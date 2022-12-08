import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedImage } from "../index"

test("Image render", () => {
  render(
    <WrappedImage
      height="200px"
      width="200px"
      imageSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    />,
  )
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  )
})

test("Image renders with radius", () => {
  render(
    <WrappedImage
      height="200px"
      width="200px"
      imageSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      radius="20px"
    />,
  )
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  )
  expect(screen.getByRole("img")).toHaveStyle({
    "border-radius": "20px",
  })
})
