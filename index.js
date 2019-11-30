const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const root = require('./resolvers');
require('./db').initialize();
const cors = require('cors')


const schema = buildSchema(`
  enum Preferences {
    BOOKS
    MUSIC
    MOVIES
    PETS
    SPORTS
  }

  enum Gender {
    MALE
    FEMALE
  }

  input UserInput {
    email: String!
    password: String!
  }

  input NewUserInput {
    email: String!
    password: String!
    preferences: [Preferences!]
    age: Int!
    gender: [Gender]!
  }

  type Query {
    userExists(user: UserInput): Boolean
  }

  type Mutation {
    registerUser(newUser: NewUserInput): Boolean
  }
`);

const app = express();
app.use(cors());

// app.use("/graphql", function (req, res, next) { 
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Accept', 'application/json');
//   res.header('Content-Type', 'application/json');
//   res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, HEAD, POST');
//   next();
// });

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));

app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));