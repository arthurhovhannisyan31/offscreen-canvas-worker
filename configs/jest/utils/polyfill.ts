const requestAnimationFrame = (cb: () => void): void => {
  setTimeout(cb, 0)
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.requestAnimationFrame = requestAnimationFrame

export default requestAnimationFrame
