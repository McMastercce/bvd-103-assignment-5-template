import { type Collection, type Db, MongoClient } from 'mongodb'
// We are importing the book type here, so we can keep our types consistent with the front end
import { type Book } from '../adapter/assignment-3'

// This is the connection string for the mongo database in our docker compose file
// We're using process.env to detect if a different mongo uri is set, primarily for testing purpuses
const uri = typeof process.env.__MONGO_URI === 'string' ? process.env.__MONGO_URI : 'mongodb://mongo'

// We're setting up a client, opening the database for our project, and then opening
// a typed collection for our books.
export const client = new MongoClient(uri)

// We're moving the setup of the database and collections into a function with a returned value,
// to allow us to isolate them in tests

export interface DatabaseAccessor {
  database: Db
  books: Collection<Book>
}

export function getDatabase (): DatabaseAccessor {
  const database = client.db(import.meta.vitest !== undefined ? Math.floor(Math.random() * 100000).toPrecision() : 'mcmasterful-books')
  const books = database.collection<Book>('books')

  return {
    database,
    books
  }
}

if (import.meta.vitest !== undefined) {
  const { test, expect } = import.meta.vitest

  test('Can Setup Test DB', () => {
    const { database } = getDatabase()
    expect(database.databaseName).not.toBe('mcmasterful-books')
  })
}