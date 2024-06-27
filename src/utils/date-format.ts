export const getLocaleFormattedDate = (date: Date, locale: string): string => {
    const pattern = chooseDateFormatter(locale);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses comienzan desde 0
    const year = date.getFullYear();

    let formattedDate = pattern
        .replace('dd', day)
        .replace('MM', month)
        .replace('yyyy', String(year));

    return formattedDate;
}

const chooseDateFormatter = (locale: string): string => {
    let pattern: string = '';

    switch (locale) {
        case 'es':
            pattern = 'dd-MM-yyyy';
            break;
        case 'en':
            pattern = 'yyyy/MM/dd';
            break;
        default:
            pattern = 'yyyy/MM/dd';
            break;
    }

    return pattern;
}