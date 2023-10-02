import i18n from "@/i18n/config"

export enum SHADOW_VALUE {
  NONE = "none",
  LARGE = "large",
  MEDIUM = "medium",
  SMALL = "small",
}

export const SHADOW_OPTIONS = [
  {
    label: i18n.t("editor.inspect.setter_option.shadow.none"),
    value: SHADOW_VALUE.NONE,
  },
  {
    label: i18n.t("editor.inspect.setter_option.shadow.large"),
    value: SHADOW_VALUE.LARGE,
  },
  {
    label: i18n.t("editor.inspect.setter_option.shadow.medium"),
    value: SHADOW_VALUE.MEDIUM,
  },
  {
    label: i18n.t("editor.inspect.setter_option.shadow.small"),
    value: SHADOW_VALUE.SMALL,
  },
]
