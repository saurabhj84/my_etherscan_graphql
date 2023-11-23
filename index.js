const { ApolloServer } = require("apollo-server");    // Import Apollo Server
const { importSchema } = require("graphql-import");   // Import graphql-import to load schema
const EtherDataSource = require("./datasource/ethDatasource");  // Import Custom Data Source
const typeDefs = importSchema("./schema.graphql");    // Load Schema

require("dotenv").config();  // Load Environment Variables

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) =>    // Resolver to get Ether Balance
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) =>      // Resolver to get total Ether Supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) =>     // Resolver to get latest Ether Price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) =>   // Resolver to get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({   // create apollo server
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),  // Instantiate Data Source
  }),
});

server.timeout = 0;
server.listen("9000").then(({ url }) => {  // start server on port 9000
  console.log(`🚀 Server ready at ${url}`);
});
