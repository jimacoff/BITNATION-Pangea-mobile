// @flow

import { type DApp } from '../types/DApp';
import type { DAppMessageType, ChatSessionType, GiftedChatMessageType } from '../types/Chat';
import type { DAppLaunchState } from '../reducers/dApps';
import type { DAppChatContext, DAppModalInfo } from '../types/DApp';

export type DAppsListUpdatedAction = { +type: 'DAPPS_LIST_UPDATED', availableDApps: Array<DApp> };
export type StartDAppAction = { +type: 'START_DAPP', dAppPublicKey: string };
export type StopDAppAction = { +type: 'STOP_DAPP', dAppPublicKey: string };
export type DAppLaunchStateChangedAction = { +type: 'DAPP_LAUNCH_STATE_CHANGED', dAppPublicKey: string, launchState: DAppLaunchState };
export type OpenDAppAction = { +type: 'OPEN_DAPP', dAppPublicKey: string, context: Object, callback: (success: boolean, error: ?Error) => void };
export type StoreDAppModalAction = { +type: 'STORE_DAPP_MODAL', modal: DAppModalInfo };
export type CleanDAppModalAction = { +type: 'CLEAN_DAPP_MODAL', modalID: string };
export type PerformDAppCallbackAction = { +type: 'PERFORM_DAPP_CALLBACK', dAppPublicKey: string, callbackID: number, args: Object };
export type RenderDAppMessageAction = { +type: 'RENDER_DAPP_MESSAGE', message: DAppMessageType, context: DAppChatContext, callback: (layout: ?Object) => void };

export type Action =
  | DAppsListUpdatedAction
  | StartDAppAction
  | StopDAppAction
  | DAppLaunchStateChangedAction
  | OpenDAppAction
  | StoreDAppModalAction
  | CleanDAppModalAction
  | PerformDAppCallbackAction
  | RenderDAppMessageAction;

export const DAPPS_LIST_UPDATED = 'DAPPS_LIST_UPDATED';
export const START_DAPP = 'START_DAPP';
export const STOP_DAPP = 'STOP_DAPP';
export const DAPP_LAUNCH_STATE_CHANGED = 'DAPP_LAUNCH_STATE_CHANGED';
export const OPEN_DAPP = 'OPEN_DAPP';
export const STORE_DAPP_MODAL = 'STORE_DAPP_MODAL';
export const CLEAN_DAPP_MODAL = 'CLEAN_DAPP_MODAL';
export const PERFORM_DAPP_CALLBACK = 'PERFORM_DAPP_CALLBACK';
export const RENDER_DAPP_MESSAGE = 'RENDER_DAPP_MESSAGE';

/**
 * @desc Action creator for an action that is called when DApps list updated.
 * @param {DApp[]} availableDApps Array of available DApps.
 * @returns {DAppsListUpdatedAction} An action.
 */
export function dAppsListUpdated(availableDApps: Array<DApp>): DAppsListUpdatedAction {
  return {
    type: DAPPS_LIST_UPDATED,
    availableDApps,
  };
}

/**
 * @desc Action creator for an action that is called when DApp changed his launch state, e.g. started/opened/closed/etc.
 * @param {string} dAppPublicKey Public key of DApp that failed to start.
 * @param {DAppLaunchState} launchState State that DApp was switched to.
 * @return {DAppLaunchStateChangedAction} An action.
 */
export function dAppLaunchStateChanged(dAppPublicKey: string, launchState: DAppLaunchState): DAppLaunchStateChangedAction {
  return {
    type: DAPP_LAUNCH_STATE_CHANGED,
    dAppPublicKey,
    launchState,
  };
}

/**
 * @desc Action creator for an action to start DApp by its public key.
 * @param {string} dAppPublicKey Public key of DApp to start.
 * @return {StartDAppAction} An action.
 */
export function startDApp(dAppPublicKey: string): StartDAppAction {
  return {
    type: START_DAPP,
    dAppPublicKey,
  };
}

/**
 * @desc Action creator for an action to start DApp by its public key.
 * @param {string} dAppPublicKey Public key of DApp to stop.
 * @return {StopDAppAction} An action.
 */
export function stopDApp(dAppPublicKey: string): StopDAppAction {
  return {
    type: STOP_DAPP,
    dAppPublicKey,
  };
}

/**
 * @desc Action creator for an action to open DApp by its public key.
 * @param {string} dAppPublicKey Public key of DApp to open.
 * @param {Object} context Context that will be passed to DApp,
 * e.g. object containing ethereum address of recipient.
 * @param {function} callback Callback to be called on finish.
 * @return {OpenDAppAction} An action.
 */
export function openDApp(dAppPublicKey: string, context: Object = {}, callback: () => void = () => undefined): OpenDAppAction {
  return {
    type: OPEN_DAPP,
    dAppPublicKey,
    context,
    callback,
  };
}

/**
 * @desc Action creator for an action to update or create DApp modal.
 * @param {DAppModalInfo} modal Modal to store
 * @return {StoreDAppModalAction} An action.
 */
export function storeDAppModal(modal: DAppModalInfo): StoreDAppModalAction {
  return {
    type: STORE_DAPP_MODAL,
    modal,
  };
}

/**
 * @desc Action creator for an action to clean DApp modal, i.e. remove its info from state.
 * @param {string} modalID ID of modal to clean
 * @return {CleanDAppModalAction} An action.
 */
export function cleanDAppModal(modalID: string): CleanDAppModalAction {
  return {
    type: CLEAN_DAPP_MODAL,
    modalID,
  };
}

/**
 * @desc Action creator for an action to perform DApp callback.
 * @param {string} dAppPublicKey Public key of DApp.
 * @param {number} callbackID Id of callback
 * @param {Object} args Arguments to be passed.
 * @return {PerformDAppCallbackAction} An action.
 */
export function performDAppCallback(dAppPublicKey: string, callbackID: number, args: Object): PerformDAppCallbackAction {
  return {
    type: PERFORM_DAPP_CALLBACK,
    dAppPublicKey,
    callbackID,
    args,
  };
}

/**
 * @desc Action creator for an action to send DApp message.
 * @param {DAppMessageType} message Message to send.
 * @param {function} callback Callback to call on finish or error.
 * @param {DAppChatContext} context Context to pass to renderer.
 * @return {RenderDAppMessageAction} An action.
 */
export function renderDAppMessage(message: DAppMessageType, context: DAppChatContext, callback: (layout: ?Object) => void): RenderDAppMessageAction {
  return {
    type: RENDER_DAPP_MESSAGE,
    message,
    context,
    callback,
  };
}
