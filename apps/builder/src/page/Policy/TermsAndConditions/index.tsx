import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import { policyContainer } from "../style"
import TermsOfServiceUS from "./en-US/terms-of-serivce.mdx"
import TermsOfServiceJP from "./ja-JP/terms-of-serivce.mdx"
import TermsOfServiceKR from "./ko-KR/terms-of-serivce.mdx"
import TermsOfServiceCN from "./zh-CN/terms-of-serivce.mdx"

const TermsOfService = () => {
  const { i18n, t } = useTranslation()
  const localLanguage = i18n.language
  const lng = useMemo(() => {
    const urlParams = new URLSearchParams(window.location.search)
    return urlParams.get("lng")
  }, [])

  const mergeLng = lng ?? localLanguage

  const ReturnedComponent = useMemo(() => {
    switch (mergeLng) {
      default:
      case "en-US":
        return <TermsOfServiceUS />
      case "zh-CN":
        return <TermsOfServiceCN />
      case "ja-JP":
        return <TermsOfServiceJP />
      case "ko-KR":
        return <TermsOfServiceKR />
    }
  }, [mergeLng])

  return (
    <div css={policyContainer}>
      <Helmet>
        <title>{t("policy.terms.title")}</title>
        <meta name="description" content={t("policy.terms.description")} />
      </Helmet>
      {ReturnedComponent}
    </div>
  )
}

export default TermsOfService
