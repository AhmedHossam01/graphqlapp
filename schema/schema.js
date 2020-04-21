const gql = require("graphql");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = gql;

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve: (parent, args) => {
        return {
          id: parent.authorid,
          name: "ahmed",
          age: 32,
        };
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: GraphQLList(BookType),
      resolve: (parent, args) => {
        return [
          { id: 5, name: "hi", genre: "hello" },
          { id: 4, name: "booktwo", genre: "guys" },
        ];
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryTyoe",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      // to get data from db or other source
      resolve: (parent, args) => {
        return {
          // return all the information about book, they're defined in the schema

          id: args.id,
          name: "new book",
          genre: "hmm",
          authorid: 3,
        };
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve: (parent, args) => {
        return {
          id: "1",
          name: "Ahmed",
          age: 16,
        };
      },
    },
    books: {
      type: GraphQLList(BookType),
      resolve: (parent, args) => {
        return [
          { id: 1, name: "gdf", genre: "gfdgdf" },
          { id: 2, name: "gdf", genre: "gfdgdf" },
        ];
      },
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve: (parent, args) => {
        return [{ id: 1, name: "gdfgf", age: 23 }];
      },
    },
  },
});

// to mutate data, (not a real graphql implementation)
const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        age: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        /**
         * let author = new Author({
         *   name: args.name,
         *   age: args.age
         * })
         *
         * author.save().then(result => result)
         */
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation,
});
