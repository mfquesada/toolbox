const { expect } = require('chai');
const sinon = require('sinon');

const serviceFactory = require('./externalData.service');

describe('externalData.service', () => {
  afterEach(() => {
    sinon.restore();
  });

  describe('getFiles', () => {
    it('should return object with fetchedAt and data when client resolves', async () => {
      const fakeFiles = {
        "fetchedAt": "2025-10-05T23:05:33.697Z",
        "data": {
          "files": [
            "test1.csv",
            "test2.csv",
            "test3.csv",
            "test18.csv",
            "test4.csv",
            "test5.csv",
            "test6.csv",
            "test9.csv",
            "test15.csv"
          ]
        }
      };
      const externalDataClient = {
        getExternalDataFiles: sinon.stub().resolves(fakeFiles)
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFiles();

      expect(res).to.be.an('object');
      expect(res).to.have.property('fetchedAt').that.is.a('string');
      expect(res).to.have.property('data').that.deep.equals(fakeFiles);
      expect(externalDataClient.getExternalDataFiles.calledOnce).to.be.true;
    });

    it('should return undefined when client throws an error', async () => {
      const externalDataClient = {
        getExternalDataFiles: sinon.stub().rejects(new Error('404'))
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFiles();

      expect(res).to.be.undefined;
      expect(externalDataClient.getExternalDataFiles.calledOnce).to.be.true;
    });
  });

  describe('getFileContent', () => {
    it('should parse CSV content and return transformed objects', async () => {
      const csv = 'file,text,number,hex\ntest2.csv,ABnnc\ntest2.csv,HbAQATXQbFqpJwybxClLZo,3843364,e2852af4ba06def4cc49e5edc8df4a7e';
      const externalDataClient = {
        getExternalDataFileContent: sinon.stub().resolves(csv)
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFileContent('test2.csv');

      expect(res).to.be.an('object');
      expect(res).to.have.property('fetchedAt').that.is.a('string');
      expect(res).to.have.property('data').that.is.an('array').with.lengthOf(1);

      expect(res.data[0]).to.deep.equal({ text: 'HbAQATXQbFqpJwybxClLZo', number: '3843364', hex: 'e2852af4ba06def4cc49e5edc8df4a7e' });
      expect(externalDataClient.getExternalDataFileContent.calledOnceWith('test2.csv')).to.be.true;
    });

    it('should ignore rows with missing columns', async () => {
      const csv = 'file,text,number,hex\ntest2.csv,ABnnc\ntest2.csv,HbAQATXQbFqpJwybxClLZo,3843364,e2852af4ba06def4cc49e5edc8df4a7e';
      const externalDataClient = {
        getExternalDataFileContent: sinon.stub().resolves(csv)
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFileContent('test2.csv');

      expect(res).to.be.an('object');
      expect(res.data).to.be.an('array').with.lengthOf(1);
      expect(res.data[0]).to.deep.equal({ text: 'HbAQATXQbFqpJwybxClLZo', number: '3843364', hex: 'e2852af4ba06def4cc49e5edc8df4a7e' });
    });

    it('should return empty data array when client returns undefined', async () => {
      const externalDataClient = {
        getExternalDataFileContent: sinon.stub().resolves(undefined)
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFileContent('test4.csv');

      expect(res).to.be.an('object');
      expect(res).to.have.property('data').that.is.an('array').with.lengthOf(0);
    });

    it('should return undefined when client throws an error', async () => {
      const externalDataClient = {
        getExternalDataFileContent: sinon.stub().rejects(new Error('500'))
      };

      const service = serviceFactory({ externalDataClient });
      const res = await service.getFileContent('test4.csv');

      expect(res).to.be.undefined;
      expect(externalDataClient.getExternalDataFileContent.calledOnceWith('test4.csv')).to.be.true;
    });
  });
});
