(async () =>{
  const Planet = require('./models/Planet');

  const newPlanet = await Planet.create({
    name: 'Venus',
    position: 5,
  });
  console.log(newPlanet);
} )();