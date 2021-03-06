import { mergeProps } from '../../src/utils'

describe('test mergeProps()', () => {
  test('should merge source props that exist only in props arg', () => {
    const target = { a: 1, b: 2, c: 3, d: 4 }
    const source = { c: 333, d: 444, e: 5, f: 6 }
    const expected = { a: 1, b: 2, c: 333, d: 4 }
    const props = ['c']

    expect(mergeProps(target, source, props)).not.toBe(target)
    expect(mergeProps(target, source, props)).toStrictEqual(expected)
  })
})
