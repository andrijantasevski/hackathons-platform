const { faker } = require("@faker-js/faker");
const fs = require("fs");

const getRandomIntegerInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const selectRandomElementFromArray = (arrayElements = []) => {
  const randomIntegerFromArrayLength = () => Math.floor(Math.random() * arrayElements.length);

  return arrayElements[randomIntegerFromArrayLength()];
};

const acadamies = ["FE", "FS", "UX/UI", "QA", "PPM"];

const presence = ["live", "online"];

const foodPreferences = ["vegan", "vegetarian"];

const team = [1, 2, 3, 4, 5, 6, 7, 8];

const hackathonPeople = [...Array(350)].map(() => {
  const hackathonPerson = {
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    academy: selectRandomElementFromArray(acadamies),
    phoneNumber: faker.phone.number(),
    email: faker.internet.email(),
    presence: selectRandomElementFromArray(presence),
    foodPreferences: selectRandomElementFromArray(foodPreferences),
    team: selectRandomElementFromArray(team),
  };

  return hackathonPerson;
});

fs.writeFileSync("./hackathonData.json", JSON.stringify(hackathonPeople), "utf-8");
