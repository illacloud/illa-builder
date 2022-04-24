import Label from "../label"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("Trigger renders without padding", () => {
  mount(<Label labelName="testName" labelDesc="testDesc" />)
  cy.findByText("testName").trigger("mouseover")
  cy.findByText("testDesc").should("exist")
  unmount()
})
