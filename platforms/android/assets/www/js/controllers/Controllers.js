angular.module('starter.controllers', [])
	.controller('LoginCtrl', function($scope, $http, $cookieStore, $state, $ionicHistory, $ionicPopup, $cookieStore, HOST2) {

		$scope.user = {
			"mobile": "13480869096",
			"passwd": "7890123"
		};

		$scope.$on("$ionicView.beforeEnter", function() {
			$ionicHistory.clearCache();
			$ionicHistory.clearHistory();
		});

		$scope.login = function() {
			$http.post(HOST2 + "imitationShy/login.do", $scope.user).success(function(response) {
				if (response.success) {
					$http.post(HOST2 + "imitationShy/customerinfo.do", {
						"mobile": $scope.user.mobile
					}).success(function(response) {
						if (response.success) {
							var item = angular.fromJson(response);
							$cookieStore.put("userInfo", item.obj);
						}
					});
					$state.go('tab.product');

				} else {
					$ionicPopup.alert({
						title: '确认',
						template: response.desc
					});
				}
			});
		};

	});