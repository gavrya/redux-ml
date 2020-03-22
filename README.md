# redux-hot-module
redux-hot-module in progress

## Usage example

```javascript
import reduxHotModule from 'redux-hot-module';

const m = reduxHotModule('searchResults');

// param actions
m.addParamAction('posts', []);
m.addParamAction('selectedPost', null);
m.addParamAction('pageNumber', 1);
m.addParamAction('pageSize', 10);
m.addParamAction('loading', false);
m.addParamAction('hasNext', false);

// event actions
m.addEventAction('loadNextEvent');

// reset action
m.addResetAction('reset');

export const {
  namespace,
  reducer,
  defaultState,
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
    SEARCH_RESULTS_RESET,
  },
  actions: {
    postsAction,
    selectedPostAction,
    pageNumberAction,
    pageSizeAction,
    loadingAction,
    hasNextAction,
    loadNextEventAction,
    resetAction,
  },
} = m.create();
```
