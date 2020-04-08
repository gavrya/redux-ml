import { toConst } from '../../src/utils'

describe('test toConst()', () => {
  test('should throw an error for non-string values', () => {
    expect(() => toConst(null)).toThrow(TypeError)
    expect(() => toConst(undefined)).toThrow(TypeError)
    expect(() => toConst(NaN)).toThrow(TypeError)
    expect(() => toConst(123)).toThrow(TypeError)
    expect(() => toConst(new Date())).toThrow(TypeError)
  })

  test('should convert empty string to empty string', () => {
    expect(toConst('')).toBe('')
  })

  test('should not replace whitespaces', () => {
    expect(toConst('  ')).toBe('  ')
    expect(toConst('he ll  o')).toBe('HE LL  O')
    expect(toConst('hel   lo')).toBe('HEL   LO')
  })

  test('should not replace non-word chars', () => {
    expect(toConst('he--ll__o')).toBe('HE--LL__O')
    expect(toConst('h+el@#$*)lo')).toBe('H+EL@#$*)LO')
    expect(toConst('@)(hel*^lo')).toBe('@)(HEL*^LO')
  })

  test('should convert digit string to digit string', () => {
    expect(toConst('2')).toBe('2')
  })

  test('should convert single lowercase char to single uppercase char', () => {
    expect(toConst('b')).toBe('B')
  })

  test('should convert multiple lowercase chars to the multiple uppercase chars', () => {
    expect(toConst('bbb')).toBe('BBB')
  })

  test('should convert single uppercase char to the single uppercase char', () => {
    expect(toConst('B')).toBe('B')
  })

  test('should convert multiple uppercase chars to the multiple uppercase chars each prefixed with underscore except the first one', () => {
    expect(toConst('BBB')).toBe('B_B_B')
  })

  test('should convert the entire string with a digit at the start to uppercase string without digit separation', () => {
    expect(toConst('2hello')).toBe('2HELLO')
  })

  test('should convert the entire string with a digit at the end to uppercase string without digit separation', () => {
    expect(toConst('hello2')).toBe('HELLO2')
  })

  test('should convert camel-cased strings without digits inside', () => {
    expect(toConst('searchResults')).toBe('SEARCH_RESULTS')
    expect(toConst('SearchResults')).toBe('SEARCH_RESULTS')
    expect(toConst('oneTwoThreeFour')).toBe('ONE_TWO_THREE_FOUR')
  })

  test('should convert camel-cased strings with digits inside', () => {
    expect(toConst('searchResults42')).toBe('SEARCH_RESULTS42')
    expect(toConst('Step1')).toBe('STEP1')
    expect(toConst('loadPage25')).toBe('LOAD_PAGE25')
    expect(toConst('page25Results')).toBe('PAGE25_RESULTS')
    expect(toConst('22pageResults')).toBe('22PAGE_RESULTS')
  })
})
