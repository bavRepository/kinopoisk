export const getRandomIndex = <T>(array: T[]) => {
  if (array.length === 0) return
  return Math.floor(Math.random() * array.length)
}
