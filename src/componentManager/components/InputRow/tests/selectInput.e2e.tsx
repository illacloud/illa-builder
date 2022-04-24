import SelectInput from "../selectInput"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

const cities = [
  { key: "Beijing", value: "Beijing" },
  { key: "Shanghai", value: "Shanghai" },
  { key: "Shenzhen", value: "Shenzhen" },
  { key: "Guangzhou", value: "Guangzhou" },
  { key: "Chengdu", value: "Chengdu" },
  { key: "Chongqing", value: "Chongqing" },
]

it("Render SelectInput Component without custom and select", () => {
  mount(<SelectInput labelName="testName" options={cities} value="Beijing" />)
  cy.findByText("testName").should("exist")
  cy.findByText("Beijing").parent().click()
  cy.findByText("Shenzhen").should("exist")
  cy.findByText("Chengdu").click()
  cy.findByText("Chengdu").should("exist")
  unmount()
})

it("Render SelectInput Component with custom", () => {
  mount(
    <SelectInput
      labelName="testName"
      options={cities}
      value="Beijing"
      canCustom
    />,
  )
  cy.findByText("testName")
    .parent()
    .parent()
    .last()
    .children()
    .should("have.length", 2)
  unmount()
})

it("Render SelectInput Component with Click custom button", () => {
  mount(
    <SelectInput
      labelName="testName"
      options={cities}
      value="Beijing"
      canCustom
    />,
  )
  cy.findByText("testName").parent().as("oldLabelWrapper")
  cy.get("@oldLabelWrapper")
    .parent()
    .children()
    .last()
    .children()
    .first()
    .click()
  cy.findByText("testName").parent().as("newLabelWrapper")
  cy.get("@newLabelWrapper").children().should("have.length", 2)
  cy.get("@newLabelWrapper").parent().children().should("have.length", 2)
  cy.get("@newLabelWrapper")
    .parent()
    .children()
    .last()
    .children()
    .should("have.length", 1)
  unmount()
})

it("Render SelectInput Component with Click custom button", () => {
  mount(
    <SelectInput
      labelName="testName"
      options={cities}
      canCustom
    />,
  )
  const oldLabelWrapper = cy.findByText("testName").parent()
  oldLabelWrapper.parent().children().last().children().first().click()
  cy.get("input").should("exist")
  cy.get("input").type("testInput")
  cy.findByDisplayValue("testInput").should("exist")
  unmount()
})
