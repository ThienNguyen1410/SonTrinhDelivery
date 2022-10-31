import {TxKeyPath} from './i18n';
import {useContext} from 'react';
import LocaleContext from './LocaleContext';
import i18n from './i18n';

/**
 * Translates text.
 *
 * @param key The i18n key.
 */
export function translate(key: TxKeyPath, options?: any) {
  return key ? i18n.t(key, options) : null;
}

export const useTranslation = (props?) => {
  return useContext(LocaleContext);
};
