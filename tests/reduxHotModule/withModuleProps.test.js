import { connect } from 'react-redux'
import { ReduxHotModule } from '../../src/reduxHotModule'

jest.mock('react-redux', () => ({
  connect: jest.fn((mapStateToProps, mapDispatchToProps) => (component) => component)
}))

describe('test withModuleProps()', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call react-redux connect() with proper args', () => {
    const ml = new ReduxHotModule('moduleName')
    const { mapStateToProps, mapDispatchToProps } = ml.create()

    expect(typeof mapStateToProps).toBe('function')
    expect(typeof mapDispatchToProps).toBe('object')
    expect(connect).toHaveBeenCalledTimes(1)
    expect(connect).toHaveBeenCalledWith(mapStateToProps, mapDispatchToProps)
  })
})
