import {
  csCZ,
  daDK,
  deDE,
  elGR,
  enUS,
  esES,
  fiFI,
  frFR,
  itIT,
  jaJP,
  koKR,
  nlNL,
  plPL,
  ptPT,
  roRO,
  ruRU,
  svSE,
  ukUA,
  zhCN,
} from "@mui/x-data-grid-premium"

export function getDataGridLocalization() {
  const currentLng = window.localStorage.getItem("i18nextLng") ?? "en-US"
  const localizationMap = {
    "en-US": enUS,
    "zh-CN": zhCN,
    "ja-JP": jaJP,
    "ko-KR": koKR,
    "cs-CZ": csCZ,
    "da-DK": daDK,
    "de-DE": deDE,
    "el-GR": elGR,
    "es-ES": esES,
    "fi-FI": fiFI,
    "fr-FR": frFR,
    "it-IT": itIT,
    "nl-NL": nlNL,
    "pl-PL": plPL,
    "pt-PT": ptPT,
    "ro-RO": roRO,
    "ru-RU": ruRU,
    "sv-SE": svSE,
    "uk-UA": ukUA,
  }
  return (localizationMap[currentLng as keyof typeof localizationMap] || enUS)
    .components.MuiDataGrid.defaultProps.localeText
}
