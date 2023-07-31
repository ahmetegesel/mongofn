import {Document, WithId} from "mongodb";

type MongoDocument<TSchema extends { [key: string]: any } = Document> = TSchema | WithId<TSchema>;

export declare function mapResultWith<TSchema extends MongoDocument>(
  transform: <TItem extends Document = Document> (item: TItem | null) => TItem, result: MongoDocument<TSchema> | MongoDocument<TSchema>[]
): TSchema | TSchema[] | null
export declare function mapResultWith<TSchema extends MongoDocument>(
  transform: <TItem extends Document = Document> (item: TItem | null) => TItem
): (result: MongoDocument<TSchema> | MongoDocument<TSchema>[]) => TSchema | TSchema[] | null

export declare function toModel<TSchema extends Document = Document>(doc: WithId<TSchema>): TSchema | null;

export declare function toDoc<TSchema extends Document = Document>(model: TSchema): WithId<TSchema> | null;