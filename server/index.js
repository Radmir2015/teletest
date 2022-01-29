const express = require("express");
const db = require("./db");
const path = require('path');
const { fakeDelay } = require("./utils");
const app = express();

const port = 3000;

app.use(express.static('public'));

app.get("/", async (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.get("/people", async (req, res) => {
  console.log(req.query)
  return fakeDelay(async () => {
    res.json(await db.getPeoplePaginated(req.query.limit, req.query.offset, req.query.sortBy, req.query.sortDesc));
  }, 3000)

  // for whole list
  return fakeDelay(async () => {
    res.json(await db.getAllPeople());
  }, 3000)
});

app.get("/people/count", async (req, res) => {
  res.json({ total: (await db.getPeopleCount())[0]})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
