import SwitchInput from "../switchInput"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"
import { globalColor, illaPrefix } from "@illa-design/theme"

it("Render SwitchInput without custom", () => {
  mount(<SwitchInput labelName="testName" />)
  cy.findByText("testName").should("exist")
  cy.get("button").should("exist")
  unmount()
})

it("Render custom SwitchInput", () => {
  mount(<SwitchInput labelName="testName" canCustom />)
  cy.findByText("testName").should("exist")
  cy.get("button").should("exist")
  cy.get("button").click()
  cy.get("svg").should("exist")
  cy.get("svg").parent().click()
  cy.get("input").should("exist")
  unmount()
})

it("Custom SwitchInput Action", () => {
  mount(<SwitchInput labelName="testName" canCustom />)
  cy.get("svg").parent().click()
  cy.get("input").type("testInput")
  cy.findByDisplayValue("testInput").should("exist")
})
