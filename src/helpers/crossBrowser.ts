export const isSafari = (navigator: Navigator): boolean => /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
