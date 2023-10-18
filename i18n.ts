// i18n.ts
import { i18n } from 'next-i18next';

// @ts-ignore
export default i18n({
    locales: ['en'],
    defaultLocale: 'en',
    interpolation: {
        escapeValue: false,
    },
});