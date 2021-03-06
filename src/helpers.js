/**
 * Helper to ease constructing `apply` function for styles only.
 * @param { fuction } fn mapping from type and props to styles
 * @returns { function } apply function
 */
export const applyStyle = fn => (type, props) => {
  const style = fn(type, props)
  return { ...props, style: [ style, props.style ] }
}

/**
 * Apply function factory which merges props defined in arguments.
 * Prop definition is an object containing special key `$type` representing
 * component type and other keys which are properties to be passed to element.
 * @param { array } propsDefs array of prop definitions
 * @returns { function } apply function
 */
export const withProps = propsDefs => (type, props) => {
  const def = propsDefs.find(s => s.$type === type)
  if (def) {
    const { $type, ...themeProps } = def // eslint-disable-line
    return {
      ...themeProps,
      ...props,
      style: [ themeProps.style, props.style ],
    }
  }
  return props
}

/**
 * Apply function factory which merges styles defined in arguments.
 * Style definition is an object containing special key `$type` representing
 * component type and other keys which are styles to be passed to element.
 * @param { array } stylesDefs array of style definitions
 * @returns { function } apply function
 */
export const withStyles = stylesDefs => (type, props) => {
  const def = stylesDefs.find(s => s.$type === type)
  if (def) {
    const { $type, ...themeStyle } = def // eslint-disable-line
    return { ...props, style: [ themeStyle, props.style ] }
  }
  return props
}

/**
 * Chains apply functions passed as arguments.
 * It can be passed as many functions as needed.
 * @param { function } apply apply function
 * @returns { function } apply function
 */
export const chain = (...applies) => (type, props) => {
  return applies.reduce((p, a) => a(type, p), props)
}
