import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test reset reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should always return defaultState even if preloadedState is provided', () => {
    const ml = new ReduxHotModule('moduleName', { items: [1, 2, 3] })

    ml.addParamAction('items')
    ml.addResetAction()

    const { actions, reducer, defaultState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof defaultState).toBe('object')

    const { resetAction } = actions

    expect(reducer(undefined, resetAction())).toBe(defaultState)
    expect(reducer({}, resetAction())).toBe(defaultState)
  })
})
