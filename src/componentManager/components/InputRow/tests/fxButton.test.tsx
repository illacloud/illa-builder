import FxButton from "../fxButton"
import { render, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import { globalColor, illaPrefix } from "@illa-design/theme"

const mockFn = jest.fn()

test("Render FxButton", () => {
  const { container } = render(
    <FxButton
      isCustom={false}
      updateCustomModal={mockFn}
      data-testid="test-fx"
    />,
  )
  expect(container.firstChild?.firstChild?.firstChild).toHaveStyle({
    fill: `${globalColor(`--${illaPrefix}-grayblue-06`)}`,
  })
  fireEvent.click(container.firstChild?.firstChild!)
  expect(mockFn).toHaveBeenCalled()
})

test("Render FxButton with Custom", () => {
  const { container } = render(
    <FxButton isCustom updateCustomModal={mockFn} data-testid="test-fx" />,
  )
  expect(container.firstChild?.firstChild?.firstChild).toHaveStyle({
    fill: `${globalColor(`--${illaPrefix}-purple-01`)}`,
  })
})
