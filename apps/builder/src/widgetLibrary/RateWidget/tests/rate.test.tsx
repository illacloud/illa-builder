import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedRate } from "../index"

test("WrappedRate renders correctly", () => {
  const handleUpdateDSL = jest.fn()

  render(
    <WrappedRate allowHalf value={2.5} handleUpdateDsl={handleUpdateDSL} />,
  )
  expect(screen.getAllByTitle("StarIcon")?.[0]).toBeInTheDocument()
})
