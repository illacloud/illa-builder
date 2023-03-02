import { ILLARoute } from "@/router"

export const handleLinkOpen = (link: string) => {
  window.open(link, "_blank")
}

export const toRegister = () => {
  ILLARoute.navigate("/register")
}

export const toForgotPassword = () => {
  ILLARoute.navigate("/forgotPassword")
}

export const openDiscord = () => {
  handleLinkOpen("https://discord.com/invite/illacloud")
}

export const openIssues = () => {
  handleLinkOpen("https://github.com/illacloud/illa-builder/issues")
}

export const openDocumentation = () => {
  handleLinkOpen("https://www.illacloud.com/docs/about-illa")
}
