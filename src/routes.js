const express = require ("express");
const routes = express.Router();

const planetController = require("../Controller/PlanetController");
const SateliteController = require("../Controller/SateliteController");


routes.post("/planets" , planetController.store);
routes.get("/planets" , planetController.get);
routes.put("/planets/:id" , planetController.update);
routes.delete("/planets/:id" , planetController.delete);

routes.post("/planets/:planetId/satelites" , SateliteController.store);
routes.get("/planets/:planetId/satelites" , SateliteController.get);

module.exports = routes;