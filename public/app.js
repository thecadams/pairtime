var App = angular.module('PairTime', ['ngDragDrop']);
App.directive('ngFocus', function($timeout) {
	return {
		link: function(scope, element, attrs) {
			scope.$watch(attrs.ngFocus, function() {
				$timeout(function() {
					element[0].focus();
				});
			}, true);
		}
	};
});
App.controller('PairController', function($scope) {
	$scope.pairs = [];
	$scope.newName = null;
	$scope.delete = function(person) {
		person.name = null;
		person.locked = false;
		removeEmptyPairs();
	}
	$scope.add = function() {
		var newNames = $scope.newName.split(',');
		$scope.newName=null;
		for (var i=0; i<newNames.length; i++) {
			insertOrAdd(newNames[i].trim());
		}
	}
	function insertOrAdd(name) {
		for (var pair_idx=0; pair_idx<$scope.pairs.length; pair_idx++) {
			for (var person_idx=0; person_idx<2; person_idx++) {
				person = $scope.pairs[pair_idx][person_idx];
				if (!person.locked && person.name==null) {
					person.name=name;
					return;
				}
			}
		}
		$scope.pairs.push(newPair(name,null));
	}
	$scope.addOnEnter = function(ev) {
		if (ev.which==13) $scope.add();
	}
	$scope.shuffle = function() {
		removeEmptyPairs();
		var lockedIndices = getLockedIndices();
		var unlockedCount = $scope.pairs.length*2 - lockedIndices.length;
		if (unlockedCount < 2)
			return;
		else if (unlockedCount == 2)
			swapPeople(0, 1, lockedIndices);
		else
			fisherYates(unlockedCount, lockedIndices);
	}
	function getLockedIndices() {
		var locked = [];
		for (var pair_idx=0; pair_idx<$scope.pairs.length; pair_idx++) {
			for (var person_idx=0; person_idx<$scope.pairs[pair_idx].length; person_idx++) {
				if ($scope.pairs[pair_idx][person_idx].locked)
					locked.push(pair_idx*2 + person_idx);
			}
		}
		return locked;
	}
	function fisherYates(count, lockedIndices) {
		for (var i = count-1; i > 0; i--) {
			var indexToSwapWith = getRandomInt(0, i);
			swapPeople(i, indexToSwapWith, lockedIndices);
		}
	}
	function swapPeople(index1, index2, lockedIndices) {
		person1_idx = skipLocked(index1, lockedIndices);
		person2_idx = skipLocked(index2, lockedIndices);
		if (person1_idx == person2_idx) return;
		tmp = $scope.pairs[Math.floor(person1_idx/2)][person1_idx%2];
		$scope.pairs[Math.floor(person1_idx/2)][person1_idx%2] = $scope.pairs[Math.floor(person2_idx/2)][person2_idx%2];
		$scope.pairs[Math.floor(person2_idx/2)][person2_idx%2] = tmp;
	}
	function skipLocked(target, lockedIndices) {
		// lockedIndices is a sorted array of the indexes of items to skip
		for (var i = 0; i < lockedIndices.length && lockedIndices[i] <= target; i++) {
			target++;
		}
		return target;
	}
	function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}
	function newPair(name1,name2) {
		return [{name:name1,locked:false},{name:name2,locked:false}];
	}
	function removeEmptyPairs() {
		for (var pair_idx=0; pair_idx<$scope.pairs.length; pair_idx++) {
			var hasPeopleOrLockedEmptySlots = false;
			for (var person_idx=0; person_idx<$scope.pairs[pair_idx].length; person_idx++) {
				person = $scope.pairs[pair_idx][person_idx];
				if (person.name != null || person.locked)
					hasPeopleOrLockedEmptySlots = true;
			}
			if (!hasPeopleOrLockedEmptySlots) {
				$scope.pairs.splice(pair_idx,1);
				pair_idx--;
			}
		}
	}
	// $scope.onStop = function(event,ui) {
	// 	setTimeout(logStuff,100);
	// }
	// function logStuff() {
	// 	console.log('logStuff');
	// 	console.log($scope.pairs);
	// 	console.log($scope.pairs[0][0]);
	// 	console.log($scope.pairs[0][1]);
	// 	console.log($scope.pairs[1][0]);
	// 	console.log($scope.pairs[1][1]);
	// }
	// function skipLockedTests() {
	// 	console.log(skipLocked(0,[]),'expected 0');
	// 	console.log(skipLocked(0,[0]), 'expected 1');
	// 	console.log(skipLocked(1,[0]), 'expected 2');
	// 	console.log(skipLocked(0,[0,1]), 'expected 2');
	// 	console.log(skipLocked(1,[0,1]), 'expected 3');
	// 	console.log(skipLocked(2,[0,1]), 'expected 4');
	// }
	// skipLockedTests();
});