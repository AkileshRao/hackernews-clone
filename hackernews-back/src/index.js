const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');

const resolvers = {
  Query: {
    info: () => `This is an API of Hackernews Clone`,
    feed: (root, args, context, info) => {
      return context.prisma.links();
    },
    link: (root, args) => links.find(link => link.id === args.id)
  },

  Mutation: {
    post: (root, args, context) => {
      return context.prisma.createLink({
        url: args.url,
        description: args.description
      })
    },

    updateLink: (root, args) => {
      const link = {
        id: args.id,
        description: args.description,
        url: args.url
      };

      let linkIndex = links.indexOf(links.find(link => link.id === args.id));

      links[linkIndex] = link;

      return link;
    },

    deleteLink: (root, args) => {
      let linkRef = links.find(link => link.id === args.id);
      links.map(link => {
        if (link.id === args.id) {
          links.splice(links.indexOf(link), 1);
        }
      });
      return linkRef;
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: { prisma }
})

server.start(() => console.log("Server is running on localhost 4000")); 