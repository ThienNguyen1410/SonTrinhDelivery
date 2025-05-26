import React, {useEffect} from 'react';
import {translate} from './translate';
import {useStorage} from '@util/storages/storages';
import i18n from './i18n';

interface AppContextInterface {
  translate: any;
  changeLocale: any;
}

const LocaleContext = React.createContext<any>('');

export const LocaleContextProvider = (props: any) => {
  const [locale, changeLocale] = useStorage('@language', 'vi');
  i18n.locale = locale;

  const _changeLocale = (locale: any) => {
    changeLocale(locale);
    i18n.locale = locale;
  };

  return (
    <LocaleContext.Provider
      value={{
        locale,
        translate,
        changeLocale: _changeLocale,
      }}>
      {props.children}
    </LocaleContext.Provider>
  );
};

export default LocaleContext;
