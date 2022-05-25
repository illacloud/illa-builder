import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalFullWidth,
  HorizontalStart,
} from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"

const AlignmentOptionStyle = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
}

export const BUTTON_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "button-basic",
    groupName: "BASIC",
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
    groupName: "INTERACTION",
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
    groupName: "ADORNMENTS",
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
    groupName: "LAYOUT",
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
                <HorizontalFullWidth />
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
    groupName: "STYLE",
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
            labelName: "Theme color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
