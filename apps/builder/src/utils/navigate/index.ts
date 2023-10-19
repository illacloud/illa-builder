export const handleLinkOpen = (link: string) => {
  window.open(link, "_blank")
}

export const openDiscord = () => {
  handleLinkOpen("https://discord.com/invite/illacloud")
}
