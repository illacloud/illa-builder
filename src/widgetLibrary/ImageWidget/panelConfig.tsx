import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"

export const IMAGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "image-basic",
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: "image-basic-source",
        attrName: "imageSrc",
        expectedType: VALIDATION_TYPES.STRING,
        labelName: i18n.t("editor.inspect.setter_label.image_source"),
        isSetterSingleRow: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-basic-alt-text",
        labelName: i18n.t("editor.inspect.setter_label.alt_text"),
        labelDesc: i18n.t("editor.inspect.setter_label.alt_text_desc"),
        expectedType: VALIDATION_TYPES.STRING,
        attrName: "altText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: "image-Interaction",
  //   groupName: i18n.t("editor.inspect.setter_group.interaction")
  //   children: [
  //     {
  //       id: "image-interaction-event",
  //       attrName: "events",
  //       setterType: "EVENT_HANDLER_SETTER",
  //       useCustomLayout: true,
  //       isSetterSingleRow: true,
  //     },
  //   ],
  // },
  {
    id: "image-adornments",
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: "image-adornments-tooltip",
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "image-layout",
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: "image-layout-height",
        labelName: i18n.t("editor.inspect.setter_label.img_height"),
        attrName: "height",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-width",
        labelName: i18n.t("editor.inspect.setter_label.img_width"),
        attrName: "width",
        expectedType: VALIDATION_TYPES.STRING,
        setterType: "INPUT_SETTER",
      },
      {
        id: "image-layout-hidden",
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        labelDescOption: { name: "imageName" },
        attrName: "hidden",
        expectedType: VALIDATION_TYPES.BOOLEAN,
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLayout: true,
      },
    ],
  },
  {
    id: "image-style",
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: "date-style-list",
        setterType: "LIST_SETTER",
        isSetterSingleRow: true,
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "image-style-radius",
            labelName: i18n.t("editor.inspect.setter_label.radius"),
            setterType: "INPUT_SETTER",
            attrName: "radius",
            defaultValue: "0px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
