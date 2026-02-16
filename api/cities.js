import db from "./db.json"

export default function handler(req, res) {
  // تنظیم هدرها
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")
  res.setHeader("Content-Type", "application/json; charset=utf-8")

  // فقط متد GET رو قبول کن
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" })
  }

  try {
    const { id, name, province, country, popular, search } = req.query
    let cities = db.cities

    // فیلتر بر اساس id (دریافت یک شهر خاص)
    if (id) {
      const city = cities.find(c => c.id === parseInt(id))
      if (!city) {
        return res.status(404).json({ message: "شهر یافت نشد" })
      }
      return res.status(200).json(city)
    }

    // فیلتر بر اساس نام دقیق
    if (name) {
      cities = cities.filter(c => 
        c.name.includes(name)
      )
    }

    // فیلتر بر اساس استان
    if (province) {
      cities = cities.filter(c => 
        c.province.includes(province)
      )
    }

    // فیلتر بر اساس کشور
    if (country) {
      cities = cities.filter(c => 
        c.country === country
      )
    }

    // فیلتر شهرهای محبوب
    if (popular === "true") {
      cities = cities.filter(c => c.popular === true)
    }

    // جستجوی عمومی (هم در نام شهر، هم استان، هم کشور)
    if (search) {
      cities = cities.filter(c => 
        c.name.includes(search) || 
        c.province.includes(search) || 
        c.country.includes(search) ||
        c.airports.some(airport => 
          airport.name.includes(searchQuery) || 
          airport.code.includes(searchQuery.toUpperCase())
        )
      )
    }

    // برگردوندن نتایج
    res.status(200).json(cities)
  } catch (error) {
    console.error("Error in cities API:", error)
    res.status(500).json({ error: "خطای سرور" })
  }
}
