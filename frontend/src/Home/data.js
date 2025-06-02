import { faker } from '@faker-js/faker';

function transactionBuilder() {
  let count = 0;
  return () => {
    return {
      id: count++,
      date: faker.date.recent({ days: 10 }),
      amount: faker.number.float({ min: -1_000, max: 1_000, fractionDigits: 3 }),
      vendor: faker.company.name(),
    }
  }
}
const buildTransaction = transactionBuilder();
const data = Array(15).fill(null).map(() => buildTransaction());

export default data;
