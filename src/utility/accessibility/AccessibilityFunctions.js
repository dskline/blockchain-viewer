
export const onEnterKeyPress = (func) => {
  const returnFunction = (e) => {
    if (e.keyCode === 13 || e.which === 13) {
      e.preventDefault()
      func()
    }
  }
  return returnFunction
}
