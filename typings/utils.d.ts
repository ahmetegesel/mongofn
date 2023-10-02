import {Filter} from "mongodb";

export type Predicate<TOptions, TSchema> = Filter<TSchema> | [Filter<TSchema>, TOptions];