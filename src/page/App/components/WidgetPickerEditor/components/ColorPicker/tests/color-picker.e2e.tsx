import "@testing-library/cypress"
import { mount, unmount } from "@cypress/react"
import ColorPicker from "../index"
import {
  hexToHsva,
  HsvaColor,
  hsvaToHex,
  hsvaToRgba,
  rgbaToRgb,
} from "@uiw/color-convert"

it("ColorPickerPanel render and close correctly", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("#ffffff").prev().trigger("click")
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
      onColorChange={(hsva) => {
        targetColor = hsva
        onChangeEvent()
      }}
    />,
  )
  cy.findByDisplayValue("#ffffff").prev().trigger("click")
  cy.findByText("edit color")
    .parent()
    .next()
    .trigger("mousedown", 30, 50, { force: true })
  cy.get("@onChangeEvent")
    .should("be.called")
    .wait(100)
    .then(() => {
      const hexStr = hsvaToHex(targetColor)
      cy.findByDisplayValue(hexStr).should("exist")
      const rgbaStr = hsvaToRgba(targetColor)
      let rgbStr = "rgb("
      Object.values(rgbaToRgb(rgbaStr)).forEach((v, i) => {
        rgbStr += v
        if (i < 2) {
          rgbStr += ", "
        }
      })
      rgbStr += ")"

      cy.findByDisplayValue(hexStr)
        .prev()
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

  unmount()
})

it("change alpha by ColorPicker AlphaPicker", () => {
  const onChangeEvent = cy.spy().as("onChangeEvent")
  let targetAlpha: string
  mount(
    <ColorPicker
      onAlphaChange={(newAlpha) => {
        targetAlpha = (newAlpha.a * 100).toFixed(1) + "%"
        onChangeEvent()
      }}
    />,
  )
  cy.findByDisplayValue("#ffffff").prev().trigger("click")
  cy.findByText("edit color")
    .parent()
    .next()
    .next()
    .first()
    .last()
    .children()
    .children()
    .last()
    .first()
    .trigger("mousedown", "center")
  cy.get("@onChangeEvent")
    .should("be.called")
    .wait(100)
    .then(() => {
      cy.findByDisplayValue(targetAlpha).should("exist")
    })
  unmount()
})

it("change alpha by ColorPicker HuePicker", () => {
  const onChangeEvent = cy.spy().as("onChangeEvent")
  let targetColor: HsvaColor
  mount(
    <ColorPicker
      onHueChange={(newHue) => {
        const currentHsva = hexToHsva("#ffffff")
        targetColor = { ...currentHsva, ...newHue }
        onChangeEvent()
      }}
    />,
  )
  cy.findByDisplayValue("#ffffff").prev().trigger("click")
  cy.findByText("edit color")
    .parent()
    .next()
    .next()
    .first()
    .last()
    .children()
    .children()
    .first()
    .first()
    .trigger("mousedown", "center")
  cy.get("@onChangeEvent")
    .should("be.called")
    .wait(100)
    .then(() => {
      const hexStr = hsvaToHex(targetColor)
      cy.findByDisplayValue(hexStr).should("exist")
    })

  unmount()
})

it("change color by ColorPicker SwatchPicker", () => {
  mount(
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyItems: "end",
        alignItems: "end",
      }}
    >
      <div style={{ width: 200 }}>
        <ColorPicker
          color={"#165dff"}
          prefabricatedColors={[
            "#000000",
            "#FFFFFF",
            "#E02424",
            "#FFAB00",
            "#00AA5B",
            "#0CC1E2",
            "#654AEC",
            "#165dff",
          ].map((item) => ({ key: item, value: item }))}
        />
      </div>
    </div>,
  )
  cy.findByDisplayValue("#165dff").prev().trigger("click")
  cy.findByTitle("#165dff").should(
    "have.css",
    "border-color",
    "rgb(29, 33, 41)",
  )
})

it("change alpha by input", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("#ffffff").clear().type("#007a41")
  cy.findByDisplayValue("#007a41")
    .prev()
    .children()
    .should("have.css", "background-color", "rgb(0, 122, 65)")
  unmount()
})

it("change alpha by input invalidly", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("#ffffff").clear().type("#007a41-error").blur()
  cy.findByDisplayValue("#007a41")
    .prev()
    .children()
    .should("have.css", "background-color", "rgb(0, 122, 65)")
  unmount()
})

it("change alpha by input alphaValue", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("100%").clear().type("50%")
  cy.findByDisplayValue("#ffffff")
    .prev()
    .children()
    .should("have.css", "background-color", "rgba(255, 255, 255, 0.5)")
  unmount()
})

it("change alpha by input invalid alphaValue", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("100%").clear().type("error-input").blur()
  cy.findByDisplayValue("#ffffff")
    .prev()
    .children()
    .should("have.css", "background-color", "rgb(255, 255, 255)")
  unmount()
})

it("change alpha by input alphaValue over 1", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("100%").clear().type("155")
  cy.findByDisplayValue("#ffffff")
    .prev()
    .children()
    .should("have.css", "background-color", "rgb(255, 255, 255)")
  unmount()
})

it("change alpha by input alphaValue less-than 0", () => {
  mount(<ColorPicker />)
  cy.findByDisplayValue("100%").clear().type("-15")
  cy.findByDisplayValue("#ffffff")
    .prev()
    .children()
    .should("have.css", "background-color", "rgba(255, 255, 255, 0)")
  unmount()
})
