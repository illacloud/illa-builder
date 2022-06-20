// string for component
export type DisplayNameType = "action" | "resource" | string

export class DisplayNameGenerator {
  static map: {
    [key: string]: number
  } = {}
  // use when create success
  static getDisplayName(type: DisplayNameType): string {
    if (this.map.hasOwnProperty(type)) {
      const num = this.map[type]
      this.map[type] = num + 1
    } else {
      this.map[type] = 1
    }
    return `${type}${this.map[type]}`
  }
}
