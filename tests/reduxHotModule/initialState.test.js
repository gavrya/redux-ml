import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test initialState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have props merged props from preloadedState that exist in defaultState', () => {
    const preloadedState = {
      b: 10,
      c: 5,
      d: 5
    }

    const ml = new ReduxHotModule('moduleName', preloadedState)

    ml.addParamAction('a', 1)
    ml.addParamAction('b', 2)

    const { defaultState, initialState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(defaultState).toStrictEqual({ a: 1, b: 2 })
    expect(initialState).toStrictEqual({ a: 1, b: 10 })
  })

  test('should not be empty if param actions were added', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('a', true)
    ml.addParamAction('b', {})

    const { initialState } = ml.create()

    expect(typeof initialState).toBe('object')
    expect(Object.keys(initialState)).toHaveLength(2)
    expect(initialState).toStrictEqual({ a: true, b: {} })
  })

  test('should be empty if param actions were not added', () => {
    const ml = new ReduxHotModule('moduleName')
    const { initialState } = ml.create()

    expect(typeof initialState).toBe('object')
    expect(Object.keys(initialState)).toHaveLength(0)
  })

  test('should be equal to defaultState if preloadedState is not provided', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('item')

    const { defaultState, initialState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(defaultState).toBe(initialState)
  })

  test('should not be equal to defaultState if preloadedState is provided', () => {
    const preloadedState = {}

    const ml = new ReduxHotModule('moduleName', preloadedState)

    ml.addParamAction('item')

    const { defaultState, initialState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(defaultState).not.toBe(initialState)
  })
})
