import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { HorizontalCenter, HorizontalEnd, HorizontalStart } from "./svg"
import { globalColor, illaPrefix } from "@illa-design/theme"

const AlignmentOptionStyle = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
}

export const ButtonPanelConfig: PanelConfig[] = [
  {
    id: "button-basic",
    groupName: "Basic",
    children: [
      {
        id: "button-basic-Text",
        labelName: "Text",
        attrName: "text",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "button-interaction",
    groupName: "Interaction",
    children: [
      {
        id: "button-interaction-type",
        labelName: "Type",
        labelDesc: "xxxxx",
        attrName: "submit",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Default", value: false },
          { label: "Submit", value: true },
        ],
      },
      {
        id: "button-interaction-formId",
        labelName: "Submit Form",
        labelDesc: "xxxxx",
        attrName: "formId",
        setterType: "INPUT_SETTER",
        bindAttrName: "submit",
        shown: (value) => value === true,
      },
      {
        id: "button-interaction-loading",
        labelName: "Loading",
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
        bindAttrName: "submit",
        shown: (value) => {
          return value === false
        },
      },
      {
        id: "button-interaction-disabled",
        labelName: "Disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        bindAttrName: "submit",
        shown: (value) => value === false,
      },
    ],
  },
  {
    id: "button-adornments",
    groupName: "Adornments",
    children: [
      {
        id: "button-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "button-layout",
    groupName: "Layout",
    children: [
      {
        id: "button-layout-alignment",
        setterType: "RADIO_GROUP_SETTER",
        labelName: "Align",
        attrName: "alignment",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "end",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "fullWidth",
          },
        ],
      },
      {
        id: "button-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "button-style",
    groupName: "Style",
    children: [
      {
        id: "button-style-variant",
        setterType: "RADIO_GROUP_SETTER",
        labelName: "Variant",
        attrName: "variant",
        options: [
          {
            label: <div style={AlignmentOptionStyle}>Solid</div>,
            value: "fill",
          },
          {
            label: <div style={AlignmentOptionStyle}>Outline</div>,
            value: "outline",
          },
        ],
      },
      {
        id: "button-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "button-style-bg",
            labelName: "Background",
            setterType: "INPUT_SETTER",
            attrName: "backGroundColor",
            defaultValue: globalColor(`--${illaPrefix}-blue-01`),
          },
          {
            id: "button-style-labelColor",
            labelName: "Label",
            setterType: "INPUT_SETTER",
            attrName: "textColor",
            defaultValue: globalColor(`--${illaPrefix}-white-01`),
          },
          {
            id: "button-style-border",
            labelName: "Border",
            setterType: "INPUT_SETTER",
            attrName: "borderColor",
            defaultValue: globalColor(`--${illaPrefix}-blue-01`),
          },
        ],
      },
    ],
  },
]
