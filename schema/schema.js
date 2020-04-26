const graphql = require('graphql');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

const movies = [
  { id: '1', name: 'Pulp1', genre: 'Crime1', directorId: '1' },
  { id: '2', name: 'Pulp2', genre: 'Crime2', directorId: '3' },
  { id: '3', name: 'Pulp3', genre: 'Crime3', directorId: '4' },
  { id: '4', name: 'Pulp4', genre: 'Crime4', directorId: '2' },
  { id: '5', name: 'Pulp5', genre: 'Crime5', directorId: '1' },
  { id: '6', name: 'Pulp6', genre: 'Crime6', directorId: '3' },
  { id: '7', name: 'Pulp7', genre: 'Crime7', directorId: '4' },
  { id: '8', name: 'Pulp8', genre: 'Crime8', directorId: '2' },
];

const directors = [
  { id: '1', name: 'Tarantino1', age: 30 },
  { id: '2', name: 'Tarantino2', age: 33 },
  { id: '3', name: 'Tarantino3', age: 35 },
  { id: '4', name: 'Tarantino4', age: 38 },
];

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(parent, args) {
        return directors.find(director => director.id === parent.directorId);
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(parent, args) {
        return movies.filter(movie => movie.directorId === parent.id);
      }
    }
  })
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return movies.find(movie => movie.id === args.id);
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return directors.find(director => director.id === args.id);
      }
    },
    movies: {
      type: GraphQLList(MovieType),
      resolve(parent, args) {
        return movies;
      }
    },
    directors: {
      type: GraphQLList(DirectorType),
      resolve(parent, args) {
        return directors;
      }
    },
  }
});

module.exports = new GraphQLSchema({
  query: Query
});