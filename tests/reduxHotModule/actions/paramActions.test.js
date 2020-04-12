import { ReduxHotModule } from '../../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test param actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should have expected name', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', false)

    const { actions } = ml.create()

    expect(typeof actions).toBe('object')

    const actionNames = Object.keys(actions)

    expect(actionNames).toHaveLength(1)
    expect(actionNames).toContain('itemsAction')
  })

  test('should return redux action with default value', () => {
    const ml = new ReduxHotModule('moduleName')

    const defaultValue = []

    ml.addParamAction('items', defaultValue)

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { itemsAction } = actions

    expect(typeof itemsAction).toBe('function')

    const reduxAction = itemsAction()
    const expected = {
      type: '@@moduleName/ITEMS',
      payload: {
        items: defaultValue
      }
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload.items).toBe(defaultValue)
  })

  test('should return redux action with provided value', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('items', [])

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { itemsAction } = actions

    expect(typeof itemsAction).toBe('function')

    const value = ['one', 'two']
    const reduxAction = itemsAction(value)
    const expected = {
      type: '@@moduleName/ITEMS',
      payload: {
        items: value
      }
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
    expect(reduxAction.payload.items).toBe(value)
  })

  test('should return redux action with null value if action added without default value', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('selectedItem')

    const { actions } = ml.create()

    expect(Object.keys(actions)).toHaveLength(1)

    const { selectedItemAction } = actions

    expect(typeof selectedItemAction).toBe('function')

    const reduxAction = selectedItemAction()
    const expected = {
      type: '@@moduleName/SELECTED_ITEM',
      payload: {
        selectedItem: null
      }
    }

    expect(typeof reduxAction).toBe('object')
    expect(reduxAction).toStrictEqual(expected)
  })
})
