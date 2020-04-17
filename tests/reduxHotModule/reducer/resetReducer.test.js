import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test reset reducer', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should reset state to default', () => {
    const ml = new ReduxHotModule('moduleName')

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

  test('should reset only specific state params', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('item1')
    ml.addParamAction('item2')
    ml.addParamAction('item3', 'value')

    ml.addResetAction('resetOdd', ['item1', 'item3'])

    const { actions, reducer, defaultState } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof reducer).toBe('function')
    expect(typeof defaultState).toBe('object')

    const { resetOddAction } = actions

    const state = {
      item1: {},
      item2: {},
      item3: {}
    }

    const expected = {
      item1: null,
      item2: {},
      item3: 'value'
    }

    expect(reducer(state, resetOddAction())).toStrictEqual(expected)
  })
})
