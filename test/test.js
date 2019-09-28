var assert = require('assert');
var should = require('should');
var request = require('supertest');
var app = require('../server');

it('testing /webhook endpoint', async done => {
  const res = await request.post('/webhooks')
})



