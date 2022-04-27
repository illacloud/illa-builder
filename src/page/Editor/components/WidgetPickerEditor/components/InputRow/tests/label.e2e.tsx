import Label from "../label"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("Render Label without description", () => {
  mount(<Label labelName="testName" />)
  cy.findByText("testName").should("exist")
  unmount()
})

it("Render Label with description", () => {
  mount(<Label labelName="testName" labelDesc="testDesc" />)
  cy.findByText("testName").trigger("mouseover")
  cy.findByText("testDesc").should("exist")
  unmount()
})
