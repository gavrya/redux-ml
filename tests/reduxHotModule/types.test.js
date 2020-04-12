import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test types', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected types', () => {
    const ml = new ReduxHotModule('moduleName')

    ml.addParamAction('isLoading', false)
    ml.addParamAction('data', [])

    ml.addEventAction('loadEvent')
    ml.addEventAction('loadedEvent')

    ml.addResetAction('reset')
    ml.addResetAction('resetAll')

    const { types } = ml.create()

    const expectedTypes = {
      MODULE_NAME_IS_LOADING: '@@moduleName/IS_LOADING',
      MODULE_NAME_DATA: '@@moduleName/DATA',
      MODULE_NAME_LOAD_EVENT: '@@moduleName/LOAD_EVENT',
      MODULE_NAME_LOADED_EVENT: '@@moduleName/LOADED_EVENT',
      MODULE_NAME_RESET: '@@moduleName/RESET',
      MODULE_NAME_RESET_ALL: '@@moduleName/RESET_ALL'
    }

    expect(Object.keys(types)).toHaveLength(6)
    expect(types).toStrictEqual(expectedTypes)
  })

  test('should return empty types if they were not added', () => {
    const ml = new ReduxHotModule('moduleName')
    const { types } = ml.create()

    expect(Object.keys(types)).toHaveLength(0)
  })
})
