import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const DATE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date-basic",
    groupName: "BASIC",
    children: [
      {
        id: "date-basic-DefaultValue",
        labelName: "Default value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-basic-Format",
        labelName: "Format",
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-basic-placeholder",
        labelName: "Placeholder",
        attrName: "placeholder",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-basic-max-date",
        labelName: "Max date",
        attrName: "maxDate",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-basic-min-date",
        labelName: "Min date",
        attrName: "minDate",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-label",
    groupName: "LABEL",
    children: [
      {
        id: "date-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "date-label-alignment",
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
        id: "select-label-labelWidth",
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-interaction",
    groupName: "INTERACTION",
    children: [
      // eventHandle @aoao
      {
        id: "date-interaction-loading",
        labelName: "Loading",
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-interaction-disabled",
        labelName: "Disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-interaction-readonly",
        labelName: "Read only",
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "date-adornments-showClear",
        labelName: "Show clear button",
        attrName: "showClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "date-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "input-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "input-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "input-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "custom rule",
      },
      {
        id: "input-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "date-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "date-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "date-style",
    groupName: "STYLE",
    children: [
      {
        id: "date-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "date-style-bg",
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
