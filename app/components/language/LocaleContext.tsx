import i18n from './i18n';
import React from 'react';
import I18n from 'i18n-js';
import { translate } from './translate';
import { useStorage } from '../../utils/storages/storages';

interface AppContextInterface {
  translate: any;
  changeLocale: any;
}

const LocaleContext = React.createContext<any>(null);

export const LocaleContextProvider = props => {
  const [locale, changeLocale] = useStorage('@language', 'en');
  I18n.Locales = locale;

  const _changeLocale = locale => {
    I18n.Locales = locale;
    changeLocale(locale);
  };

  return (
    <LocaleContext.Provider
      value={{
        ...I18n,
        localeProvider: locale,
        translate,
        changeLocale: _changeLocale,
      }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
