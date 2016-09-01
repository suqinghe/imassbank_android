'use strict';

var app = angular.module('starter');
var orderId = ""; //绑定OrderId
var bindingCustomerInfo = {}; //绑定客户信息

app.controller('AccountCtrl', function($scope, $http, $state, $cookieStore, $ionicPopup, $filter, HOST, HOST2) {


	$scope.getBindingOrderId = function() {
		var user = $cookieStore.get("LocalUser");
		var orderId = moment().format('YYYYMMDDHHmmss');
		return new Date().getTime() + parseInt(100000 * Math.random() + 100000); // orderId;
	}

	$scope.user = {
		'merchantId': '',
		'mobile': '18664926701',
		'name': '苏庆贺',
		'idnum': '411402198903107115',
		'idPhotoUrl': 'http://wecash/dfdjkfj.jpg',
		'bankCardNo': '6226097557126431',
		'bankCode': 'CMB',
		'bankName': '招商银行',
		'bankLocation': '招商银行南硅谷支行',
		'province': 'GD',
		'city': 'SZ',
		'sign': 'GTyX3nLO9vseMJ+RB/dNrZp9XEHCzFkHpgtaZKa8aCc='
	};

	$scope.banks = [{
		'ID': 1,
		'Code': 'ICBC',
		'Name': '工商银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 2,
		'Code': 'ABC',
		'Name': '农业银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 3,
		'Code': 'CMB',
		'Name': '招商银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 4,
		'Code': 'BOC',
		'Name': '中国银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 5,
		'Code': 'CCB',
		'Name': '建设银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 6,
		'Code': 'CEB',
		'Name': '光大银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 7,
		'Code': 'CIB',
		'Name': '兴业银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 8,
		'Code': 'HXB',
		'Name': '华夏银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 9,
		'Code': 'SHB',
		'Name': '上海银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 10,
		'Code': 'CMBC',
		'Name': '民生银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 11,
		'Code': 'BCCB',
		'Name': '北京银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 12,
		'Code': 'SPDB',
		'Name': '浦发银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 13,
		'Code': 'SZCB',
		'Name': '平安银行',
		'Desc': '还款，理财，消费'
	}, {
		'ID': 14,
		'Code': 'CGB',
		'Name': '广发银行',
		'Desc': '还款，理财，消费'
	}];

	$scope.logout = function() {
		$state.go('login');
	};

	$scope.register = function() {
		if ($scope.user.passwd != $scope.user.ConfirmPwd) {
			$ionicPopup.alert({
				title: '系统提示',
				template: '密码和确认密码必须一致'
			});
		} else {
			$http.post(HOST2 + "imitationShy/register.do", $scope.user)
				.success(
					function(response) {

						var msg = response.desc;
						if (response.success) {
							msg += ',请继续完成银行卡绑定';
						}

						$ionicPopup.alert({
							title: '确认',
							template: msg
						});
						if (response.success) {
							$cookieStore.put("LoginUser", $scope.user);

							//跳转到银行卡绑定页面
							$state.go('tab.bindingCard');
						}
					}
				);
		}
	}

	$scope.findBankByName = function(name) {
		for (var i = 0; i < $scope.banks.length; i++) {
			if ($scope.banks[i].Name == name) {
				return $scope.banks[i];
				break;
			}
		}
	}

	$scope.bindingCommit = function() {
		//根据选择银行，把银行代码写入
		var selectBank = $scope.findBankByName($scope.user.bankName);
		$scope.user.bankCode = selectBank.Code;

		orderId = $scope.user.mobile.substring(8, 4) + $filter('date')(new Date(), "yyMMddHHmmss") + parseInt(100 * Math.random() + 100);
		$scope.user.orderId = orderId;

		$http.post(HOST + "MicroCredit/verifyBankCard", $scope.user)
			.success(
				function(response) {
					var msg = response.desc;
					if (response.rspCode == '0000') {

						bindingCustomerInfo = {
							"mobile": $scope.user.mobile,
							"bankmobile": $scope.user.mobile,
							"name": $scope.user.name,
							"certId": $scope.user.idnum,
							"bankcardno": $scope.user.bankCardNo,
							"bankcode": $scope.user.bankCode,
							"bankname": $scope.user.bankName,
							"banklocation": $scope.user.bankLocation,
							"bankprovince": $scope.user.province,
							"bankcity": $scope.user.city
						};

						//需要验证，则需跳转到
						if (response.needBinding == 'Y') {
							$state.go('tab.bindingVerify');
						} else {
							$state.go('tab.product');
						}
					} else {
						$ionicPopup.alert({
							title: '确认',
							template: response.rspMsg
						});
					}
				}
			);
	};

	/*
		绑定本地银行卡
	 */
	$scope.bindingLocalBankCard = function() {

		$http.post(HOST2 + "imitationShy/bindbankcard.do", bindingCustomerInfo)
			.success(
				function(response) {
					if (!response.success) {
						$ionicPopup.alert({
							title: '确认',
							template: response.desc
						});
					}
				}
			);
	}

	$scope.verifySMSCode = function() {
		$scope.user.orderId = orderId;
		$http.post(HOST + "MicroCredit/SmsCodeCfm", $scope.user)
			.success(
				function(response) {
					var msg = response.desc;
					if (response.rspCode == '0000') {
						//添加本地绑定
						$scope.bindingLocalBankCard();
						//绑定成功后跳转
						$state.go('tab.bindingSuccess');
					} else {
						$ionicPopup.alert({
							title: '确认',
							template: response.rspMsg
						});
					}
				}
			);
	};

	$scope.resendVerifyCode = function() {
		$scope.user.orderId = orderId;
		$http.post(HOST + "MicroCredit/SmsCodeReDo", $scope.user)
			.success(
				function(response) {
					if (response.rspCode != '0000') {
						$ionicPopup.alert({
							title: '确认',
							template: response.rspMsg
						});
					}
				}
			);
	}


});