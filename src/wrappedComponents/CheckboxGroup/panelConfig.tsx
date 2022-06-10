import { PanelConfig } from "@/page/Editor/components/InspectPanel/interface"
import { HorizontalStart, HorizontalEnd } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

const baseWidgetName = "checkboxGroup"
export const CHECKBOX_GROUP_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-options`,
    groupName: "OPTIONS",
    children: [
      {
        id: `${baseWidgetName}-options-mode`,
        isFullWidth: true,
        attrName: "optionMode",
        setterType: "RADIO_GROUP_SETTER",
        defaultValue: "manual",
        options: [
          {
            label: "Manual",
            value: "manual",
          },
          {
            label: "Mapped",
            value: "mapped",
          },
        ],
      },
      {
        id: `${baseWidgetName}-options-options`,
        useCustomLabel: true,
        attrName: "options",
        setterType: "OPTION_LIST_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => !value || value === "manual",
      },
      {
        id: `${baseWidgetName}-options-data-sources`,
        labelName: "data sources",
        isFullWidth: true,
        attrName: "dataSources",
        setterType: "INPUT_SETTER",
        defaultValue: "[]",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: `${baseWidgetName}-options-mapped`,
        labelName: "Mapped option",
        useCustomLabel: true,
        isFullWidth: true,
        attrName: "mappedOption",
        setterType: "OPTION_MAPPED_SETTER",
        bindAttrName: "optionMode",
        shown: (value) => value === "mapped",
      },
      {
        id: `${baseWidgetName}-options-default-value`,
        labelName: "Default value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-label`,
    groupName: "LABEL",
    children: [
      {
        id: `${baseWidgetName}-label-label`,
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-caption`,
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: `${baseWidgetName}-label-position`,
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: `${baseWidgetName}-label-alignment`,
        labelName: "Alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "left",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "right",
          },
        ],
      },
      {
        id: `${baseWidgetName}-label-label-width`,
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-validation`,
    groupName: "VALIDATION",
    children: [
      {
        id: `${baseWidgetName}-validation-required`,
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: `${baseWidgetName}-validation-hide-message`,
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: `${baseWidgetName}-interaction`,
    groupName: "INTERACTION",
    children: [
      {
        id: `${baseWidgetName}-interaction-disabled`,
        labelName: "Disabled",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
        placeholder: "false",
        defaultValue: false,
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: "ADORNMENTS",
    children: [
      {
        id: `${baseWidgetName}-adornments-tooltip`,
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: "LAYOUT",
    children: [
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: "Hidden",
        setterType: "INPUT_SETTER",
        attrName: "hidden",
        placeholder: "false",
      },
      {
        id: `${baseWidgetName}-layout-direction`,
        labelName: "Alignment",
        setterType: "RADIO_GROUP_SETTER",
        attrName: "direction",
        options: ["vertical", "horizontal"],
      },
    ],
  },
]
