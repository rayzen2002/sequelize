const express = require ("express");
const routes = express.Router();

const planetController = require("../Controller/PlanetController");
const SateliteController = require("../Controller/SateliteController");
const CapController = require("../Controller/CapController");
const SpaceshipController = require("../Controller/SpaceshipController");


routes.post("/planets" , planetController.store);
routes.get("/planets" , planetController.get);
routes.put("/planets/:id" , planetController.update);
routes.delete("/planets/:id" , planetController.delete);

routes.post("/planets/:planetId/satelites" , SateliteController.store);
routes.get("/planets/:planetId/satelites" , SateliteController.get);

routes.post("/cap" , CapController.store);
routes.get("/cap" , CapController.get);

routes.post("/caps/:capId/spaceships" , SpaceshipController.store);
routes.get("/caps/:capId/spaceships" , SpaceshipController.get);

module.exports = routes;