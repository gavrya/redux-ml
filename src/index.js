const { connect } = require('react-redux');

const hasProp = (object, prop) => Object.prototype.hasOwnProperty.call(object, prop);

const toConst = (text) => text.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`).toUpperCase();

const mergeProps = (target, source) => {
  if (!source || typeof source !== 'object') {
    return target;
  }

  const state = { ...target };

  Object.keys(source).forEach((prop) => {
    if (hasProp(state, prop)) {
      state[prop] = source[prop];
    }
  });

  return state;
};

const addAction = (actionsRepo, name, meta) => {
  if (typeof name !== 'string') {
    throw new Error('Invalid action name.');
  }

  if (hasProp(actionsRepo, name)) {
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
    const namespace = `@${this.module}`;
    const namespaceConst = toConst(this.module);

    const types = {};
    const actions = {};

    const paramTypes = [];
    const resetTypes = [];

    let defaultState = {};

    Object.values(this.actionsRepo).forEach((action) => {
      const { name, meta } = action;
      const typeNameConst = toConst(name);
      const type = `${namespace}/${typeNameConst}`;
      const typeName = `${namespaceConst}_${typeNameConst}`;
      const actionName = `${name}Action`;

      types[typeName] = type;

      if (meta.isParam) {
        const { defaultValue } = meta;
        actions[actionName] = (value = defaultValue) => ({ type, payload: { [name]: value } });
        defaultState = { ...defaultState, [name]: defaultValue };
        paramTypes.push(type);
      } else if (meta.isEvent) {
        actions[actionName] = () => ({ type });
      } else if (meta.isReset) {
        actions[actionName] = () => ({ type });
        resetTypes.push(type);
      }
    });

    const initialState = mergeProps(defaultState, this.preloadedState);

    const reducer = (state = initialState, action) => {
      if (paramTypes.includes(action.type)) {
        return mergeProps(state, action.payload);
      }

      if (resetTypes.includes(action.type)) {
        return { ...defaultState };
      }

      return state;
    };

    const mapStateToProps = (state) => state[namespace];
    const mapDispatchToProps = { ...actions };
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

module.exports = ReduxHotModule;
