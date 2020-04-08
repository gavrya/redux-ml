import { mergeProps } from '../../src/utils'

describe('test mergeProps()', () => {
  test('should return the original target object when the source object is invalid', () => {
    const target = { a: 1, b: 2 }

    expect(mergeProps(target)).toBe(target)
    expect(mergeProps(target, null)).toBe(target)
    expect(mergeProps(target, undefined)).toBe(target)
    expect(mergeProps(target, false)).toBe(target)
    expect(mergeProps(target, true)).toBe(target)
  })

  test('should return new target object when the source object is empty', () => {
    const target = { a: 1, b: 2 }
    const source = {}

    expect(mergeProps(target, source)).not.toBe(target)
    expect(mergeProps(target, source)).toStrictEqual(target)
  })

  test('should not merge source props that do not exist in the target object', () => {
    const target = { a: 1, b: 2 }
    const source = { c: 1, d: 2 }

    expect(mergeProps(target, source)).not.toBe(target)
    expect(mergeProps(target, source)).toStrictEqual(target)
  })

  test('should merge source props that exist in the target object', () => {
    const target = { a: 1, b: 2, c: 3, d: 4 }
    const source = { c: 333, d: 444, e: 5, f: 6 }
    const expected = { a: 1, b: 2, c: 333, d: 444 }

    expect(mergeProps(target, source)).not.toBe(target)
    expect(mergeProps(target, source)).toStrictEqual(expected)
  })
})
