const Planet = require("../models/Planet");
const Satelite = require("../models/Satelite");


module.exports = {
  async store (req, res) {
    const { planetId } = req.params;
    const { name , serial_number } = req.body;

    const planet = await Planet.findByPk(planetId);

  if(!planet) {
    res.status(404).send(`Esse planeta nao existe`);
  }
  const satelite = await Satelite.create({ name, serial_number, planetId });
  return res.json(satelite);
  } ,

async get (req , res){
  const { planetId } = await req.params;
  const planet = await Planet.findByPk(planetId , {
    include : Satelite,
  });
  

  res.json(planet);
}


}