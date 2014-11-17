describe('orcaSearch', function() {

  beforeEach(module('orca'));

  var scope,compile;

  beforeEach(inject(function($rootScope,$compile) {
    scope = $rootScope.$new();
    compile = $compile;
  }));

  it('should ...', function() {

    var element = compile('<orca-search search="{ query:\'\' }"></orca-search>')(scope);
	  //scope.$digest();
	  console.log(element.text());
    //expect(element.text()).toBe('hello, world');
  });
});