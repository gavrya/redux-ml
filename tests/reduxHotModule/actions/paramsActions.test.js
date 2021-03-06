import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test params actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have expected name', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamsAction('ready', {})

    const { actions } = ml.create()

    expect(typeof actions).toBe('object')

    const actionNames = Object.keys(actions)

    expect(actionNames).toHaveLength(1)
    expect(actionNames).toContain('readyAction')
  })

  test('should return redux action with default value', () => {
    const ml = new ReduxHotModule('moduleName')

    const defaultValue = {}

    ml.addParamsAction('ready', defaultValue)

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { readyAction } = actions

    expect(typeof readyAction).toBe('function')

    const reduxAction = readyAction()
    const expected = {
      type: '@@moduleName/READY',
      payload: defaultValue
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload).not.toBe(defaultValue)
  })

  test('should return redux action with provided value', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamsAction('ready', { a: 'a', b: 'b' })

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { readyAction } = actions

    expect(typeof readyAction).toBe('function')

    const value = { b: 'new b' }
    const reduxAction = readyAction(value)
    const expected = {
      type: '@@moduleName/READY',
      payload: { a: 'a', b: 'new b' }
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload).not.toBe(value)
  })

  test('should return redux action with empty object value if action added without default value', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamsAction('ready')

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { readyAction } = actions

    expect(typeof readyAction).toBe('function')

    const reduxAction = readyAction()
    const expected = {
      type: '@@moduleName/READY',
      payload: {}
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
  })
})
