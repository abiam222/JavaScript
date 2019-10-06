const func = require('./sum');


beforeEach(() => {
  console.log('the tongue')
});

test('adds 1 + 2 to equal 3', () => {
  expect(func.sum(1, 2)).toBe(3);
});

test('two plus two is four', () => {
  expect(func.sum(2,2)).toEqual(4);
});

test('object assignment', () => {
  expect(func.data()).toEqual({one: 1, two: 2});
});

test('is function getUndefined undefined', () => {
  expect(func.getUndefined()).toBeUndefined();
})

test('adding positive numbers is not zero', () => {
  for (let a = 1; a < 10; a++) {
    for (let b = 1; b < 10; b++) {
      expect(func.sum(a,b)).not.toBe(0);
    }
  }
});

test('getPromise returns correct promise data', () => {
  // return func.getPromise().then(data => {
  //   expect(data).toBe('peanut butter')
  // })
  //or
  return expect(func.getPromise()).resolves.toBe('peanut butter')
  //or async await in next function test call
});

test('getPromise return correct await data', async () => {
   // const data = await func.getPromise();
  //  expect(data).toBe('peanut butter') 
  //or
  //await expect(func.getPromise()).resolves.toBe('peanut butter');
});

//toBe uses Object.is to test exact equality. 
//If you want to check the value of an object, use toEqual instead:

  // toBe and toEqual are equivalent for numbers
  // expect(value).toBe(4);
  // expect(value).toEqual(4);