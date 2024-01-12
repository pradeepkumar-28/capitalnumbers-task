// import { employees } from "../../components/Table/Data";
import { faker } from "@faker-js/faker";

const getRandomIndices = (count, min, max) => {
  const indices = new Set();

  while (indices.size < count) {
    indices.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  return Array.from(indices);
};
const generateFakeData = () => {
  const fakeData = [];
  const randomHeadIndices = getRandomIndices(10, 1, 20);
  for (let i = 0; i <= 20; i++) {
    const isRandomHead = randomHeadIndices.includes(i + 1);

    const dataEntry = {
      ID: i + 1,
      Head_ID: isRandomHead ? Math.floor(Math.random() * 20) + 1 : -1,
      Full_Name: faker.person.fullName(),
      Prefix: faker.person.prefix(),
      Title: faker.person.jobTitle(),
      City: faker.location.city(),
      State: faker.location.state(),
      Email: faker.internet.email(),
      Skype: faker.internet.userName(),
      Mobile_Phone: faker.phone.number(),
      Birth_Date: faker.date.past().toISOString().split("T")[0],
      Hire_Date: faker.date.past().toISOString().split("T")[0],
      Image: faker.image.avatar(), // Random image from Lorem Picsum
    };

    fakeData.push(dataEntry);
  }

  return fakeData;
};

// Example usage
const fakeDataArray = generateFakeData();

// INITIAL STAGE DATA SET
const initialState = [
  {
    employeesData: fakeDataArray,
  },
];

const tableDataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_EMPLOYEE_DATA":
      return {
        ...state,
        employeesData: action.payload,
      };

    default:
      return state;
  }
};

export default tableDataReducer;
