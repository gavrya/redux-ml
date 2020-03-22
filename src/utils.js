const toUnderscore = (text) => text.replace(/([A-Z])/g, ($1) => `_${$1.toLowerCase()}`);

const toConst = (text) => toUnderscore(text).toUpperCase();

const mergeState = (toState, fromState) => {
  if (typeof fromState !== 'object') {
    return toState;
  }

  const state = { ...toState };

  Object.keys(fromState).forEach((key) => {
    if (state[key]) {
      state[key] = fromState[key];
    }
  });

  return state;
};

export {
  toUnderscore,
  toConst,
  mergeState,
};
