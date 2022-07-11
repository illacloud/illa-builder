import { render, screen } from "@testing-library/react"
import { WrappedDateTime } from "../index"
import "@testing-library/jest-dom"

test("WrappedDateTime renders correctly", () => {
  const handleUpdateDSL = jest.fn()
  const handleUpdateGlobal = jest.fn()
  const handleDeleteGlobal = jest.fn()
  render(
    <WrappedDateTime
      placeholder={"2022-06-01"}
      handleUpdateDsl={handleUpdateDSL}
      handleDeleteGlobalData={handleDeleteGlobal}
      handleUpdateGlobalData={handleUpdateGlobal}
      displayName="test-dateTime"
    />,
  )
  expect(screen.getByPlaceholderText("2022-06-01")).toBeInTheDocument()
})
