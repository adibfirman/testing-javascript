import {getFormattedValue} from '../utils'

test('should format the money', () => {
  expect(getFormattedValue('1234.0')).toBe('1,234.0')
})
