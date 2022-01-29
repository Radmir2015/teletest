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
  return fakeDelay(async () => {
    res.json(await db.getPeoplePaginated(req.query.limit, req.query.offset));
  }, 1500)

  // for whole list
  return fakeDelay(async () => {
    res.json(await db.getAllPeople());
  }, 1500)
});

app.get("/people/count", async (req, res) => {
  res.json({ total: (await db.getPeopleCount())[0]})
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
