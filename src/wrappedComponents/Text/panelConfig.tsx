import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalStart,
  VerticalStart,
  VerticalCenter,
  VerticalEnd,
} from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"

const AlignmentOptionStyle = {
  fontSize: "16px",
  display: "flex",
  alignItems: "center",
}

export const TEXT_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "text-basic",
    groupName: "BASIC",
    children: [
      {
        id: "text-basic-inputModal",
        labelName: "Value",
        attrName: "disableMarkdown",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: false,
        options: [
          { label: "Markdown", value: true },
          { label: "Plain Text", value: false },
        ],
      },
      {
        id: "text-basic-value",
        attrName: "value",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
        defaultValue: "I'm a text",
      },
    ],
  },
  {
    id: "text-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "text-adornments-startAdornment",
        labelName: "Tooltip",
        labelDesc: "xxxxx",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "text-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "text-layout-col",
        labelName: "Horizontal",
        attrName: "horizontalAlign",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "start",
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
        ],
      },
      {
        id: "text-layout-row",
        labelName: "Vertical",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "verticalAlign",
        defaultValue: "start",
        options: [
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={AlignmentOptionStyle}>
                <VerticalEnd />
              </div>
            ),
            value: "end",
          },
        ],
      },
      {
        id: "text-layout-hidden",
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "text-style",
    groupName: "STYLE",
    children: [
      {
        id: "text-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "text-style-color",
            labelName: "Text",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "textColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "text-style-link-color",
            labelName: "Links",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "linkColor",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
