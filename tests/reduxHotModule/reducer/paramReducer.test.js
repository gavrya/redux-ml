import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test param reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should set default value when action value is not provided', () => {
    const ml = new ReduxHotModule('moduleName')
    const defaultValue = [1, 2, 3]

    ml.addParamAction('items', defaultValue)

    const { actions, reducer, initialState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof initialState).toBe('object')
    expect(initialState).toStrictEqual({ items: defaultValue })

    const { itemsAction } = actions
    const nextState = reducer(initialState, itemsAction())

    expect(nextState).not.toBe(initialState)
    expect(nextState).toStrictEqual({ items: defaultValue })
    expect(nextState.items).toBe(defaultValue)
  })

  test('should set provided value when action value is provided', () => {
    const ml = new ReduxHotModule('moduleName')

    const defaultValue = [1, 2, 3]

    ml.addParamAction('items', defaultValue)

    const { actions, reducer, initialState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof initialState).toBe('object')
    expect(initialState).toStrictEqual({ items: defaultValue })

    const { itemsAction } = actions
    const value = [3, 2, 1]
    const nextState = reducer(initialState, itemsAction(value))

    expect(nextState).not.toBe(initialState)
    expect(nextState).toStrictEqual({ items: value })
    expect(nextState.items).toBe(value)
  })
})
