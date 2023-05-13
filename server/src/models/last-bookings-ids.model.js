const mongoose = require("mongoose");

// Define schema for last booking IDs
const lastBookingIdsSchema = new mongoose.Schema({
  lastServiceBookingId: { type: Number, default: 0 },
  lastPropertyBookingId: { type: Number, default: 0 },
});

const LastBookingIds = mongoose.model("LastBookingIds", lastBookingIdsSchema);

async function generateBookingId(type) {
  const doc = (await LastBookingIds.findOne()) || new LastBookingIds();

  let prefix, newId;
  if (type === "service") {
    prefix = "EzstayS";
    newId = doc.lastServiceBookingId + 1;
    doc.lastServiceBookingId = newId;
  } else if (type === "property") {
    prefix = "EzstayP";
    newId = doc.lastPropertyBookingId + 1;
    doc.lastPropertyBookingId = newId;
  } else {
    throw new Error(`Invalid booking type: ${type}`);
  }

  await doc.save();
  return `${prefix}${newId.toString().padStart(8, "0")}`;
}

module.exports = { LastBookingIds, generateBookingId };
