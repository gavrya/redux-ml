import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test mapDispatchToProps', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should be equal to actions', () => {
    const ml = new ReduxHotModule('moduleName')
    const { actions, mapDispatchToProps } = ml.create()

    expect(typeof actions).toBe('object')
    expect(typeof mapDispatchToProps).toBe('object')
    expect(mapDispatchToProps).toBe(actions)
  })
})
