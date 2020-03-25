import { connect } from 'react-redux';

const toConst = (text) => text.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`).toUpperCase();

const reduxHotModule = (module, preloadedState = null) => {
  const actionsRepo = {};

  const addAction = (name, meta) => {
    if (typeof name !== 'string') {
      throw new Error('Invalid action name.');
    }

    if (name in actionsRepo) {
      throw new Error(`Action with the name "${name}" is already exist.`);
    }

    actionsRepo[name] = { name, meta };
  };

  const addParamAction = (name, defaultValue = null) => {
    addAction(name, { isParam: true, defaultValue });
  };

  const addEventAction = (name) => {
    addAction(name, { isEvent: true });
  };

  const addResetAction = (name) => {
    addAction(name, { isReset: true });
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
      const { name, meta } = action;
      const typeNameConst = toConst(name);
      const type = `${typeNamespace}/${typeNameConst}`;
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

    const initialState = { ...defaultState };

    if (!!preloadedState && typeof preloadedState === 'object') {
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
