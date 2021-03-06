// @flow

import { Platform } from 'react-native';
import AssetsImages from './assets/AssetsImages';
import Colors from './styles/colors';
import i18n from '../PangeaCommon/i18n';
// Styles for Navigation Bar
export const tabsStyle = {
  tabBarButtonColor: Colors.tabBarButtonColor,
  tabBarLabelColor: Colors.tabBarLabelColor,
  tabBarSelectedLabelColor: Colors.tabBarLabelColor,
  tabBarSelectedButtonColor: Colors.tabBarSelectedButtonColor,
  tabBarBackgroundColor: Colors.tabBarBackgroundColor,
};

export const appStyle = {
  ...tabsStyle,
};

export const androidNavigationButtons =
  Platform.OS === 'android'
    ? {
      leftButtons: [
        {
          id: 'back',
          buttonColor: Colors.androidNavigationButtons,
        },
      ],
    }
    : {};

export const navigatorStyle = {
  tabBarHidden: false,
  statusBarTextColorScheme: Platform.OS === 'ios' ? 'dark' : 'light',
  statusBarColor:
    Platform.OS === 'ios'
      ? Colors.statusBarColorIOS
      : Colors.statusBarColorOther, // Nativebase variable!
  navBarBackgroundColor: Colors.navBarBackgroundColor,
  navBarTransparent: true,
  navBarBlur: false, // blur is too light
  navBarTranslucent: true,
  navBarNoBorder: true,
  drawUnderNavBar: true,
  drawUnderStatusBar: false, // Apple says, don't do it. So we don't.
  navBarTextColor: Colors.navBarTextColor,
  navBarButtonColor: Colors.navBarButtonColor,
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
  topBarElevationShadowEnabled: false,
  navBarTitleTextCentered: true,
};

export const hiddenNavigatorStyle = {
  statusBarTextColorScheme: 'light',
  statusBarColor:
    Platform.OS === 'ios'
      ? Colors.statusBarColorIOS
      : Colors.statusBarColorOther,
  navBarHidden: true,
  drawUnderStatusBar: false, // Apple says, don't do it. So we don't.
  screenBackgroundColor: 'transparent',
  rootBackgroundImageName: 'background-gray.jpg',
};

export const navigatorStyleModal = {
  ...navigatorStyle,
  tabBarHidden: true,
};

export const solidNavigatorStyle = {
  ...navigatorStyle,
  navBarTransparent: false,
  navBarBlur: false,
  drawUnderNavBar: false,
  screenBackgroundColor: '#E8EBED',
  tabBarHidden: true,
};

export const drawerStyle = {
  left: {
    screen: 'Pangea.MenuScreen',
    disableOpenGesture: true,
  },
  disableOpenGesture: true,
  style: {
    drawerShadow: false,
    contentOverlayColor: 'rgba(0,0,0,0.25)',
    leftDrawerWidth: 80,
    shouldStretchDrawer: true,
  },
};

/*
  label : this text string appears in the navigation bar at the bottom of the screen
  icon  : icon for navigation bar
  title : title in navigation bar
 */

