import db from "./db.json"

export default function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")

  if (req.method === "GET") {
    const { origin, destination, date } = req.query

    let flights = db.flights

    if (origin) {
      flights = flights.filter(f => f.origin === origin)
    }

    if (destination) {
      flights = flights.filter(f => f.destination === destination)
    }

    if (date) {
      flights = flights.filter(f => f.departureDate === date)
    }

    res.status(200).json(flights)
  }
}
