import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { User } from '../models/user';
import { createReducer, on } from '@ngrx/store';
import * as UserActions from '../actions/user.actions';

export interface UserState extends EntityState<User> {
  // additional entities state properties
  selectedUserId: string | null;
}

export function selectUserId(a: User): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: User, b: User): number {
  return a.userName.localeCompare(b.userName);
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: UserState = adapter.getInitialState({
    // additional entity state properties
    selectedUserId: null,
  });
   
  export const userReducer = createReducer(
    initialState,
    on(UserActions.addUser, (state, { user }) => {
      return adapter.addOne(user, state)
    }),
    on(UserActions.setUser, (state, { user }) => {
      return adapter.setOne(user, state)
    }),
    on(UserActions.upsertUser, (state, { user }) => {
      return adapter.upsertOne(user, state);
    }),
    on(UserActions.addUsers, (state, { users }) => {
      return adapter.addMany(users, state);
    }),
    on(UserActions.upsertUsers, (state, { users }) => {
      return adapter.upsertMany(users, state);
    }),
    on(UserActions.updateUser, (state, { update }) => {
      return adapter.updateOne(update, state);
    }),
    on(UserActions.updateUsers, (state, { updates }) => {
      return adapter.updateMany(updates, state);
    }),
    on(UserActions.mapUser, (state, { entityMap }) => {
      return adapter.mapOne(entityMap, state);
    }),
    on(UserActions.mapUsers, (state, { entityMap }) => {
      return adapter.map(entityMap, state);
    }),
    on(UserActions.deleteUser, (state, { id }) => {
      return adapter.removeOne(id, state);
    }),
    on(UserActions.deleteUsers, (state, { ids }) => {
      return adapter.removeMany(ids, state);
    }),
    on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
      return adapter.removeMany(predicate, state);
    }),
    on(UserActions.loadUsers, (state, { users }) => {
      return adapter.setAll(users, state);
    }),
    on(UserActions.setUsers, (state, { users }) => {
      return adapter.setMany(users, state);
    }),
    on(UserActions.clearUsers, state => {
      return adapter.removeAll({ ...state, selectedUserId: null });
    })
  );
   
   
  export const getSelectedUserId = (state: UserState) => state.selectedUserId;
   
  // get the selectors
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = adapter.getSelectors();
   
  // select the array of user ids
  export const selectUserIds = selectIds;
   
  // select the dictionary of user entities
  export const selectUserEntities = selectEntities;
   
  // select the array of users
  export const selectAllUsers = selectAll;
   
  // select the total user count
  export const selectUserTotal = selectTotal;