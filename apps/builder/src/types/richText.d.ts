declare module "@editorjs/*" {
  export default class editorPlugin {
    constructor(config)
    render()
    normalizeData(data)
    setLevel(level): void
    merge(data): void
    validate(blockData): boolean
    save(toolsContent)
    static get conversionConfig(): { export: string; import: string }
    static get sanitize()
    static get isReadOnlySupported(): boolean
    get data()
    set data(data)
    getTag(): HTMLElement
    get currentLevel()
    get defaultLevel()
    get levels()
    static get toolbox(): {
      icon: string
      title: string
    }
  }
}

declare module "editorjs-md-parser" {
  export const MDfromBlocks: (blocks: any) => Promise<any>
}
