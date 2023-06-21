export interface AirtableResource {
  authenticationType: "personalToken"
  authenticationConfig: {
    token: string
  }
}

export const AirtableResourceInitial: AirtableResource = {
  authenticationType: "personalToken",
  authenticationConfig: {
    token: "",
  },
}
