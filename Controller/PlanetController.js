const Planet = require('../models/Planet');

module.exports = {
  async store(req , res){
    const {name , position} = req.body;

    const planet = await Planet.create({ name, position });

    return res.status(200).json(planet);
  },

  async get(req , res){
    const planet = await Planet.findAll();

    return res.status(200).json(planet);
  },

  async update(req , res){
     const {  name , position } = req.body;
    const { id } = req.params;
    
    const planet = await Planet.findByPk(id);
    
    await planet.update({ name , position });

    return res.status(200).json(planet);
  },

  async delete(req, res) {
  

   
    await Planet.destroy({
      where : {
        id : req.params.id
      },
    });
    return res.status(200).send(`Deletado com sucesso!`);
  }

}