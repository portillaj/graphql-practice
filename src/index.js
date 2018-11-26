import { GraphQLServer } from 'graphql-yoga';

// 5 Scalar types
// String, Boolean, Int, Float, ID

// Type definitions (app schema)
const typeDefs = `
  type Query {
    add(a: Float!, b: Float!): Float!
    greeting(name: String, position: String): String!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    add(parent, args, ctx, info) {
      return args.a + args.b
    },
    greeting(parent, args, ctx, info) {
      console.log(args);
      if (args.name) {
        return `Hello, ${args.name}! You are my favorite ${args.position}`   
      } else {
        'Hello!'
      }
    },
    me() {
      return {
        id: '123098',
        name: 'Mike Despian',
        email: 'mike@example.com',
        age: 40
      }
    },
    post() {
      return {
        id: '4456',
        title: 'The Shining Review',
        body: 'The book was great',
        published: true
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
