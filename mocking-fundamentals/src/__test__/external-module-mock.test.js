const thumbWar = require('../thumb-war')
const utils = require('../utils')

jest.mock('../utils')

test('return winner', () => {
  const winner  = thumbWar('Adib Firman', 'Firman Ken')
  expect(winner).toBe('Adib Firman')
  expect(utils.getWinner).toHaveBeenCalledTimes(2)
  expect(utils.getWinner).toHaveBeenCalledWith('Adib Firman', 'Firman Ken')
  expect(utils.getWinner).toHaveBeenNthCalledWith(1, 'Adib Firman', 'Firman Ken')
  expect(utils.getWinner).toHaveBeenNthCalledWith(2, 'Adib Firman', 'Firman Ken')

  // cleanup
  utils.getWinner.mockReset()
})
