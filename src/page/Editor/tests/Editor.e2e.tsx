import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("Editor renders correctly", () => {
  mount(<div>1</div>)
  cy.findByText("1").should("exist")
  unmount()
})
