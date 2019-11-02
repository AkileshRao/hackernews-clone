const { GraphQLServer } = require('graphql-yoga');

let links = [{
  id: 'link-0',
  description: 'Fullstack tutorial for GraphQL',
  url: 'www.howtographql.com'
}];

let idCount = links.length;

const resolvers = {
  Query: {
    info: () => `This is an API of Hackernews Clone`,
    feed: () => links,
    link: (parent, args) => links.find(link => link.id === args.id)
  },

  Mutation: {
    post: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url
      }
      links.push(link);
      return link;
    },

    updateLink: (parent, args) => {
      const link = {
        id: args.id,
        description: args.description,
        url: args.url
      };

      let linkIndex = links.indexOf(links.find(link => link.id === args.id));

      links[linkIndex] = link;

      return link;
    },

    deleteLink: (parent, args) => {
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
  resolvers
})

server.start(() => console.log("Server is running on localhost 4000")); 