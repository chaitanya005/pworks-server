const express = require("express");
const jsonfile = require("jsonfile");
const { faker } = require("@faker-js/faker");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());

const generateFakeData = () => {
  let data = [];
  for (let i = 0; i < 250; i++) {
    const record = {
      Name: faker.person.fullName(),
      Email: faker.internet.email(),
      Age: faker.date.birthdate({ min: 22, max: 60, mode: "age" }),
      YearsOfExperience: faker.number.int({ min: 1, max: 20 }),
      PositionApplied: faker.person.jobTitle(),
      DateOfApplication: faker.date.between({
        from: faker.date.past(),
        to: new Date(),
      }),
      StatusOfApplication: faker.string.fromCharacters([
        "approved",
        "rejected",
        "waiting",
      ]),
    };
    data.push(record);
  }
  jsonfile.writeFile("persons_data", data);
};

app.get("/api/v1/candidates", async (req, res) => {
  const data = await jsonfile.readFile("persons_data");
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("Helo");
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
  generateFakeData();
});
