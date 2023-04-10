const states = require("../assets/states.json");
const cities = require("../assets/cities.json");
const State = require("../models/state.schema");
const City = require("../models/city.model");

exports.seedStateCityData = async () => {
  const stateCount = await State.countDocuments();
  if (stateCount == 0) {
    const indianStates = states.filter((x) => x.countryCode === "IN");
    await State.insertMany(indianStates);
  }
  const cityCount = await City.countDocuments();
  if (cityCount == 0) {
    const indianCities = cities.filter((x) => x.countryCode === "IN");
    await City.insertMany(indianCities);
  }
};
