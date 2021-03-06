import { connect } from 'react-redux'
import { toConst, startsWith, hasProp, mergeProps, addAction } from './utils'

class ReduxHotModule {
  constructor(module, preloadedState = null) {
    this.module = module
    this.preloadedState = preloadedState
    this.actionsRepo = {}
  }

  addParamAction(name, defaultValue = null) {
    addAction(this.actionsRepo, name, { isParam: true, defaultValue })
  }

  addParamsAction(name, defaultValue = {}) {
    addAction(this.actionsRepo, name, {
      isParams: true,
      defaultValue,
      keys: Object.keys(defaultValue)
    })
  }

  addEventAction(name, defaultValue = null) {
    addAction(this.actionsRepo, name, { isEvent: true, defaultValue })
  }

  addResetAction(name, keys = []) {
    addAction(this.actionsRepo, name, { isReset: true, keys })
  }

  create() {
    const types = {}
    const actions = {}
    const paramTypes = {}
    const paramsTypes = {}
    const resetTypes = {}
    const defaultState = {}
    const namespace = `@@${this.module}`
    const moduleConst = toConst(this.module)
    const typePrefix = `${namespace}/`
    const items = Object.values(this.actionsRepo)
    const { length } = items

    for (let i = 0; i < length; i++) {
      const { name, meta } = items[i]
      const { defaultValue } = meta
      const typeNameConst = toConst(name)
      const type = `${typePrefix}${typeNameConst}`
      const typeName = `${moduleConst}_${typeNameConst}`
      const actionName = `${name}Action`

      types[typeName] = type

      if (meta.isParam) {
        actions[actionName] = (value = defaultValue) => ({ type, payload: { [name]: value } })
        defaultState[name] = defaultValue
        paramTypes[type] = meta
      } else if (meta.isParams) {
        actions[actionName] = (value = {}) => ({ type, payload: { ...defaultValue, ...value } })
        paramsTypes[type] = meta
      } else if (meta.isEvent) {
        actions[actionName] = (value = defaultValue) => ({ type, payload: value })
      } else {
        actions[actionName] = () => ({ type })
        resetTypes[type] = meta
      }
    }

    const initialState = this.preloadedState
      ? mergeProps(defaultState, this.preloadedState, Object.keys(this.preloadedState))
      : defaultState

    const reducer = (state = initialState, action) => {
      const { type } = action

      // performance optimization
      if (!startsWith(type, typePrefix)) {
        return state
      }

      if (hasProp(paramTypes, type)) {
        return { ...state, ...action.payload }
      }

      if (hasProp(paramsTypes, type)) {
        const { keys } = paramsTypes[type]

        return keys.length ? mergeProps(state, action.payload, keys) : state
      }

      if (hasProp(resetTypes, type)) {
        const { keys } = resetTypes[type]

        return keys.length ? mergeProps(state, defaultState, keys) : defaultState
      }

      return state
    }

    ;[types, actions, defaultState, initialState].forEach((obj) => Object.freeze(obj))

    const mapStateToProps = (state) => state[namespace]
    const mapDispatchToProps = actions
    const withModuleProps = connect(mapStateToProps, mapDispatchToProps)

    return {
      namespace,
      types,
      actions,
      reducer,
      defaultState,
      initialState,
      withModuleProps,
      mapStateToProps,
      mapDispatchToProps
    }
  }
}

export { ReduxHotModule }
