const { connect } = require('react-redux');

const { toConst, mergeState } = require('./utils');

const reduxHotModule = (module, preloadedState = null) => {
  const actionsMap = {};

  const addAction = (name, payload, meta) => {
    if (actionsMap[name]) {
      throw new Error(`Action with the name "${name}" is already exist.`);
    }

    actionsMap[name] = { payload, meta };
  };

  const addParamAction = (name, defaultValue = null) => {
    addAction(name, { [name]: defaultValue }, { isParam: true });
  };

  const addEventAction = (name) => {
    addAction(name, {}, { isEvent: true });
  };

  const addResetAction = (name = 'reset') => {
    addAction(name, {}, { isReset: true });
  };

  const generate = () => {
    const typeNamespace = `@@${module}`;
    const namespaceConst = toConst(module);
    const namespace = `${typeNamespace}/${namespaceConst}`;

    const types = {};
    const actions = {};

    const paramTypes = [];
    const resetTypes = [];

    let defaultState = {};

    Object.keys(actionsMap).forEach((name) => {
      const typeNameConst = toConst(name);
      const type = `${typeNamespace}/${typeNameConst}`;
      const typeName = `${namespaceConst}_${typeNameConst}`;
      const actionName = `${name}Action`;

      types[typeName] = type;

      const { payload: actionPayload, meta: actionMeta } = actionsMap[name];

      if (actionMeta.isParam) {
        actions[actionName] = (payload = actionPayload) => ({ type, payload });
        paramTypes.push(type);
      } else if (actionMeta.isEvent) {
        actions[actionName] = (payload = actionPayload) => ({ type, payload });
      } else if (actionMeta.isReset) {
        actions[actionName] = () => ({ type });
        resetTypes.push(type);
      }

      defaultState = { ...defaultState, ...actionPayload };
    });

    const initialState = mergeState(defaultState, preloadedState);

    const reducer = (state = initialState, action) => {
      if (paramTypes.includes(action.type)) {
        return { ...state, ...action.payload };
      }

      if (resetTypes.includes(action.type)) {
        return { ...state, ...defaultState };
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
  };

  return {
    addParamAction,
    addEventAction,
    addResetAction,
    generate,
  };
};

module.exports = reduxHotModule;
