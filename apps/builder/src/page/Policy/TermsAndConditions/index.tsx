import { useMemo } from "react"
import { Helmet } from "react-helmet-async"
import { useTranslation } from "react-i18next"
import TermsOfServiceUS from "@/illa-public-component/User/policy/en-US/terms-of-serivce.mdx"
import TermsOfServiceJP from "@/illa-public-component/User/policy/ja-JP/terms-of-serivce.mdx"
import TermsOfServiceKR from "@/illa-public-component/User/policy/ko-KR/terms-of-serivce.mdx"
import TermsOfServiceCN from "@/illa-public-component/User/policy/zh-CN/terms-of-serivce.mdx"
import { policyContainer } from "../style"

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
