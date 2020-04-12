[![minified + gzip](https://badgen.net/bundlephobia/minzip/redux-hot-module)](https://bundlephobia.com/result?p=redux-hot-module)
[![minified](https://badgen.net/bundlephobia/min/redux-hot-module)](https://bundlephobia.com/result?p=redux-hot-module)
[![npm version](https://badge.fury.io/js/redux-hot-module.svg)](https://badge.fury.io/js/redux-hot-module)
[![Build Status](https://travis-ci.com/gavrya/redux-hot-module.svg?branch=master)](https://travis-ci.com/gavrya/redux-hot-module)
[![Coverage Status](https://coveralls.io/repos/github/gavrya/redux-hot-module/badge.svg?branch=master)](https://coveralls.io/github/gavrya/redux-hot-module?branch=master)

# redux-hot-module

under development

## Installation

### npm

```shell
npm i redux-hot-module
```

### yarn

```shell
yarn add redux-hot-module
```

## Usage

```js
import { ReduxHotModule } from 'redux-hot-module'

// cached or mocked state that will be merged in (optional)
const preloadedState = localStorage.getItem('searchResults')

const ml = new ReduxHotModule('searchResults', preloadedState)

// param actions
ml.addParamAction('posts', [])
ml.addParamAction('selectedPost', null)
ml.addParamAction('pageNumber', 1)
ml.addParamAction('pageSize', 10)
ml.addParamAction('loading', false)
ml.addParamAction('hasNext', false)

// event actions
ml.addEventAction('loadNextEvent')

// reset action
ml.addResetAction('reset')

export const {
  namespace,
  reducer,
  defaultState,
  initialState,
  withModuleProps,
  mapStateToProps,
  mapDispatchToProps,
  types: {
    SEARCH_RESULTS_POSTS,
    SEARCH_RESULTS_SELECTED_POST,
    SEARCH_RESULTS_PAGE_NUMBER,
    SEARCH_RESULTS_PAGE_SIZE,
    SEARCH_RESULTS_LOADING,
    SEARCH_RESULTS_HAS_NEXT,
    SEARCH_RESULTS_LOAD_NEXT_EVENT,
    SEARCH_RESULTS_RESET
  },
  actions: {
    postsAction,
    selectedPostAction,
    pageNumberAction,
    pageSizeAction,
    loadingAction,
    hasNextAction,
    loadNextEventAction,
    resetAction
  }
} = ml.create()
```

### unpkg

Global name: ReduxHotModule

Requires 'react-redux' package with 'ReactRedux' global name

https://github.com/reduxjs/react-redux

https://cdnjs.com/libraries/react-redux

```html
<script src="https://unpkg.com/redux-hot-module@latest/lib/bundle.umd.js"></script>
```
