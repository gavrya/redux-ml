import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test event actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have expected name', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addEventAction('loadEvent')

    const { actions } = ml.create()

    expect(typeof actions).toBe('object')

    const actionNames = Object.keys(actions)

    expect(actionNames).toHaveLength(1)
    expect(actionNames).toContain('loadEventAction')
  })

  test('should return redux action with default value', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addEventAction('loadedEvent')

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { loadedEventAction } = actions

    expect(typeof loadedEventAction).toBe('function')

    const reduxAction = loadedEventAction()
    const expected = {
      type: '@@moduleName/LOADED_EVENT',
      payload: null
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
  })

  test('should return redux action with provided default value', () => {
    const ml = new ReduxHotModule('moduleName')

    const defaultValue = {}

    ml.addEventAction('loadedEvent', defaultValue)

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { loadedEventAction } = actions

    expect(typeof loadedEventAction).toBe('function')

    const reduxAction = loadedEventAction()
    const expected = {
      type: '@@moduleName/LOADED_EVENT',
      payload: defaultValue
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload).toBe(defaultValue)
  })

  test('should return redux action with provided payload', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addEventAction('loadedEvent')

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { loadedEventAction } = actions

    expect(typeof loadedEventAction).toBe('function')

    const value = {}
    const reduxAction = loadedEventAction(value)
    const expected = {
      type: '@@moduleName/LOADED_EVENT',
      payload: value
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload).toBe(value)
  })
})
