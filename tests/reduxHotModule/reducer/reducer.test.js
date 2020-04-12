import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should ignore redux action without type', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', [])

    const { reducer } = ml.create()
    const state = {}
    const reduxAction = { payload: { items: [] } }

    expect(typeof reducer).toBe('function')
    expect(reducer(state, reduxAction)).toBe(state)
  })

  test('should ignore redux action with unregistered type prefix', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', [])

    const { reducer } = ml.create()
    const state = {}
    const reduxAction = { type: '@@search/ITEMS', payload: { items: [] } }

    expect(typeof reducer).toBe('function')
    expect(reducer(state, reduxAction)).toBe(state)
  })

  test('should ignore redux action with unregistered type', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', [])

    const { reducer } = ml.create()
    const state = {}
    const reduxAction = { type: '@@moduleName/FAKE_ITEMS', payload: { items: [] } }

    expect(typeof reducer).toBe('function')
    expect(reducer(state, reduxAction)).toBe(state)
  })

  test('should initially return defaultState if preloadedState is not provided', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', [])

    const { reducer, defaultState, initialState } = ml.create()
    const reduxAction = { type: '@@init/INIT' }

    expect(typeof reducer).toBe('function')
    expect(defaultState).toBe(initialState)
    expect(reducer(undefined, reduxAction)).toBe(defaultState)
  })

  test('should initially return initialState if preloadedState is provided', () => {
    const preloadedState = {}

    const ml = new ReduxHotModule('moduleName', preloadedState)

    ml.addParamAction('items', [])

    const { reducer, defaultState, initialState } = ml.create()
    const reduxAction = { type: '@@init/INIT' }

    expect(typeof reducer).toBe('function')
    expect(defaultState).not.toBe(initialState)
    expect(reducer(undefined, reduxAction)).toBe(initialState)
  })
})
