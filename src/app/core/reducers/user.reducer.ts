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
  return a.Id;
}

export function sortByName(a: User, b: User): number {
  return a.UserName.localeCompare(b.UserName);
}

export const userAdapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const userSelectors = userAdapter.getSelectors<UserState>((user) => user);

export const initialState: UserState = userAdapter.getInitialState({
    // additional entity state properties
    selectedUserId: null,
  });
   
  export const userReducer = createReducer(
    initialState,
    on(UserActions.addUser, (state, { user }) => {
      return userAdapter.addOne(user, state)
    }),
    on(UserActions.setUser, (state, { user }) => {
      return userAdapter.setOne(user, state)
    }),
    on(UserActions.upsertUser, (state, { user }) => {
      return userAdapter.upsertOne(user, state);
    }),
    on(UserActions.addUsers, (state, { users }) => {
      return userAdapter.addMany(users, state);
    }),
    on(UserActions.upsertUsers, (state, { users }) => {
      return userAdapter.upsertMany(users, state);
    }),
    on(UserActions.updateUser, (state, { update }) => {
      return userAdapter.updateOne(update, state);
    }),
    on(UserActions.updateUsers, (state, { updates }) => {
      return userAdapter.updateMany(updates, state);
    }),
    on(UserActions.mapUser, (state, { entityMap }) => {
      return userAdapter.mapOne(entityMap, state);
    }),
    on(UserActions.mapUsers, (state, { entityMap }) => {
      return userAdapter.map(entityMap, state);
    }),
    on(UserActions.deleteUser, (state, { id }) => {
      return userAdapter.removeOne(id, state);
    }),
    on(UserActions.deleteUsers, (state, { ids }) => {
      return userAdapter.removeMany(ids, state);
    }),
    on(UserActions.deleteUsersByPredicate, (state, { predicate }) => {
      return userAdapter.removeMany(predicate, state);
    }),
    on(UserActions.loadUsers, (state, { users }) => {
      return userAdapter.setAll(users, state);
    }),
    on(UserActions.setUsers, (state, { users }) => {
      return userAdapter.setMany(users, state);
    }),
    on(UserActions.clearUsers, state => {
      return userAdapter.removeAll({ ...state, selectedUserId: null });
    })
  );
   
   
  export const getSelectedUserId = (state: UserState) => state.selectedUserId;
   
  // get the selectors
  const {
    selectIds,
    selectEntities,
    selectAll,
    selectTotal,
  } = userAdapter.getSelectors();
   
  // select the array of user ids
  export const selectUserIds = selectIds;
   
  // select the dictionary of user entities
  export const selectUserEntities = selectEntities;
   
  // select the array of users
  export const selectAllUsers = selectAll;
   
  // select the total user count
  export const selectUserTotal = selectTotal;