import { css } from "@emotion/react"
import { getColor } from "@illa-design/react"

const fontStyle = css`
  font-weight: 500;
  font-size: 14px !important;
  color: ${getColor("grayBlue", "02")};
  line-height: 22px;
`

const modelContainerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
  background-color: ${getColor("white", "01")};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.08);
  border-radius: 4px;
  ${fontStyle};
`

const inputStyle = css`
  padding: 5px 16px;
  width: 100%;
  height: 32px;
  border: 1px solid ${getColor("grayBlue", "08")};
  border-radius: 8px;
  ${fontStyle};
`

const buttonStyle = css`
  margin: 0;
  font-family: "SF Pro Text";
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 5px 16px;
  border-radius: 8px;
  height: 32px;
`

const modelHeaderStyle = css`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 54px;
  position: relative;
  margin: 0;
  border-bottom: 1px solid ${getColor("grayBlue", "08")};
`
const buttonGroupStyle = css`
  button {
    ${buttonStyle}
  }
  button:last-of-type {
    order: 2;
    color: ${getColor("grayBlue", "02")};
    background-color: ${getColor("grayBlue", "09")};
  }
  button:last-of-type:hover,
  button:last-of-type:active {
    background-color: ${getColor("grayBlue", "08")};
  }
  button:disabled {
    background-color: ${getColor("blue", "05")} !important;
  }
  button:first-of-type {
    order: 1;
    color: ${getColor("white", "01")};
    background-color: ${getColor("blue", "01")};
  }
  button:first-of-type:hover,
  button:first-of-type:active {
    background-color: ${getColor("blue", "02")};
  }
  button:active,
  button:hover {
    box-shadow: none;
  }
`

const modelButtonStyle = css`
  display: flex;
  width: 100%;
  height: 80px;
  padding: 24px;
  justify-content: flex-end;
  align-items: center;
  margin: 0;
  flex-direction: row;
  gap: 8px;
  ${buttonGroupStyle};
