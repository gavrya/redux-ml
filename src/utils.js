const regex = /(?=[A-Z])/

const toConst = (text) => text.split(regex).join('_').toUpperCase()

const startsWith = (string, prefix) => typeof string === 'string' && string.indexOf(prefix) === 0

const hasOwnProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const mergeProps = (target, source, props) => {
  if (!source || typeof source !== 'object') {
    return target
  }

  const state = { ...target }
  const isArrayProps = Array.isArray(props)
  const sourceProps = Object.keys(source)
  const { length } = sourceProps

  for (let i = 0; i < length; i += 1) {
    const prop = sourceProps[i]

    if (hasOwnProp(state, prop) && (!isArrayProps || props.includes(prop))) {
      state[prop] = source[prop]
    }
  }

  return state
}

const addAction = (actionsRepo, name, meta) => {
  if (hasOwnProp(actionsRepo, name)) {
    throw new Error(`Action with the name "${name}" is already exist.`)
  }

  actionsRepo[name] = { name, meta }
}

export { toConst, startsWith, hasOwnProp, mergeProps, addAction }
