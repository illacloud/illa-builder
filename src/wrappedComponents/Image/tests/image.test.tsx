import { WrappedImage } from "../index"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("Image render", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedImage
      height="200px"
      width="200px"
      fallbackSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      handleUpdateDsl={handleUpdateDSL}
      radius="20"
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

test("Image render with radius", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedImage
      height="200px"
      width="200px"
      fallbackSrc="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
      handleUpdateDsl={handleUpdateDSL}
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
