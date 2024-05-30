import {type ClassValue, clsx} from 'clsx';
import {twMerge} from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

const date = (
    date: number | Date,
    locale: Intl.LocalesArgument = 'en-GB',
    options: Intl.DateTimeFormatOptions = {
        dateStyle: 'full',
        timeStyle: 'long',
    }
) => {
    const now = new Date(date);

    return new Intl
        .DateTimeFormat(locale, options)
        .format(now)
};

const getShortFullName = (name = 'Dou Jonh') => {
    const regex = /\b\w/g;
    const shortFullName = name.match(regex) || [];

    return shortFullName
        .join('')
        .toUpperCase()
};

export {
    cn,
    date,
    getShortFullName
};
