import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test params reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should set default values when action value is not provided', () => {
    const ml = new ReduxHotModule('moduleName')
    const defaultValue = { a: 'new a', b: 'bew b' }

    ml.addParamAction('a', 'a')
    ml.addParamAction('b', 'b')
    ml.addParamAction('c', 'c')

    ml.addParamsAction('items', defaultValue)

    const { actions, reducer, initialState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof initialState).toBe('object')
    expect(initialState).toStrictEqual({ a: 'a', b: 'b', c: 'c' })

    const { itemsAction } = actions
    const nextState = reducer(initialState, itemsAction())

    expect(nextState).not.toBe(initialState)
    expect(nextState).toStrictEqual({ a: 'new a', b: 'bew b', c: 'c' })
  })

  test('should set provided value when action value is provided', () => {
    const ml = new ReduxHotModule('moduleName')

    const defaultValue = { a: 'new a', b: 'new b' }

    ml.addParamAction('a', 'a')
    ml.addParamAction('b', 'b')
    ml.addParamAction('c', 'c')

    ml.addParamsAction('items', defaultValue)

    const { actions, reducer, initialState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof initialState).toBe('object')
    expect(initialState).toStrictEqual({ a: 'a', b: 'b', c: 'c' })

    const { itemsAction } = actions
    const value = { b: 'bbb' }
    const nextState = reducer(initialState, itemsAction(value))

    expect(nextState).not.toBe(initialState)
    expect(nextState).toStrictEqual({ a: 'new a', b: 'bbb', c: 'c' })
  })
})
