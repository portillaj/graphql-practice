import { GraphQLServer } from 'graphql-yoga';

// Demo user data
const users = [{
  id: '1',
  name: 'jason',
  email: 'portillaj85@gmail.com',
  age: 33
}, {
  id: '2',
  name: 'marilyn',
  email: 'mvargas@gmail.com',
  age: 34
}, {
  id: '3',
  name: 'Noah',
  email: 'noahportilla@gmail.com'
}];

const posts = [{
  id: '1',
  title: 'GraphQL is great',
  body: 'The best api in town',
  published: true,
  author: '1'
}, {
  id: '2',
  title: 'I Love my Wife',
  body: 'When you have a beautiful woman, its great',
  published: true,
  author: '1'
}, {
  id: '3',
  title: 'Video Games are awesome',
  body: 'I Love playing the coolest games',
  published: false,
  author: '2'
}];

const comments = [{
  id: '10',
  text: 'This is awesome',
  author: '1'
},
{
  id: '12',
  text: 'Second comment coming through',
  author: '2'
},
{
  id: '15',
  text: 'Third comment coming through',
  author: '1'
},
{
  id: '16',
  text: 'fourth comment coming through',
  author: '2'
}];

// 5 Scalar types
// String, Boolean, Int, Float, ID

// Type definitions (app schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
    comments: [Comment!]!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, ctx, info) {
      if(!args.query) {
        return users;
      }
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts(parent, args, ctx, info) {
      if(!args.query) {
        return posts;
      }
      return posts.filter((post) => {
        return post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    comments(parent, args, ctx,info) {
      return comments;
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
  },
  Post: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
    }
  },
  User: {
    posts(parent, args, ctx, info) {
      return posts.filter(post => {
        return post.author === parent.id;
      });
    },
    comments(parent, args, ctx, info) {
      return comments.filter(comment => {
        return comment.author === parent.id;
      });
    }
  },
  Comment: {
    author(parent, args, ctx, info) {
      return users.find((user) => {
        return user.id === parent.author;
      });
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
