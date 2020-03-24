import { connect } from 'react-redux';

const toConst = (text) => text.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`).toUpperCase();

const reduxHotModule = (module, preloadedState = null) => {
  const actionsRepo = {};

  const addAction = (name, payload, meta) => {
    if (typeof name !== 'string') {
      throw new Error('Invalid action name.');
    }

    if (name in actionsRepo) {
      throw new Error(`Action with the name "${name}" is already exist.`);
    }

    actionsRepo[name] = { name, payload, meta };
  };

  const addParamAction = (name, defaultValue = null) => {
    addAction(name, { [name]: defaultValue }, { isParam: true });
  };

  const addEventAction = (name) => {
    addAction(name, null, { isEvent: true });
  };

  const addResetAction = (name) => {
    addAction(name, null, { isReset: true });
  };

  const create = () => {
    const typeNamespace = `@@${module}`;
    const namespaceConst = toConst(module);
    const namespace = `${typeNamespace}/${namespaceConst}`;

    const types = {};
    const actions = {};

    const paramTypes = [];
    const resetTypes = [];

    let defaultState = {};

    Object.values(actionsRepo).forEach((action) => {
      const { name, payload: actionPayload, meta: actionMeta } = action;

      const typeNameConst = toConst(name);
      const type = `${typeNamespace}/${typeNameConst}`;
      const typeName = `${namespaceConst}_${typeNameConst}`;
      const actionName = `${name}Action`;

      types[typeName] = type;

      if (actionMeta.isParam) {
        actions[actionName] = (payload = actionPayload) => ({ type, payload });
        paramTypes.push(type);
      } else if (actionMeta.isEvent) {
        actions[actionName] = (payload = actionPayload) => (payload ? { type, payload } : { type });
      } else if (actionMeta.isReset) {
        actions[actionName] = () => ({ type });
        resetTypes.push(type);
      }

      defaultState = { ...defaultState, ...actionPayload };
    });

    const initialState = { ...defaultState };

    if (typeof preloadedState === 'object') {
      Object.keys(preloadedState).forEach((key) => {
        if (key in initialState) {
          initialState[key] = preloadedState[key];
        }
      });
    }

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

    const withProps = connect(mapStateToProps, mapDispatchToProps);

    return {
      namespace,
      types,
      actions,
      reducer,
      defaultState,
      withProps,
      mapStateToProps,
      mapDispatchToProps,
    };
  };

  return {
    addParamAction,
    addEventAction,
    addResetAction,
    create,
  };
};

export default reduxHotModule;
