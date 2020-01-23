import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/schema';
import expressPlayground from 'graphql-playground-middleware-express';

const app = express();
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app, path: '/graphql'});

app.listen(
    { port: 4000 },
    () => console.log(`GraphQL Server running @ http://localhost:4000${server.graphqlPath}`)
)
app.get(`/playground`, expressPlayground({ endpoint: `/graphql`}))

export default app;
