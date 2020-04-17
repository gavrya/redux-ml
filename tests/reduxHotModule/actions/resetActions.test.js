import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test reset actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have expected name', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addResetAction()
    ml.addResetAction('clear')

    const { actions } = ml.create()

    expect(typeof actions).toBe('object')

    const actionNames = Object.keys(actions)

    expect(actionNames).toHaveLength(2)
    expect(actionNames).toContain('resetAction')
    expect(actionNames).toContain('clearAction')
  })

  test('should return redux action without payload', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addResetAction()

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { resetAction } = actions

    expect(typeof resetAction).toBe('function')

    const reduxAction = resetAction()
    const expected = {
      type: '@@moduleName/RESET'
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(resetAction([])).toStrictEqual(expected)
  })

  test('should return redux action without payload when creating with reset props', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addResetAction('clearSelectors', ['one', 'two'])

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { clearSelectorsAction } = actions

    expect(typeof clearSelectorsAction).toBe('function')

    const reduxAction = clearSelectorsAction()
    const expected = {
      type: '@@moduleName/CLEAR_SELECTORS'
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(clearSelectorsAction([])).toStrictEqual(expected)
  })
})
