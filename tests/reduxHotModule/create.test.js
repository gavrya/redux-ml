import { ReduxHotModule } from '../../src/reduxHotModule'
import { connect } from 'react-redux'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test create()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected values', () => {
    const ml = new ReduxHotModule('moduleName')
    const result = ml.create()

    expect(typeof result).toBe('object')
    expect(Object.keys(result)).toHaveLength(9)

    const {
      namespace,
      types,
      actions,
      reducer,
      defaultState,
      initialState,
      withModuleProps,
      mapStateToProps,
      mapDispatchToProps
    } = result

    expect(typeof namespace).toBe('string')
    expect(typeof types).toBe('object')
    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof defaultState).toBe('object')
    expect(typeof initialState).toBe('object')
    expect(typeof withModuleProps).toBe('function')
    expect(typeof mapStateToProps).toBe('function')
    expect(typeof mapDispatchToProps).toBe('object')
  })

  test('should return frozen objects to avoid modification', () => {
    const ml = new ReduxHotModule('moduleName')
    const result = ml.create()
    const { types, actions, defaultState, initialState, mapDispatchToProps } = result

    expect(Object.isFrozen(types)).toBe(true)
    expect(Object.isFrozen(actions)).toBe(true)
    expect(Object.isFrozen(defaultState)).toBe(true)
    expect(Object.isFrozen(initialState)).toBe(true)
    expect(Object.isFrozen(mapDispatchToProps)).toBe(true)
  })

  test('should call react-redux connect() once per create()', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.create()

    expect(connect).toHaveBeenCalledTimes(1)

    ml.create()

    expect(connect).toHaveBeenCalledTimes(2)

    ml.create()

    expect(connect).toHaveBeenCalledTimes(3)
  })
})