`

export const containerStyle = css`
  height: 100%;
  cursor: auto;
  overflow-x: auto;
  figure {
    margin: 8px;
  }
  & {
    .rdw-image-mandatory-sign {
      display: none;
    }
    .wrapperClassName {
      height: 100%;
      display: flex;
      flex-direction: column;
      min-width: 420px;
    }
    .toolbarClassName {
      height: 100px;
      min-width: 200px;
      flex: 0;
      padding: 8px;
    }
    .toolbarClassName > div {
      height: auto;
      width: auto;
    }
    .editorClassName {
      border: 1px solid ${getColor("grayBlue", "08")};
      padding: 0 8px;
      height: auto;
      cursor: text;
      flex-grow: 1;
    }
    .rdw-embedded-modal {
      height: auto;
    }
    .rdw-fontsize-dropdown {
      width: 50px;
    }
    .rdw-dropdown-carettoclose,
    .rdw-dropdown-carettoopen {
      height: 7px;
      width: 7px;
      position: static;
    }
    .rdw-dropdown-carettoopen {
      border-top: transparent;
      border-right: transparent;
      border-left: 1px solid ${getColor("grayBlue", "02")};
      border-bottom: 1px solid ${getColor("grayBlue", "02")};
      transform: rotate(-45deg) translateY(-45%);
    }
    .rdw-dropdown-carettoclose {
      border-top: 1px solid ${getColor("grayBlue", "02")};
      border-right: 1px solid ${getColor("grayBlue", "02")};
      border-left: transparent;
      border-bottom: transparent;
      transform: rotate(-45deg) translateX(-50%);
    }
    .rdw-dropdown-wrapper,
    .rdw-option-wrapper,
    .rdw-dropdown-optionwrapper {
      box-shadow: none;
    }
    .rdw-dropdown-optionwrapper {
      width: 50px;
      margin-left: -8px;
    }
    .blockType .rdw-dropdown-optionwrapper {
      width: 110px;
      overflow: hidden;
      margin-left: -8px;
    }
    .rdw-dropdown-optionwrapper {
      padding: 4px 8px;
    }
    .rdw-option-wrapper {
      border: none;
      margin: 0;
    }
    .rdw-dropdown-wrapper {
      padding: 4px 8px;
      border: 1px solid ${getColor("grayBlue", "08")};
      border-radius: 4px;
      margin: 0;
      margin-right: 8px;
    }
    .rdw-dropdown-selectedtext {
      padding: 0;
      font-size: 14px;
      line-height: 140%;
      color: ${getColor("grayBlue", "02")};
      justify-content: space-between;
    }
    .rdw-option-wrapper {
      padding: 0 4px;
      margin-right: 8px;
    }
    .rdw-option-active {
    }
    .rdw-image-imagewrapper {
      width: 100%;
    }
    .rdw-colorpicker-wrapper {
      margin-right: 8px;
      position: relative;
      width: 37px !important;
    }
    .rdw-colorpicker-wrapper .rdw-option-wrapper {
      padding: 0;
      margin: 0;
      height: 20px;
      width: 20px;
      min-width: 20px;
      background-color: black;
      border-radius: 4px;
    }
    .rdw-colorpicker-wrapper img {
      position: absolute;
      right: 1px;
      display: inline-block;
      height: 7px;
      width: 7px;
      border-top: transparent;
      border-right: transparent;
      border-left: 1px solid ${getColor("grayBlue", "02")};
      border-bottom: 1px solid ${getColor("grayBlue", "02")};
      transform: rotate(-45deg) translateY(-45%);
    }
    .linkPopup {
      ${modelContainerStyle};
      height: 290px;
      padding: 24px 24px 8px;
      font-family: "Helvetica Neue";
      .rdw-link-modal-input {
        ${inputStyle};
        margin: 8px 0 16px;
      }
      .rdw-link-modal-target-option {
        display: flex;
        flex-direction: row;
        gap: 8px;
        padding: 0;
        align-items: center;
        font-weight: 400;
      }
      .rdw-link-modal-target-option > input {
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 2px solid ${getColor("grayBlue", "08")} !important;
        border-radius: 2px;
        margin: 0;
      }
      .rdw-link-modal-target-option > span {
        margin: 0;
      }
      .rdw-link-modal-buttonsection {
        display: flex;
        width: 100%;
        height: 32px;
        gap: 8px;
        justify-content: flex-end;
        ${buttonGroupStyle};
      }
    }
    .imagePopup {
      ${modelContainerStyle};
      padding: 0;
      .rdw-image-modal-header {
        ${modelHeaderStyle};
        order: 1;
      }
      .rdw-image-modal-header-option {
        height: 100%;
        width: 85px;
        padding: 16px 0;
        margin-left: 32px;
        justify-content: space-between;
      }
      .rdw-image-modal-header-option:first-of-type {
        margin-left: 24px;
      }
      .rdw-image-modal-header-label {
        border: 1px solid transparent;
        background-color: transparent;
      }
      .rdw-image-modal-header-label-highlighted {
        border: 1px solid ${getColor("grayBlue", "02")};
        position: absolute;
        bottom: 1px;
      }
      div:nth-of-type(2) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 24px;
        width: 100%;
        order: 2;
      }
      .rdw-image-modal-upload-option {
        margin: 0;
        width: 100%;
        box-sizing: border-box;
        min-height: 120px;
        background-color: ${getColor("grayBlue", "09")};
        color: ${getColor("grayBlue", "04")};
      }
      .rdw-image-modal-url-input {
        margin: 0;
        ${inputStyle};
      }
      .rdw-image-modal-url-section span {
        display: none;
      }
      .rdw-image-modal-size {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        padding: 0 24px;
        width: 100%;
        margin: 0;
      }
      div:nth-of-type(3) {
        order: 4;
        flex-direction: column;
        margin-top: 24px;
        padding: 0 24px;
        justify-content: center;
        align-items: flex-start;
      }
      .rdw-image-modal-alt-lbl {
        font-size: 14px;
        color: ${getColor("grayBlue", "02")};
      }
      .rdw-image-modal-alt-input {
        ${inputStyle};
        margin: 0;
        margin-top: 8px;
      }
      div:nth-of-type(4) {
        font-size: 0;
        order: 3;
        height: 62px;
        position: relative;
        align-items: flex-end;
        justify-content: space-between;
      }
      .rdw-image-modal-size-input {
        box-sizing: border-box;
        ${inputStyle};
        width: 50%;
      }
      .rdw-image-modal-size-input:first-of-type {
        margin-right: 8px;
      }
      div:nth-of-type(4)::before {
        width: 32px;
        height: 22px;
        font-size: 14px;
        color: ${getColor("grayBlue", "02")};
        position: absolute;
        display: inline-block;
        content: "H";
        top: 0;
      }
      div:nth-of-type(4)::after {
        width: 32px;
        height: 22px;
        font-size: 14px;
        position: absolute;
        display: inline-block;
        color: ${getColor("grayBlue", "02")};
        content: "W";
        top: 0;
        left: 50%;
        transform: translateX(10%);
      }
      .rdw-image-modal-btn-section {
        order: 5;
        ${modelButtonStyle};
      }
    }
    .colorPopup {
      ${modelContainerStyle};
      width: 300px;
      padding: 0;
      .rdw-colorpicker-modal-options {
        overflow: auto;
      }
      .rdw-colorpicker-modal-header {
        padding: 0;
        width: 100%;
        height: 54px;
        border-bottom: 1px solid ${getColor("grayBlue", "08")};
      }
      .rdw-colorpicker-modal-style-label {
        width: 80px;
        padding: 16px 0;
        height: 100%;
      }
      .rdw-colorpicker-modal-style-label-active {
        border-bottom: 2px solid ${getColor("grayBlue", "02")};
      }
      .rdw-colorpicker-modal-options {
        margin: 0;
        padding: 16px 24px;
      }
    }
    .embeddedPopup {
      ${modelContainerStyle};
      padding: 0;
      .rdw-embedded-modal-header {
        width: 100%;
      }
      .rdw-embedded-modal-header {
        ${modelHeaderStyle};
      }
      .rdw-embedded-modal-header-option {
        height: 100%;
        width: 85px;
        padding: 16px 0;
        margin-left: 24px;
        justify-content: space-between;
      }
      .rdw-embedded-modal-header-label {
        border: 1px solid ${getColor("grayBlue", "02")};
        position: absolute;
        bottom: 1px;
      }
      .rdw-embedded-modal-link-section {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: 100%;
        gap: 24px;
        padding: 16px 0 0;
        margin: 0;
      }
      .rdw-embedded-modal-link-input-wrapper {
        order: 2;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 0 24px;
      }
      .rdw-embedded-modal-link-input {
        ${inputStyle};
        margin: 0;
      }
      .rdw-embedded-modal-size {
        margin: 0;
        width: 100%;
        display: flex;
        padding: 0 24px;
        height: 62px;
        position: relative;
        align-items: flex-end;
        gap: 8px;
        justify-content: space-between;
      }
      .rdw-embedded-modal-size > span {
        width: 100%;
      }
      .rdw-embedded-modal-size-input {
        ${inputStyle};
      }
      .rdw-embedded-modal-size::before {
        width: 32px;
        height: 22px;
        font-size: 14px;
        color: ${getColor("grayBlue", "02")};
        position: absolute;
        display: inline-block;
        content: "H";
        top: 0;
      }
      .rdw-embedded-modal-size::after {
        width: 32px;
        height: 22px;
        font-size: 14px;
        position: absolute;
        display: inline-block;
        color: ${getColor("grayBlue", "02")};
        content: "W";
        top: 0;
        left: 50%;
        transform: translateX(10%);
      }
      .rdw-embedded-modal-btn-section {
        ${modelButtonStyle};
      }
    }
  }
`
