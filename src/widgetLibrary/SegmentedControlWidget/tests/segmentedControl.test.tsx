import { WrappedSegmentedControl } from "../index"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

test("segmentedControl renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  render(
    <WrappedSegmentedControl
      manualOptions={[
        { label: "1", value: 1 },
        { label: "2", value: 2 },
      ]}
      value={2}
      handleUpdateDsl={handleUpdateDSL}
    />,
  )
  expect(screen.getByText("1")).toBeInTheDocument()
  fireEvent.click(screen.getByDisplayValue("1"))
  expect(handleUpdateDSL).toBeCalled()
})
