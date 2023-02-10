/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs"
import advancedFormat from "dayjs/plugin/advancedFormat"
import customParseFormat from "dayjs/plugin/customParseFormat"
import isBetween from "dayjs/plugin/isBetween"
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import QuarterOfYear from "dayjs/plugin/quarterOfYear"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import utc from "dayjs/plugin/utc"
import weekOfYear from "dayjs/plugin/weekOfYear"
import weekYear from "dayjs/plugin/weekYear"
import i18n, { formatLanguage } from "@/i18n/config"

dayjs.extend(isBetween)
dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(updateLocale)
dayjs.extend(weekOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(weekYear)
dayjs.extend(QuarterOfYear)
dayjs.extend(customParseFormat)

const PER_SECOND = 1000
const PER_MINUTE = PER_SECOND * 60
const PER_HOUR = PER_MINUTE * 60
const PER_DAY = PER_HOUR * 24

const FORMAT_RULE = {
  "zh-cn": {
    inYear: "MMMD日 HH:MM",
    otherYear: "YYYY年MMMDD日HH:MM",
  },
  "en-us": {
    inYear: "HH:MM MMM DD",
    otherYear: "HH:MM MMM DD, YYYY",
  },
}

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
  const local = dayjs.locale() as "zh-cn" | "en-us"
  if (diff / PER_MINUTE <= 1) {
    return i18n.t("dayjs.just_now")
  }

  if (diff / PER_DAY >= 7 && dayjs(date).isSame(now, "year")) {
    return dayjs(date).format(
      FORMAT_RULE[local]?.inYear || FORMAT_RULE["en-us"].inYear,
    )
  }

  if (diff / PER_DAY >= 7 && !dayjs(date).isSame(now, "year")) {
    return dayjs(date).format(
      FORMAT_RULE[local]?.otherYear || FORMAT_RULE["en-us"].otherYear,
    )
  }
  return dayjs(date).fromNow()
}
