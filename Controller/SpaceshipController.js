const Spaceship = require("../models/Spaceship");
const Cap = require("../models/Cap");

module.exports = {
  async store (req , res) {
    const { capId } = req.params;
    const { name , capacity } = req.body;
    const cap = await Cap.findByPk(capId);

    if(!cap){
      res.send("Capitao nao existe!");
    }
    const [spaceships] = await Spaceship.findOrCreate({
      where: { name, capacity },
    });
    console.log(`asdf ${spaceships}`)
    await cap.addSpaceship(spaceships);
    return res.json(spaceships)
  },
  async get (req, res) {
    const { capId } = req.params;
    const cap = await Cap.findByPk(capId , {
      include : { association : "spaceships" },
    });

    return res.json(cap);
  }
}
