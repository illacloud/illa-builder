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
  render(
    <WrappedSelect
      required={true}
      defaultValue={"Beijing"}
      label="select"
      placeholder={"test-WrappedSelect"}
      labelPosition="left"
      readOnly={true}
      options={options}
    />,
  )
  expect(screen.getByText("Beijing")).toBeInTheDocument()
  expect(screen.getByPlaceholderText("test-WrappedSelect")).toBeDisabled()
})
