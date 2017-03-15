/* eslint-env mocha */
'use strict';

const request = require('supertest');

/* eslint no-warning-comments: 0 */
describe('Quests controller', () => {
    it('GET quest', () => {
        // TODO: надо более информативно
        request('https://localhost:8080')
            .get('/quests/1')
            .expect(200)
            .expect({status: 'success'});
    });

    it('Search', () => {
        // TODO: надо более информативно
        request('https://localhost:8080')
            .get('/quests/search/')
            .expect(200)
            .expect({status: 'success'});
    });
});
