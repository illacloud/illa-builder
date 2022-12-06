import "@testing-library/jest-dom"
import { render, screen } from "@testing-library/react"
import { WrappedSelect } from "../index"

const options = [
  "Beijing",
  "Shanghai",
  "Guangzhou",
  "Shenzhen",
  "Chengdu",
  "Wuhan",
]

test("select renders correctly", () => {
  const handleChange = jest.fn()
  render(
    <WrappedSelect
      required
      value="Beijing"
      placeholder="test-WrappedSelect"
      options={options}
      handleUpdateDsl={handleChange}
    />,
  )
  expect(screen.getByDisplayValue("Beijing")).toBeInTheDocument()
})
