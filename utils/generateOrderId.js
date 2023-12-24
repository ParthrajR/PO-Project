const ShipVia = require("../Models/shipViaModel")


async function generateShipviaId() {
    // Get the current year
    const currentYear = new Date().getFullYear();
    const nextYear = currentYear + 1;
    const finalNextYear = nextYear.toString().slice(-2);
    // Format the ID with "SG POP/{currentYear}/" and a four-digit sequence number
    const formattedId = `SG POP/${currentYear}-${finalNextYear}/`;
  
    // Fetch or generate the sequence number (you can replace this logic as needed)
    const sequenceNumber = await getNextSequenceNumber();
    console.log(sequenceNumber)
    // Add the sequence number to the ID, padding with zeros to ensure it's four digits
    const paddedSequenceNumber = String(sequenceNumber).padStart(4, '0');
  
    // Combine all parts to form the final ID
    const finalId = `${formattedId}${paddedSequenceNumber}`;
  
    return finalId;
  }
  
  // Example function to fetch or generate the next sequence number
  async function getNextSequenceNumber() {
    // In a real scenario, you might fetch the next sequence number from a database or other source
    // For this example, we'll use a simple counter. You should replace this with your own logic.
    const lastShipViaRecord = await ShipVia.findOne({}, {}, { sort: { 'createdAt' : -1 } });
    console.log(lastShipViaRecord)

    if (!lastShipViaRecord) {
      // If there are no existing records, start with 1
      return 1;
    } else {
      // Increment the last sequence number
      const lastId = lastShipViaRecord.purchaseOrderNo.toString().slice(-4)
      const nextId = parseInt(lastId) + 1;
      console.log("nexxxtttt", typeof(lastId), nextId);
      return nextId;
    }
  }

  module.exports = { generateShipviaId }