import {Document, WithId} from "mongodb";

type MongoDocument<TSchema extends { [key: string]: any } = Document> = TSchema | WithId<TSchema>;

export declare function mapResultWith<TSchema extends MongoDocument>(
  transform: <TItem extends Document = Document> (item: TSchema) => TItem, result: MongoDocument<TSchema> | MongoDocument<TSchema>[]
): TSchema | TSchema[]
export declare function mapResultWith<TSchema extends MongoDocument<TSchema>>(
  transform: <TItem extends Document = Document> (item: TSchema) => TItem
): (result: MongoDocument<TSchema> | MongoDocument<TSchema>[]) => TSchema | TSchema[]

export declare function toModel<TSchema extends Document = Document>(doc: WithId<TSchema>): TSchema;

export declare function toDoc<TSchema extends Document = Document>(model: TSchema): WithId<TSchema>;