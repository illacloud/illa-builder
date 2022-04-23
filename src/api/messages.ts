export function createMessage(
  messageRender: (...msgArgs: any[]) => string,
  ...args: any[]
) {
  return messageRender(...args)
}

export const NOT_ONLINE = () =>
  `We could not connect to our servers. Please check your network connection`

export const ERROR_500 = () => `There have been some problems in the server`

export const ERROR_401 = () => `Unauthorized`

export const ERROR_404 = () => `Resource Not Found`
