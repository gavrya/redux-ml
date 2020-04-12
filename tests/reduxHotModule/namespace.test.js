import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test namespace', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected module namespace', () => {
    const moduleName = 'moduleName'

    const ml = new ReduxHotModule(moduleName)
    const { namespace } = ml.create()

    expect(typeof namespace).toBe('string')
    expect(namespace).toBe(`@@${moduleName}`)
  })

  test('should throw an error when used non-string module namespace', () => {
    expect(() => new ReduxHotModule().create()).toThrow(TypeError)
    expect(() => new ReduxHotModule(null).create()).toThrow(TypeError)
    expect(() => new ReduxHotModule(undefined).create()).toThrow(TypeError)
    expect(() => new ReduxHotModule(true).create()).toThrow(TypeError)
  })
})
