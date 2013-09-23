'use strict';

describe('PairController', function() {
	var scope;
	beforeEach(angular.mock.module('PairTime'));
	beforeEach(angular.mock.inject(function($rootScope,$controller){
		scope = $rootScope.new();
		$controller('PairController', {$scope:scope});
	}));

	it('should have pairs', function() {
		expect(scope).not.toBe(null);
		expect(scope.pairs).not.toBe(null);
	});
});