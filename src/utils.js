const regex = /([a-z])([A-Z])|([a-zA-Z])([\d])|([\d])([a-zA-Z])/g

const replacer = (m, p1, p2, p3, p4, p5, p6) => `${p1 || p3 || p5}_${p2 || p4 || p6}`

const toConst = (text) => text.replace(regex, replacer).toUpperCase()

const startsWith = (string, prefix) => typeof string === 'string' && string.indexOf(prefix) === 0

const hasOwnProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const mergeProps = (target, source) => {
  if (!source || typeof source !== 'object') {
    return target
  }

  const state = { ...target }
  const sourceProps = Object.keys(source)
  const { length } = sourceProps

  for (let i = 0; i < length; i += 1) {
    const prop = sourceProps[i]

    if (hasOwnProp(state, prop)) {
      state[prop] = source[prop]
    }
  }

  return state
}

const isValidName = (name) => {
  if (typeof name !== 'string') {
    return false
  }

  const trimmedName = name.replace(/[\W_]/g, '')

  if (trimmedName === '' || trimmedName !== name) {
    return false
  }

  return !Number.isInteger(parseInt(name[0]))
}

const addAction = (actionsRepo, name, meta) => {
  if (!isValidName(name)) {
    throw new Error(`Action name "${name}" should be a string in camelCase format.`)
  }

  if (hasOwnProp(actionsRepo, name)) {
    throw new Error(`Action with the name "${name}" is already exist.`)
  }

  actionsRepo[name] = { name, meta }
}

export { toConst, startsWith, hasOwnProp, mergeProps, isValidName, addAction }
