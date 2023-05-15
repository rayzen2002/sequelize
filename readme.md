# Learning ORM

<aside>
💡 I will document on this readme my process learning a specific topic, my thoughts, questions and the “answers” that I gave to myself after some googles and chatGPTs conversations.This is actually a way to train my English writing, so don't judge my text 😢

</aside>

First use of ORM, I will start using Sequelize with a Postgres Database.

- The first question is, What is an ORM?

⇒ Lets say that an ORM is the guy(Software Layer) who will sit betwen our code and our database, allowing us to work with database tables and records as if they were objects.

- Why use an ORM?

⇒ Using an ORM can have benefits and drawbacks. O one hand we can generate optimized SQL statements and provide build-in caching, which can improve query performance.On the other hand, ORM can add layers of abstraction, which may lead to slower query execution times, especially for complex queries.

After the first questions that I have answered, lets begin…

Lets beggin creating a paste to our studies:

```jsx
mkdir learning_sequelize

code .
```

on VSCode terminal, lets start with npm init -y, to create our package.json

```jsx
npm init -y
```

With our manifest arquive done, lets install our dependencies:

```jsx
npm install sequelize pg pg-hstore express
```

Note that the pg-hstore is the connection with our database, in this case I am using the Postgress Database. After that we need to install the sequelize-cli dependence:

```jsx
sudo npm install -g sequelize-cli
```

- And you may ask, what is an CLI?

Well, an CLI is a Command Line Interface used to run programs, manage computer files and interact with the computer. In this case we are using the sequelize-cli which will provide a set of helpful commands to manage our database Schema, migrations and seed data.

Lets begin to use the CLI then.

```jsx
sequelize-cli init
```

After that, a structure will be created to us, structure that will guide us on the process of using Sequelize to interact with our Database.

The first step is changing the arquive config.json, turning it on config.js to pass our Database information.

```jsx
module.exports = {
  dialect : "postgres",
  host : "localhost",
  username : "emanuel", 
  password : "******", 
  database : "learning_sequelize",
  define: {
    timestamps: true
  },
};
//Note that we need to give the same information 
//of our Database on username and password
```

Lets see if this works, we gonna run this on our VScode terminal.

```jsx
sequelize db:create
```

After the database created, we gonna start to use migrations, and then you may ask.

- What is a migration?

A migration is the process of making a change to the structure or data of a database, while preserving the existing data.

To do that, we go to our VScode terminal again.

```jsx
sequelize migration:create --name=NAMEOFYOURTABLE
```

After that a migration archive will be created, containing two functions, up and down, used to create and drop the table desired following the structure that you put on these functions.

```jsx
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('yourtablename', {
//The columns of your table
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull : false,
      },
      position : {
        type : Sequelize.INTEGER,
        allowNull : false,
      },
      
			//default columns controled by the ORM
			createdAt : {
        type : Sequelize.DATE  
      },
      updatedAt : {
        type : Sequelize.DATE
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('planets');
  }
};
```

As you can see, this migrate creates a table that contains the columns: id, name, position, createdAt and updateAt. Well, this is the schema, we need first run the command on our terminal:

```jsx
sequelize db:migrate
```

After that our table is created on our Database, you can check on the terminal or in a visual form with the pgAdmin(in the case you are using Postgres to).Then we can use another command that defines the migrates usage propurses.

```jsx
sequelize db:migrate:undo
```

This will drop the table from our Database (using the function down) but our migrate archive will remain untouchable, with represents the concept of a migrate, changing things but preserving our structure which can be used again to create the table with the parameters passed on the up function, making the creation and deletion of tables easier than using pure SQL code.

After our table created, we gonna try to insert values via ORM.

Lets create an archive on config called sequelize.js.

```jsx
const Sequelize = require ("sequelize");
const database = require ("./config");

const sequelize = new Sequelize(database);

module.exports = sequelize;
```

This code will make our instance of database follow the structure of our config archive created back then. Now we gonna create a model that use this new instance builded on the code above. Create a new arquive called YourtableName.js on the models folder.

```jsx
const { DataTypes } = require ("sequelize");
const sequelize = require("../config/sequelize");

const YourTableName = sequelize.define("yourtablename" , {
	name : DataTypes.STRING,
	position : DataTypes.INTEGER,
});

module.exports = YourTableName;
```

To run this code, we gonna create an index.js to test if we are already doing things via sequelize properly.

```jsx
(async ()=>{
	const YourTableName = require("./models/YourTableName");
	
	const newYourTableName = await YourTableName.create({
		name : "NameDesiredForColumn",
		position : "PositionDesiredForColumn"

//The name and position are propertys that I am using on my planets table
//but here you give the propertys that you need for yours(Remember that
//everything here are already done on setup archives).
	})
})
```

Now we run on our terminal to test if things are going as we want.

```jsx
node index.js
```

If everything is ok, we have now a table called yourtablename with the data of our index.js archive on our Database, created via Sequelize. 

Now we gonna try to consult our Data via Sequelize.

```jsx
(async ()=>{
	const YourTableName = require("./models/YourTableName");
	
	//const newYourTableName = await yourtablename.create({
	//	name : "NameDesiredForColumn",
	//	position : "PositionDesiredForColumn"
	// Comment this part to dont create another row on your 
	// table.
	const seeYourTableName = await YourTableName.findAll();

	console.log(seeYourTableName);

	})
})
```

This will replace the Querie Select * FROM yourtablename and will show our data on the console.

We can use findByPk() Method instead of findAll() to filter with primary key. We can do refined search like on SQL, doing this.

```jsx
const seeYourTableName = await YourTableName.findAll({
	where : {
		property : value, //Syntax similar to WHERE on SQL
};
});
```

We are on the middle of our CRUD now, we can Create and Read already, now lets wrap to the Update part and after the Delete one.

```jsx
const updateYourTableName = await YourTableName.findByPk(id);
updateYourTableName.property = newValue;
await updateYourTableName.save();
```

To complete our CRUD we gonna do the Delete part now.

```jsx
const deleteYourTableName = await YourTableName.findByPk(id);
await deleteYourTableName.destroy();
```

And then our CRUD is finished.