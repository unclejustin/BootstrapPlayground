describe('APIURL', function() {

  beforeEach(module('orca'));

  it('should equal http://localhost:8888', inject(function(APIURL) {

	expect(APIURL).toEqual('http://localhost:8888');

  }));

});