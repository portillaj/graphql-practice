import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar types
// String, Boolean, Int, Float, ID

// Type definitions (app schema)
const typeDefs = `
  type Query {
    me: User!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }
`;

// Resolvers
const resolvers = {
  Query: {
    me() {
      return {
        id: '123098',
        name: 'Mike Despian',
        email: 'mike@example.com',
        age: 40
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => {
  console.log('The server is up');
});
