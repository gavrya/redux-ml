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

  test('should return redux action without payload', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addEventAction('loadedEvent')

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { loadedEventAction } = actions

    expect(typeof loadedEventAction).toBe('function')

    const reduxAction = loadedEventAction()
    const expected = {
      type: '@@moduleName/LOADED_EVENT'
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(loadedEventAction({})).toStrictEqual(expected)
  })
})
