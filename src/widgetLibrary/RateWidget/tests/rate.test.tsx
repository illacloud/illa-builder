import { render, screen } from "@testing-library/react"
import { WrappedRate } from "../index"
import "@testing-library/jest-dom"

test("WrappedRate renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  const handleUpdateGlobal = jest.fn()
  const handleDeleteGlobal = jest.fn()

  render(
    <WrappedRate
      allowHalf
      value={2.5}
      handleUpdateDsl={handleUpdateDSL}
      handleDeleteGlobalData={handleDeleteGlobal}
      handleUpdateGlobalData={handleUpdateGlobal}
      displayName="test-rate"
    />,
  )
  expect(screen.getAllByTitle("StarIcon")?.[0]).toBeInTheDocument()
})
