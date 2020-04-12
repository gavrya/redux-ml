import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test mapStateToProps()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return module state from redux state', () => {
    const ml = new ReduxHotModule('moduleName')
    const { namespace, mapStateToProps } = ml.create()

    expect(typeof namespace).toBe('string')
    expect(typeof mapStateToProps).toBe('function')

    const moduleState = {}
    const reduxState = { [namespace]: moduleState }

    expect(mapStateToProps(reduxState)).toBe(moduleState)
  })
})
