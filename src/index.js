import { connect } from 'react-redux';

const startsWith = (string, prefix) => typeof string === 'string' && string.indexOf(prefix) === 0;

const hasOwnProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop);

const toConst = (text) => text.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`).toUpperCase();

const mergeProps = (target, source) => {
  if (!source || typeof source !== 'object') {
    return target;
  }

  const state = { ...target };
  const sourceProps = Object.keys(source);
  const { length } = sourceProps;

  for (let i = 0; i < length; i += 1) {
    const prop = sourceProps[i];

    if (hasOwnProp(state, prop)) {
      state[prop] = source[prop];
    }
  }

  return state;
};

const addAction = (actionsRepo, name, meta) => {
  if (typeof name !== 'string') {
    throw new Error('Invalid action name.');
  }

  const trimmedName = name.trim();

  if (trimmedName === '' || trimmedName !== name) {
    throw new Error('Action name should not be empty or contain whitespace.');
  }

  const firstChar = trimmedName[0];

  if (firstChar !== firstChar.toLowerCase()) {
    throw new Error('Action name should be in camelCase.');
  }

  if (hasOwnProp(actionsRepo, name)) {
    throw new Error(`Action with the name "${name}" is already exist.`);
  }

  // eslint-disable-next-line no-param-reassign
  actionsRepo[name] = { name, meta };
};

class ReduxHotModule {
  constructor(module, preloadedState = null) {
    this.module = module;
    this.preloadedState = preloadedState;
    this.actionsRepo = {};
  }

  addParamAction(name, defaultValue = null) {
    addAction(this.actionsRepo, name, { isParam: true, defaultValue });
  }

  addEventAction(name) {
    addAction(this.actionsRepo, name, { isEvent: true });
  }

  addResetAction(name) {
    addAction(this.actionsRepo, name, { isReset: true });
  }

  create() {
    const types = {};
    const actions = {};
    const paramTypes = {};
    const resetTypes = {};
    const defaultState = {};

    const namespace = `@@${this.module}`;
    const moduleConst = toConst(this.module);
    const typePrefix = `${namespace}/`;

    const actionsInfo = Object.values(this.actionsRepo);
    const { length } = actionsInfo;

    for (let i = 0; i < length; i += 1) {
      const { name, meta } = actionsInfo[i];
      const typeNameConst = toConst(name);
      const type = `${typePrefix}${typeNameConst}`;
      const typeName = `${moduleConst}_${typeNameConst}`;
      const actionName = `${name}Action`;

      types[typeName] = type;

      if (meta.isParam) {
        const { defaultValue } = meta;

        actions[actionName] = (value = defaultValue) => ({ type, payload: { [name]: value } });
        defaultState[name] = defaultValue;
        paramTypes[type] = meta;
      } else if (meta.isEvent) {
        actions[actionName] = () => ({ type });
      } else if (meta.isReset) {
        actions[actionName] = () => ({ type });
        resetTypes[type] = meta;
      }
    }

    const initialState = mergeProps(defaultState, this.preloadedState);

    const reducer = (state = initialState, action) => {
      const { type } = action;

      if (!startsWith(type, typePrefix)) {
        return state;
      }

      if (hasOwnProp(paramTypes, type)) {
        return { ...state, ...action.payload };
      }

      if (hasOwnProp(resetTypes, type)) {
        return defaultState;
      }

      return state;
    };

    Object.freeze(types);
    Object.freeze(actions);
    Object.freeze(defaultState);

    const mapStateToProps = (state) => state[namespace];
    const mapDispatchToProps = actions;
    const withModuleProps = connect(mapStateToProps, mapDispatchToProps);

    return {
      namespace,
      types,
      actions,
      reducer,
      defaultState,
      withModuleProps,
      mapStateToProps,
      mapDispatchToProps,
    };
  }
}

// eslint-disable-next-line import/prefer-default-export
export { ReduxHotModule };
