/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import utc from "dayjs/plugin/utc"
import i18n, { formatLanguage } from "@/i18n"

dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(updateLocale)

const PER_SECOND = 1000
const PER_MINUTE = PER_SECOND * 60
const PER_HOUR = PER_MINUTE * 60
const PER_DAY = PER_HOUR * 24

async function initDayjs() {
  const local = localStorage.getItem("i18nextLng") || "en-US"
  const language = formatLanguage(local)
  switch (language) {
    case "zh-CN":
      await import("dayjs/locale/zh-cn")
      dayjs.locale("zh-cn")
      break
    case "en-US":
    default:
      await import("dayjs/locale/en")
      dayjs.locale("en-us")
      break
  }
}

initDayjs()

export const fromNow = (date: string) => {
  if (!date) return ""
  const now = dayjs()
  const diff = now.diff(date)
  const { t } = i18n
  if (diff / PER_MINUTE < 1) {
    return t("homepage.builder_card.edited_justnow")
  }
  if (diff / PER_MINUTE === 1) {
    return t("homepage.builder_card.edited_1min")
  }
  if (diff / PER_MINUTE <= 60) {
    return t("homepage.builder_card.edited_mins", {
      n: Math.floor(diff / PER_MINUTE),
    })
  }
  if (diff / PER_HOUR === 1) {
    return t("homepage.builder_card.edited_1hour")
  }
  if (diff / PER_HOUR <= 24) {
    return t("homepage.builder_card.edited_hours", {
      n: Math.floor(diff / PER_HOUR),
    })
  }
  if (diff / PER_DAY === 1) {
    return t("homepage.builder_card.edited_1day")
  }
  if (diff / PER_DAY > 1) {
    return t("homepage.builder_card.edited_days", {
      n: Math.floor(diff / PER_DAY),
    })
  }

  return ""
}
