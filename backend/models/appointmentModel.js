var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var slot = require("./slotModel");

var appointmentSchema = new Schema(
  {
    client: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    time: { type: Number, enum: [1, 2, 3, 4] }, // 1 === 9 AM, 2 === 10 AM
    date: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);

/*

const appointments = await Appointment.find({date: today}) //look up how to search by date in Mongodb
const appointments = await Appointment.find({technician: someId,  date: somedate})


*/

// no appointments
// => map all 24 slots (1 hour per slot) as free

// some appointments
// => map 24 slots but make certain slots unavailable based on the result returned by BE

// you need an array of appointment time
// appointments = [1, 2]

// FRONT-END ----
// To map out all the slots and check if they are available or not
// starts from 9 am -> 6 pm
/* const getDates = () => {
  let slots = []
 for (let i = 0; i < 10; i++) {
 if (appointments.includes(i + 1)) {
   slots.push("booked")
 }
 else {
   slots.push("available")
 }
 }
}

slots === ["booked", "booked", "available","available","available","available","available","available","available"]

*/