const Screens = {
  ACCOUNTS_SCREEN: {
    screen: 'Pangea.AccountsScreen',
    title: i18n.t('screens.accounts.title'),
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNT_CREATE_DEVELOPER_SETTINGS: {
    screen: 'Pangea.AccountCreateDeveloperSettingsScreen',
    title: i18n.t('screens.accounts.create.developerTitle'),
    navigatorStyle,
  },
  ACCOUNT_CREATE_READY: {
    screen: 'Pangea.AccountCreateReadyScreen',
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNT_RESTORE_SOURCE: {
    screen: 'Pangea.AccountRestoreSourceScreen',
    navigatorStyle,
  },
  ACCOUNT_RESTORE_EMPTY_WALLET: {
    screen: 'Pangea.AccountRestoreEmptyWalletScreen',
    navigatorStyle: hiddenNavigatorStyle,
  },
  ACCOUNTS_ACCESS_SCREEN: {
    screen: 'Pangea.AccountsAccess',
    title: '',
    navigatorStyle: navigatorStyleModal,
  },
  DASHBOARD_SCREEN: {
    screen: 'Pangea.DashboardScreen',
    label: i18n.t('screens.dashboard.tabTitle'),
    icon: AssetsImages.TabIcons.dashboard,
    navigatorStyle: hiddenNavigatorStyle,
  },
  CHAT_SCREEN: {
    screen: 'Pangea.ChatScreen',
    title: i18n.t('screens.chat.title'),
    navigatorStyle,
  },
  MIGRATION_SCREEN: {
    screen: 'Pangea.MigrationScreen',
    label: i18n.t('screens.migration.title'),
    navigatorStyle,
  },
  NEW_CHAT_SCREEN: {
    screen: 'Pangea.NewChatScreen',
    label: i18n.t('screens.chat.newConversation'),
    title: '',
    navigatorStyle,
  },
  NATIONS_SCREEN: {
    screen: 'Pangea.NationsScreen',
    label: i18n.t('screens.nations.tabTitle'),
    title: i18n.t('screens.nations.tabTitle').toUpperCase(),
    icon: AssetsImages.TabIcons.nations,
    navigatorStyle: hiddenNavigatorStyle,
  },
  NATION_DETAILS_SCREEN: {
    screen: 'Pangea.NationDetailsScreen',
    title: '',
    navigatorStyle: navigatorStyleModal,
  },
  NATION_CREATE_SCREEN: {
    screen: 'Pangea.NationCreateScreen',
    title: '',
    navigatorStyle,
  },
  WALLET_SCREEN: {
    screen: 'Pangea.WalletScreen',
    label: i18n.t('screens.wallet.tabTitle'),
    title: i18n.t('screens.wallet.tabTitle').toUpperCase(),
    navigatorStyle,
  },
  PROFILE_SCREEN: {
    screen: 'Pangea.ProfileScreen',
    label: i18n.t('screens.profile.tabTitle'),
    title: i18n.t('screens.profile.tabTitle'), // i18n.t('screens.profile.title'),
    navigatorStyle,
  },
  CONFIRM_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.ConfirmKeyInstructionScreen',
    title: i18n.t('screens.confirmKey.title'),
    navigatorStyle,
    backButtonTitle: '',
  },
  CONFIRM_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.ConfirmKeyProcessScreen',
    title: i18n.t('screens.confirmKey.title'),
    navigatorStyle,
    backButtonTitle: '',
  },
  VERIFY_KEY_INSTRUCTION_SCREEN: {
    screen: 'Pangea.VerifyKeyInstructionScreen',
    title: i18n.t('screens.verifyKey.title'),
    navigatorStyle,
    backButtonTitle: '',
  },
  VERIFY_KEY_PROCESS_SCREEN: {
    screen: 'Pangea.VerifyKeyProcessScreen',
    title: i18n.t('screens.verifyKey.title'),
    navigatorStyle,
    backButtonTitle: '',
    passProps: {
      isVerification: true,
    },
  },
  HOME_SCREEN: {
    screen: 'Pangea.HomeScreen',
    navigatorStyle,
  },
  RESTORE_KEY_SCREEN: {
    screen: 'Pangea.RestoreKeyProcessScreen',
    title: i18n.t('screens.restoreKey.title'),
    navigatorStyle,
  },
  VIEW_PRIVATE_KEY_SCREEN: {
    screen: 'Pangea.ViewPrivateKeyScreen',
    title: i18n.t('screens.viewPrivateKey.title'),
    navigatorStyle,
  },
  INTRO_SCREEN: {
    screen: 'Pangea.Intro',
    navigatorStyle: hiddenNavigatorStyle,
  },
  RECEIVE_MONEY_SCREEN: {
    screen: 'Pangea.ReceiveMoneyScreen',
    title: '',
    navigatorStyle,
  },
  VERIFY_KEY_SUCCESS_SCREEN: {
    screen: 'Pangea.VerifyKeySuccess',
    title: i18n.t('screens.verifyKey.title'),
    navigatorStyle,
    backButtonTitle: '',
  },
  SEND_MONEY_SCREEN: {
    screen: 'Pangea.SendMoneyScreen',
    title: '',
    navigatorStyle,
  },
  QR_CODE_SCANNER_SCREEN: {
    screen: 'Pangea.QRCodeScannerScreen',
    title: i18n.t('screens.scanQRCode.title'),
    navigatorStyle,
  },
  QR_CODE_DAPP_SCREEN: {
    screen: 'Pangea.QRCodeAppScreen',
    title: '',
    navigatorStyle,
  },
  SETTINGS_SCREEN: {
    screen: 'Pangea.Settings',
    title: i18n.t('screens.settings.title').toUpperCase(),
    label: i18n.t('screens.settings.tabTitle'),
    navigatorStyle,
  },
  SERVICES_SCREEN: {
    screen: 'Pangea.Services',
    title: i18n.t('screens.services.tabTitle').toUpperCase(),
    label: i18n.t('screens.services.tabTitle'),
    icon: AssetsImages.TabIcons.services,
    navigatorStyle: hiddenNavigatorStyle,
  },
  SECURITY_SETTINGS_SCREEN: {
    screen: 'Pangea.Settings.Security',
    title: '',
    navigatorStyle,
  },
  ENTER_PASSCODE_SCREEN: {
    screen: 'Pangea.EnterPasscode',
    title: '',
    navigatorStyle: navigatorStyleModal,
  },
  CREATE_PASSCODE_SCREEN: {
    screen: 'Pangea.CreatePasscode',
    title: '',
    navigatorStyle: navigatorStyleModal,
  },
  CONFIRMATION_SCREEN: {
    screen: 'Pangea.ConfirmationContainer',
    title: '',
    navigatorStyle,
  },
  CHAT_LIST_SCREEN: {
    screen: 'Pangea.ChatListScreen',
    label: i18n.t('screens.chat.tabTitle'),
    title: i18n.t('screens.chat.tabTitle').toUpperCase(),
    icon: AssetsImages.TabIcons.chat,
    navigatorStyle: hiddenNavigatorStyle,
  },
  PRIVATE_CHAT_SCREEN: {
    screen: 'Pangea.PrivateChatScreen',
    title: i18n.t('screens.chat.title'),
    navigatorStyle,
  },
  CONTACTS_PICKER_SCREEN: {
    screen: 'Pangea.ContactsPickerScreen',
    title: i18n.t('screens.contactsPicker.title'),
    navigatorStyle: solidNavigatorStyle,
  },
  INFO_SCREEN: {
    screen: 'Pangea.InfoScreen',
    title: i18n.t('screens.info.title'),
    navigatorStyle: solidNavigatorStyle,
  },
  DAPP_MODAL_SCREEN: {
    screen: 'Pangea.DAppModalScreen',
    navigatorStyle,
  },
  DOCUMENTS_LIST_SCREEN: {
    screen: 'Pangea.DocumentsListScreen',
    title: i18n.t('screens.documentsList.title').toUpperCase(),
    navigatorStyle,
  },
  DOCUMENT_VIEW_SCREEN: {
    screen: 'Pangea.DocumentViewScreen',
    title: i18n.t('screens.documentView.title').toUpperCase(),
    navigatorStyle: solidNavigatorStyle,
  },
  DOCUMENT_MODIFY_SCREEN: {
    screen: 'Pangea.DocumentModifyScreen',
    title: i18n.t('screens.documentModify.title'),
    navigatorStyle: solidNavigatorStyle,
  },
  MENU_SCREEN: {
    screen: 'Pangea.MenuScreen',
  },
};

/**
 * @desc Returns and object that represents a screen in React Native Navigation library.
 * @param {string} name Name of the screen. Check Screens constant above for possible names.
 * @return {Object} A screen object.
 */
export function screen(name: string): Object {
  return { ...Screens[name] };
}
