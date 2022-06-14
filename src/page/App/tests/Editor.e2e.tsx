import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("Editor renders correctly", () => {
  mount(<div>WidgetPickerEditor</div>)
  cy.findByText("WidgetPickerEditor").should("exist")
  unmount()
})
