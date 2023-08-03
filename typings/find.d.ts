import {MongoClientLike} from "./client";
import {Document, FindOptions, WithId} from "mongodb";
import {Predicate} from "./utils";

type FindResult<TSchema extends Document> = WithId<TSchema>[] | [WithId<TSchema>[], number];
type FindIdParams = string | [string, Pick<FindOptions, "projection">]

declare function findBy<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string, predicate: Predicate<FindOptions, TSchema>): Promise<FindResult<TSchema>>;
declare function findBy<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string): (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string, predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;
declare function findBy<TSchema extends Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (predicate: Predicate<FindOptions, TSchema>) => Promise<FindResult<TSchema>>;

declare function findById<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string, id: FindIdParams): Promise<WithId<TSchema> | null>;
declare function findById<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string): (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string, id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findById<TSchema extends Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;

declare function findByObjectId<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string, id: FindIdParams): Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string): (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string, id: FindIdParams) => Promise<WithId<TSchema> | null>;
declare function findByObjectId<TSchema extends Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => (id: FindIdParams) => Promise<WithId<TSchema> | null>;

declare function findAll<TSchema extends Document>(client: MongoClientLike, databaseName: string, collectionName: string): Promise<FindResult<TSchema>>;
declare function findAll<TSchema extends Document>(client: MongoClientLike, databaseName: string): (collectionName: string) => Promise<FindResult<TSchema>>;
declare function findAll<TSchema extends Document>(client: MongoClientLike): (databaseName: string) => (collectionName: string) => Promise<FindResult<TSchema>>;

export {
  findBy,
  findById,
  findByObjectId,
  findAll
}