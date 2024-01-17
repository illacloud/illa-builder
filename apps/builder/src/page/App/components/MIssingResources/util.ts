export const getTutorialLink = (actionType: string, tutorialHref?: string) => {
  if (tutorialHref) {
    return tutorialHref
  }
  switch (actionType) {
    default: {
      return "https://www.baidu.com"
    }
  }
}
