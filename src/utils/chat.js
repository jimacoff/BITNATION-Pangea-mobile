// @flow

import _ from 'lodash';
import type { Account } from '../types/Account';
import type { DAppMessageType, ChatSessionType, GiftedChatMessageType, ProfileType } from '../types/Chat';

/**
 * @desc Function that creates the list of messages to be consumed by GiftedChat
 * @param {Array<any>} messagesData Array of message data
 * @returns {Array<any>} An array of formatted messages data
 */
export default function createGiftedChatMessageObject(messagesData: Array<any>): Array<any> {
  const messages = [];
  messagesData.forEach((data) => {
    messages.push({
      _id: data._id,
      text: data.msg,
      createdAt: data.createdAt,
      user: {
        _id: data.userId,
        name: data.from,
      },
    });
  });
  return messages;
}


/**
 * @desc Function that creates the list of messages to be consumed by GiftedChat
 * @param {Account} sender The account of the sender
 * @param {ProfileType} receiver The profile of the recipient
 * @param {Array<any>} messagesData Array of message data
 * @returns {Array<GiftedChatMessageType>} An array of formatted messages data
 */
export function createGiftedChatMessageObjects(sender: Account, receiver: ProfileType, messagesData: Array<any>): Array<GiftedChatMessageType> {
  const messages = [];
  messagesData.forEach((data) => {
    const createdAt = new Date(0);
    createdAt.setUTCMilliseconds(data.created_at / 1000000);

    const user = data.received ?
      { _id: receiver.identityKey, name: receiver.name } :
      // sender.id is not an identity key, but there is no difference because it can't be the same as someone's identityKey
      { _id: sender.id, name: sender.name };

    let dAppMessage: DAppMessageType | null = null;
    if (data.dapp !== '') {
      try {
        const dAppMessageJSON = JSON.parse(data.dapp);
        dAppMessage = {
          ...dAppMessageJSON,
          dAppPublicKey: Buffer.from(dAppMessageJSON.dapp_public_key, 'base64').toString('hex'),
        };
      } catch (error) {
        console.log(`[CHAT] Unable to parse DApp message: ${data.dapp}`);
      }
    }

    messages.push({
      _id: data.db_id,
      text: data.content,
      createdAt,
      user,
      dAppMessage,
    });
  });
  return messages;
}

export const getSelectedSession = (sessions: Array<ChatSessionType>, recipientPublicKey: string) =>
  _.find(sessions, session => session.publicKey === recipientPublicKey) || null;
