const processData = (data, format) =>
  data.map((person) =>
    format[0].reduce((acc, curr, i) => ({ ...acc, [curr.name]: person[i] }), {})
  );

const fakeDelay = (func, delay) => setTimeout(() => func(), delay)

module.exports = { processData, fakeDelay }