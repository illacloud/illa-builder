import App from "../App"
import { mount, unmount } from "@cypress/react"
import "@testing-library/cypress"

it("onSelect", () => {
  mount(<App />)
  cy.findByText("Hello App").should("exist")
  unmount()
})
