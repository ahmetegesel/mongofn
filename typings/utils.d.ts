import {Document, Filter} from "mongodb";

export type Predicate<TOptions, TSchema extends Document> = Filter<TSchema> | [Filter<TSchema>, TOptions];