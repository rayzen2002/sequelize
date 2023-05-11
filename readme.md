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

with our manifest arquive done, lets install our dependencies:

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

after that, a structure will be created to us, structure that will guide us on the process of using Sequelize to interact with our Database.

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
    await queryInterface.createTable('planets', {
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