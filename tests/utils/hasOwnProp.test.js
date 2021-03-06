import { hasProp } from '../../src/utils'

describe('test hasProp()', () => {
  test('should have own props', () => {
    const object = { a: 1 }

    expect(hasProp(object, 'a')).toBe(true)
    expect('a' in object).toBe(true)
  })

  test('should not have own props but have in prototype chain', () => {
    const object = { a: 1 }

    expect(hasProp(object, 'constructor')).toBe(false)
    expect('constructor' in object).toBe(true)
  })
})
