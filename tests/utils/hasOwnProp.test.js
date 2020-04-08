import { hasOwnProp } from '../../src/utils'

describe('test hasOwnProp()', () => {
  test('should have own props', () => {
    const object = { a: 1, b: 2 }

    expect(hasOwnProp(object, 'a')).toBe(true)
    expect(hasOwnProp(object, 'b')).toBe(true)

    expect('a' in object).toBe(true)
    expect('b' in object).toBe(true)
  })

  test('should not have own props but have in prototype chain', () => {
    const object = { a: 1, b: 2 }

    expect(hasOwnProp(object, 'constructor')).toBe(false)
    expect(hasOwnProp(object, 'toString')).toBe(false)

    expect('constructor' in object).toBe(true)
    expect('toString' in object).toBe(true)
  })
})
