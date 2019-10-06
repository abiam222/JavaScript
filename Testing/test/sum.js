function sum(a, b) {
  return a + b;
}

function data() {
  const data = {one: 1};
  data['two'] = 2;
  return data;
}

function getUndefined() {
  return undefined;
}

function getPromise() {
  return new Promise( (resolve, reject) => {
    resolve('peanut butter')
  })
}

module.exports = {
  sum,
  data,
  getUndefined,
  getPromise
}