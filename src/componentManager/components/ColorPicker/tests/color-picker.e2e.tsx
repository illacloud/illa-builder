import "@testing-library/cypress"
import { mount, unmount } from "@cypress/react"
import ColorPicker from "../index"
import { HsvaColor, hsvaToHex, hsvaToRgba } from "@uiw/color-convert"

it("ColorPicker renders correctly", () => {
  mount(<ColorPicker labelName={"ColorPicker"} />)
  cy.findByText("ColorPicker").should("exist")
  unmount()
})

it("ColorPickerPanel render and close correctly", () => {
  mount(<ColorPicker labelName={"ColorPicker"} />)
  cy.findByText("ColorPicker").next().trigger("click")
  cy.findByText("Prefabricated color").should("exist")
  cy.findByTitle("CloseIcon").parent().trigger("click")
  cy.findByText("Prefabricated color").should("not.exist")
  unmount()
})

it("change color by ColorPicker Saturation", () => {
  const onChangeEvent = cy.spy().as("onChangeEvent")
  let targetColor: HsvaColor
  mount(
    <ColorPicker
      labelName={"ColorPicker"}
      onColorChange={(hsva) => {
        targetColor = hsva
        onChangeEvent()
      }}
    />,
  )
  cy.findByText("ColorPicker").next().trigger("click")
  cy.findByText("edit color").parent().next().trigger("mousedown", 30, 50)
  cy.get("@onChangeEvent")
    .should("be.called")
    .then(() => {
      const hexStr = hsvaToHex(targetColor)
      cy.findByDisplayValue(hexStr).should("exist")
      const rgbStr = hsvaToRgba(targetColor)
      cy.findByText("ColorPicker")
        .next()
        .children()
        .should("have.css", "background-color", rgbStr)
      cy.findByText("edit color")
        .parent()
        .next()
        .next()
        .first()
        .last()
        .children()
        .last()
        .should("have.css", "background-color", rgbStr)
    })
  cy.findByText("edit color")
    .parent()
    .next()
    .next()
    .first()
    .last()
    .children()
    .last()
    .should("have.css", "background-color", `rgb(180, 157, 157)`)
  unmount()
})

// it("change alpha by ColorPicker AlphaPicker", () => {
//   mount(<ColorPicker labelName={"ColorPicker"} />)
//   cy.findByText("ColorPicker").next().trigger("click")
//   cy.findByText("edit color")
//     .parent()
//     .next()
//     .next()
//     .first()
//     .last()
//     .children()
//     .children()
//     .last()
//     .first()
//     .trigger("mousedown", "center")
//   cy.findByDisplayValue("49.6%").should("exist")
//   unmount()
// })

it("change color by ColorPicker SwatchPicker", () => {
  mount(
    <ColorPicker
      labelName={"ColorPicker"}
      prefabricatedColors={[
        "#000000",
        "#FFFFFF",
        "#E02424",
        "#FFAB00",
        "#00AA5B",
        "#0CC1E2",
        "#654AEC",
        "#1E6FFF",
      ]}
    />,
  )
  cy.findByText("ColorPicker").next().trigger("click")
  cy.findByText("Prefabricated color")
    .next()
    .children()
    .first()
    .next()
    .next()
    .trigger("click")
  cy.findByDisplayValue("#e02424").should("exist")
  cy.findByText("ColorPicker")
    .next()
    .children()
    .should("have.css", "background-color", "rgb(224, 36, 36)")
  unmount()
})
