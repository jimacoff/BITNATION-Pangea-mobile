// @flow

import { put, call } from 'redux-saga/effects';
import type { Realm } from 'realm';

import { messagesUpdated, type AddNewMessageAction } from '../activity-actions';
import defaultDB from '@pangea/database';
import type { MessageJobType as DBMessage } from '@pangea/database/schemata';
import {
  convertFromDatabase,
  convertToDatabase,
} from '../activity-utils';
import type { ActivityLogMessage } from 'pangea-common/types/ActivityLogMessage-type';
import { getCurrentAccountId, currentAccountBasedUpdate } from '@pangea/accounts/accounts-sagas/sagas';

/**
 * @desc Function that creates Realm results fetching activity logs for specific account.
 * @param {Realm} db Realm instance.
 * @param {string|null} accountId Id of account to fetch logs or null.
 * @return {Realm.Results<AccountSettings>|null} Realm results fetching logs for specified account or null if not applicable.
 */
export function buildMessagesResults(db: Realm, accountId: string | null) {
  if (accountId === null) {
    return null;
  }
  return db.objects('MessageJob').filtered(`accountId == '${accountId}'`);
}

/**
 * @desc Generator to be called on database change. Used to update messages.
 * @param {*} collection Updated messages collection
 * @return {void}
 */
export function* onCurrentAccountChange(collection: Realm.Result<DBMessage>): Generator<*, *, *> {
  yield put(messagesUpdated(collection.map(convertFromDatabase)));
}

/**
 * @desc Starts listen to messages updates in database.
 * @return {void}
 */
export function* startDatabaseListening(): Generator<*, *, *> {
  yield call(currentAccountBasedUpdate, buildMessagesResults, onCurrentAccountChange);
}

export const buildMessageObject = (
  highestId: number,
  accountId: string,
  message: string,
  params: Object,
  interpret: boolean,
): ActivityLogMessage => ({
  id: highestId,
  accountId,
  msg: message,
  params: JSON.stringify(params),
  interpret,
  createdAt: new Date(),
});

/**
 * @desc Add a new activity log into the database
 * @param {AddNewMessageAction} action ADD_MESSAGE action
 * @return {void}
 */
export function* addNewMessageSaga(action: AddNewMessageAction): Generator<*, *, *> {
  const db: Realm = yield defaultDB;
  const params = action.params || {};
  const interpret = action.interpret !== false;
  const messages = db.objects('MessageJob').sorted('id', true);
  let highestId = 1;
  if (messages.length > 0) highestId = messages[0].id + 1;
  const currentAccountId = yield call(getCurrentAccountId);
  const convertedMessage = convertToDatabase(buildMessageObject(highestId, currentAccountId, action.message, params, interpret));
  if (convertedMessage === null) {
    yield call(action.callback, false);
  } else {
    db.write(() => {
      db.create('MessageJob', convertedMessage);
    });
    yield call(action.callback, true);
  }
}
