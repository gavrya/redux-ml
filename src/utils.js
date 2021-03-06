const regex = /(?=[A-Z])/

const toConst = (text) => text.split(regex).join('_').toUpperCase()

const startsWith = (string, prefix) => typeof string === 'string' && string.indexOf(prefix) === 0

const hasProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop)

const mergeProps = (to, from, props) => {
  const merged = { ...to }

  props.forEach((prop) => {
    if (hasProp(merged, prop) && hasProp(from, prop)) {
      merged[prop] = from[prop]
    }
  })

  return merged
}

const addAction = (actionsRepo, name, meta) => {
  if (typeof name !== 'string') {
    throw new Error(`Action name is invalid.`)
  }

  if (hasProp(actionsRepo, name)) {
    throw new Error(`Action with the name "${name}" is already exist.`)
  }

  actionsRepo[name] = { name, meta }
}

export { toConst, startsWith, hasProp, mergeProps, addAction }
