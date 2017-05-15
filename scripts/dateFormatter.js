'use strict';

const MONTHS = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
];

/**
 * Приводит дату к нужному формату
 * @param {String} date
 */
function formatDate(date) {
    const currentMoment = new Date();
    const dateFromString = new Date(date);
    if (dateFromString.toString() === 'Invalid Date') {
        throw new Error('Неверный формат даты');
    }
    const today = new Date(currentMoment);
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (dateFromString  > currentMoment) {
        throw new Error('Дата ещё не нступила');
    } else if (dateFromString >= today) {
        return getHoursAndMinutes(dateFromString);
    } else if (dateFromString >= yesterday) {
        return 'вчера в ' + getHoursAndMinutes(dateFromString);
    } else if (currentMoment.getYear() === dateFromString.getYear()) {
        return dateFromString.getDate() + ' ' + MONTHS[dateFromString.getMonth()] +
            ' в ' + getHoursAndMinutes(dateFromString);
    }
    return dateFromString.getDate() + ' ' + MONTHS[dateFromString.getMonth()] +
        ' ' + dateFromString.getFullYear() + ' года в ' +
        getHoursAndMinutes(dateFromString);
}

/**
 * Возвращает представление даты в часах и минутах
 * @param {Date} date
 */
function getHoursAndMinutes(date) {
    return (date.getHours() > 9 ?
            date.getHours() : '0' +
            date.getHours()) + ':' +
        (date.getMinutes() > 9 ?
            date.getMinutes() : '0' +
            date.getMinutes());
}

module.exports = formatDate;
