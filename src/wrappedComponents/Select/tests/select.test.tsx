import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { WrappedSelect } from "../index"
const options = [
  "Beijing",
  "Shanghai",
  "Guangzhou",
  "Shenzhen",
  "Chengdu",
  "Wuhan",
]

test("Text renders correctly", () => {
  const handleChange = jest.fn()
  render(
    <WrappedSelect
      required
      value="Beijing"
      label="select"
      placeholder="test-WrappedSelect"
      labelPosition="left"
      options={options}
      handleUpdateDsl={handleChange}
    />,
  )
  expect(screen.getByText("Beijing")).toBeInTheDocument()
})
