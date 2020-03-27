# redux-hot-module
development in progress

## Usage example

```javascript
import ReduxHotModule from 'redux-hot-module';

const ml = new ReduxHotModule('searchResults');

// param actions
ml.addParamAction('posts', []);
ml.addParamAction('selectedPost', null);
ml.addParamAction('pageNumber', 1);
ml.addParamAction('pageSize', 10);
ml.addParamAction('loading', false);
ml.addParamAction('hasNext', false);

// event actions
ml.addEventAction('loadNextEvent');

// reset action
ml.addResetAction('reset');

export const {
  namespace,
  reducer,
  defaultState,
  withProps,
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
} = ml.create();
```
