# Advertisement API

This API was developed using `Typescript`, `MySQL` for database and `Jest` for testing. Additional libraries are used for 
development purposes

### Requirements

- `Node` >= 9.8.0
- `MySQL` server installed and running on port 8889 (this port can be modified in the `ormconfig.json` file)

### Steps to run this project:

1. Run `npm i` command
2. Setup database settings inside `ormconfig.json` file (Actually using mysql database)
3. Run `npm run dev` command

The `npm run dev` command build the project in the `dist/` folder then watch for file 
changes and build again the project if necessary

### Documentation

The documentation for all the endpoints of this project are in `/api-docs` and it was created using swagger. The `swagger.json`
file is in the `config` folder

### Testing

```shell
$ npm run test
```

This script run the `jest` testing module with some additional parameters including coverage


### Project Details

#### Design and technical considerations

The project was developed using `Typescript`,`TypeORM` and `Jest`. There is only one entity in the project named `Advertisement. In this case is being assumed that every user has access to all the records in the database so its unnecessary an authentication service.

The main application file is `server.ts` and in all the enviroments the project is build in the `dist/` folder with a database connection using `TypeORM`. 

The folder structure is:

- `config/` used to save the configuration files of external services or libraries, in this case there is only the `swagger.json` file
- `entity/` as mentioned before `TypeORM` uses entities to manage the objects, this folder is used to save all the entities of the project
, in this case there is only one entity -> `Advertisement`
- `middleware` used to save some middlewares required in the project (Body parser, CORS, etc)
- `services` used to save all the logic of the API including routes, its separated by folders for each entity, in this case there is one folder named `advertisement/` with a routes file and a controller
- `utils/` used to expose some methods that can be use anywhere in the project, in this case there are two methods, one to apply the routes and another one to apply the middlewares, these methods are used in the `server.ts` file
- `.server.ts` this file initialize all the application including the connection to the database


#### How would you test your service

I would start testing manually all the endpoints exposed by the service including wrong and good paths, then write some unit test that run every time that the project will be deployed in a production environment,
in this case there are some unit test implemented using `Jest`, these test are for every endpoint of the service with coverage > 80%.

####  Changes your design and implementation need to make your service secure

First i would add an `User` entity in order to implement an authentication service with token validations and token expiration, then i would add some logger in order to associate every request with an user.

Add some validation middlewares or methods to validate data of each request in order to keep the consistency and integrity of the database, this way we could also protect the database and the server against attacks.

