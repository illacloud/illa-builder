import { RESULT_SHOW_TYPE } from "./restApiHeader"

export interface IShowResult {
  result?: unknown
  rawResult?: unknown
  responseHeader?: unknown
}

export const getDisplayResult = (
  showType: RESULT_SHOW_TYPE,
  result: IShowResult,
) => {
  switch (showType) {
    case RESULT_SHOW_TYPE.HEADERS: {
      return result.responseHeader
    }
    case RESULT_SHOW_TYPE.RAW_DATA: {
      return result.rawResult
    }
    case RESULT_SHOW_TYPE.RESPONSE:
    default: {
      return result.result
    }
  }
}
