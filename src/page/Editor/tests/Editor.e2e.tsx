import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"
// wait to remove
import { WidgetPickerEditor } from "../components/WidgetPickerEditor/index"

it("Editor renders correctly", () => {
  mount(<WidgetPickerEditor />)
  cy.findByText("WidgetPickerEditor").should("exist")
  unmount()
})
