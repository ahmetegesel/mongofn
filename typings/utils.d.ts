import {Document, Filter} from "mongodb";

export type Predicate<TOptions, TSchema extends Document = Document> = Filter<TSchema> | [Filter<TSchema>, TOptions];