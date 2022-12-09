/* eslint-disable import/no-named-as-default-member */
import dayjs from "dayjs"
import localeData from "dayjs/plugin/localeData"
import LocalizedFormat from "dayjs/plugin/localizedFormat"
import relativeTime from "dayjs/plugin/relativeTime"
import updateLocale from "dayjs/plugin/updateLocale"
import utc from "dayjs/plugin/utc"
import i18n, { formatLanguage } from "@/i18n/config"

dayjs.extend(LocalizedFormat)
dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(updateLocale)

const PER_SECOND = 1000
const PER_MINUTE = PER_SECOND * 60
const PER_HOUR = PER_MINUTE * 60
const PER_DAY = PER_HOUR * 24

const FORMAT_RULE = {
  "zh-CN": {
    inYear: "MMMD日 HH:MM",
    otherYear: "YYYY年MMMDD日HH:MM",
  },
  "en-US": {
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
      dayjs.locale("zh-CN")
      break
    case "en-US":
    default:
      await import("dayjs/locale/en")
      dayjs.locale("en-US")
      break
  }
}

initDayjs()

export const fromNow = (date: string) => {
  if (!date) return ""
  const now = dayjs()
  const diff = now.diff(date)
  const local = dayjs.locale() as "zh-CN" | "en-US"
  if (diff / PER_MINUTE <= 1) {
    return i18n.t("dayjs.just_now")
  }

  if (diff / PER_DAY >= 7 && dayjs(date).isSame(now, "year")) {
    return dayjs(date).format(
      FORMAT_RULE[local]?.inYear || FORMAT_RULE["en-US"].inYear,
    )
  }

  if (diff / PER_DAY >= 7 && !dayjs(date).isSame(now, "year")) {
    return dayjs(date).format(
      FORMAT_RULE[local].otherYear || FORMAT_RULE["en-US"].otherYear,
    )
  }
  return dayjs(date).fromNow()
}
