const Cap = require ("../models/Cap");

module.exports = {
  async store (req , res) {
    const { name , registerNumber } = req.body;
    const cap = await Cap.create({name , registerNumber});

    res.status(202).json(cap);
  },
  async get (req, res) {
    const cap = await Cap.findAll();

    res.status(202).json(cap)
  }
}