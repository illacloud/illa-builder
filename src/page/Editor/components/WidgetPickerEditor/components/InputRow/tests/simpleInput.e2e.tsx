import SimpleInput from "../simpleInput"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("Render single SimpleInput", () => {
  mount(<SimpleInput labelName="testName" />)
  cy.findByText("testName").should("exist")
  cy.get("input").should("exist")
  cy.findByText("testName")
    .parent()
    .parent()
    .children()
    .should("have.length", 2)
  cy.findByText("testName")
    .parent()
    .parent()
    .should("have.css", "display", "flex")
  unmount()
})

it("Type some string in SimpleInput", () => {
  mount(<SimpleInput labelName="testName" />)
  cy.get("input").should("exist")
  cy.get("input").type("test");
  cy.findByDisplayValue("test").should("exist")
  unmount()
})

it("Render double SimpleInput", () => {
  mount(<SimpleInput labelName="testName" isDoubleRow />)
  cy.findByText("testName").should("exist")
  cy.get("input").should("exist")
  cy.findByText("testName")
    .parent()
    .parent()
    .children()
    .should("have.length", 2)
  cy.findByText("testName")
    .parent()
    .parent()
    .should("not.have.css", "display", "flex")
  unmount()
})