import { render, screen } from "@testing-library/react"
import { WrappedRate } from "../index"
import "@testing-library/jest-dom"

test("WrappedRate renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedRate
      label="test-value"
      allowHalf
      value={2.5}
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByText("test-value")).toBeInTheDocument()
  expect(screen.getAllByTitle("StarIcon")?.[0]).toBeInTheDocument()
})
