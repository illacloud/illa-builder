// Thk unescape-js

const jsEscapeRegex =
  /\\(u\{([0-9A-Fa-f]+)\}|u([0-9A-Fa-f]{4})|x([0-9A-Fa-f]{2})|([1-7][0-7]{0,2}|[0-7]{2,3})|(['"tbrnfv0\\]))|\\U([0-9A-Fa-f]{8})/g

const usualEscapeSequences: Record<string, string> = {
  "0": "\0",
  b: "\b",
  f: "\f",
  n: "\n",
  r: "\r",
  t: "\t",
  v: "\v",
  "'": "'",
  '"': '"',
  "\\": "\\",
}

const fromHex = (str: string) => String.fromCodePoint(parseInt(str, 16))
const fromOct = (str: string) => String.fromCodePoint(parseInt(str, 8))

export const unescapeJS = (string: string) => {
  return string.replace(
    jsEscapeRegex,
    (_, __, varHex, longHex, shortHex, octal, specialCharacter, python) => {
      if (varHex !== undefined) {
        return fromHex(varHex)
      } else if (longHex !== undefined) {
        return fromHex(longHex)
      } else if (shortHex !== undefined) {
        return fromHex(shortHex)
      } else if (octal !== undefined) {
        return fromOct(octal)
      } else if (python !== undefined) {
        return fromHex(python)
      } else {
        return usualEscapeSequences[specialCharacter]
      }
    },
  )
}
