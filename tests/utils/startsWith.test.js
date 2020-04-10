import { startsWith } from '../../src/utils'

describe('test startsWith()', () => {
  test('should starts with', () => {
    expect(startsWith('redux', 're')).toBe(true)
    expect(startsWith('10redux', 10)).toBe(true)
    expect(startsWith('10redux', '10')).toBe(true)
    expect(startsWith('10redux', '10red')).toBe(true)
    expect(startsWith('BOX', 'BO')).toBe(true)
    expect(startsWith('HELLO', 'HE')).toBe(true)
  })

  test('should not starts with', () => {
    expect(startsWith('yellow', 'black')).toBe(false)
    expect(startsWith('brown', 'Brown')).toBe(false)
    expect(startsWith('REDUX', 'Re')).toBe(false)
    expect(startsWith('REDUX', 'black')).toBe(false)
    expect(startsWith('REDUX', 'REDUXER')).toBe(false)
  })

  test('should return false for non-string values', () => {
    expect(startsWith(null, 'text')).toBe(false)
    expect(startsWith(undefined, 'text')).toBe(false)
    expect(startsWith(NaN, 'text')).toBe(false)
    expect(startsWith(123, 'text')).toBe(false)
    expect(startsWith(new Date(), 'text')).toBe(false)
  })

  test('should return true when searching empty in empty string', () => {
    expect(startsWith('', '')).toBe(true)
  })
})
