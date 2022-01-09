const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

describe('GET /api/books', () => {
  it('should return all books', async () => {
    const res = await request(server).get('/api/books');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.docs.length).to.be.equal(3);
  });

  it('/:id should return chapters by books :id ', async () => {
    const res = await request(server).get('/api/books/5cf58077b53e011a64671583');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('object');
    // eslint-disable-next-line no-unused-expressions
    expect(res.body).to.not.be.null;
  });
});
