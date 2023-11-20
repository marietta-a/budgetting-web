import { createFeatureSelector, createSelector } from "@ngrx/store";
import { User } from "../models/user";

export const selectUsers = createFeatureSelector<ReadonlyArray<User>>('users');
export const selectCollection = createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectUserCollection = createSelector(
    selectUsers,
    selectCollection,
    (users, collection) => {
        return collection.map((id) => users.find(u => u.id === id)!)
    }
)