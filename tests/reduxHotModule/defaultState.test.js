import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test defaultState', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should not be empty if param actions were added', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('a', true)
    ml.addParamAction('b', {})

    const { defaultState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(Object.keys(defaultState)).toHaveLength(2)
    expect(defaultState).toStrictEqual({ a: true, b: {} })
  })

  test('should be empty if param actions were not added', () => {
    const ml = new ReduxHotModule('moduleName')
    const { defaultState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(Object.keys(defaultState)).toHaveLength(0)
  })

  test('should be equal to initialState if preloadedState is not provided', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('item')

    const { defaultState, initialState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(defaultState).toBe(initialState)
  })

  test('should not be equal to initialState if preloadedState is provided', () => {
    const preloadedState = {}

    const ml = new ReduxHotModule('moduleName', preloadedState)

    ml.addParamAction('item')

    const { defaultState, initialState } = ml.create()

    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(defaultState).not.toBe(initialState)
  })
})
