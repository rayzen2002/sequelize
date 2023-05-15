const Cap = require("../models/Cap");
const Planet = require("../models/Planet");
const Satelite = require("../models/Satelite");
const Spaceship = require("../models/Spaceship");

Planet.hasMany(Satelite , { onDelete : "CASCADE" , onUpdate : "CASCADE" });
Satelite.belongsTo(Planet , { foreignKey : "planetId" , as : "planet"  });

Cap.belongsToMany(Spaceship , {
  foregeinKey : "capId",
  through : "capSpaceship",
  as : "spaceships"
});
Spaceship.belongsToMany(Cap , {
  foregeinKey : "spaceshipId",
  through : "capSpaceship",
  as : "caps",
})

module.exports = {Planet , Satelite , Cap , Spaceship};