const TarantoolConnection = require("tarantool-driver");
const { processData } = require("./utils");
const db = new TarantoolConnection("guest::3301");

const getAllPeople = async () => {
  try {
    return processData(
      await db.select(512, 0, 10000, 0, "all", []),
      await db.call("getFormat")
    );
  } catch (e) {
    console.error(e);
  }
};

const getPeoplePaginated = async (limit = 3, offset = 0) => {
  try {
    return processData(
      await db.select(512, 0, limit, offset, "all", []),
      await db.call("getFormat")
    );
  } catch (e) {
    console.error(e);
  }
};

const getPeopleCount = async () => (await db.call("countPeople"))[0];

module.exports = { getAllPeople, getPeoplePaginated, getPeopleCount }