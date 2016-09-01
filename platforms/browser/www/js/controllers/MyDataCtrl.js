var app = angular.module('starter');

app.controller('MyDataCtrl', function($stateParams, $scope, $http, $cookieStore, HOST) {
	var temp = $cookieStore.get("userInfo");

	var merchantId = "200";
	$http.post(HOST + "MicroCredit/load/querysubcontract", {
		idnum: temp.certId,
		merchantId: merchantId,
		sign: "",
		t: new Date().getTime()
	}).success(function(response) {
		if (response.rspCode == "0000") {
			$scope.list = response.subContractList;
		}

	});
});

app.controller('PaymentCtrl', function($scope, $http, $state, $stateParams, $ionicPopup, $filter, $cookieStore, HOST) {
	$scope.apply = {};
	var temp = $cookieStore.get("userInfo");
	
	$scope.apply.mobile = temp.mobile;
	$scope.apply.name = temp.name;
	$scope.apply.idnum = temp.certId;
	$scope.onlyOne=$stateParams.productType=="C00002";
	if($scope.onlyOne){
		$scope.apply.loanNumber = $stateParams.loannumber;
	}
	$scope.apply.merchantId = "200";
	$scope.apply.loanOrderId = $scope.apply.mobile.substring(8, 4) + $filter('date')(new Date(), "yyMMddHHmmss") + parseInt(100 * Math.random() + 100);
	$scope.apply.orderid = $stateParams.orderid;
	$scope.verify = {};
	$scope.verify.merchantId = $stateParams.payMerchantId;
	$scope.verify.orderId = $stateParams.payOrderId;
    var loanNumberTotal=parseInt($stateParams.loannumber);
   	
    if(!isNaN(loanNumberTotal)){
	var myArray=new Array(loanNumberTotal);
	for(var i = 0;i<loanNumberTotal;i++){
	 	myArray[i]=i+1;
	 }
	}
	$scope.loanNumberList = myArray;
	$http.post(HOST + "MicroCredit/queryUserBankcard", {
		idnum: $scope.apply.idnum,
		t: new Date().getTime()
	}).success(function(response) {
		var list = angular.fromJson(response);
		$scope.bankCardNoList = list.info;
	});

	$scope.sendPayMsg = function() {
		$http.post(HOST + "MicroCredit/SmsCodeReDo", angular.toJson($scope.verify)).success(function(response) {
			if (response.rspCode == "0000") {
				$ionicPopup.alert({
					title: '确认',
					template: "验证短信已发送"
				});
			} else {
				$ionicPopup.alert({
					title: '确认',
					template: "发送验证码失败"
				});
			}
		}).error(function(response) {
			$ionicPopup.alert({
				title: '确认',
				template: "程序异常！"
			});
		});;
	};

	$scope.checkPayVerifyCode = function() {
		$http.post(HOST + "MicroCredit/SmsCodeCfm", angular.toJson($scope.verify)).success(function(response) {
			if (response.rspCode == "0000") {
				$state.go('tab.paysuccess');
			} else {
				$ionicPopup.alert({
					title: '确认',
					template: "验证失败！"
				});
			}
		}).error(function(response) {
			$ionicPopup.alert({
				title: '确认',
				template: "程序异常！"
			});
		});;

	};

	$scope.paymentApply = function() {
		if($scope.apply.bankCardNo==0){
			$ionicPopup.alert({
				title: '确认',
				template: "请选择银行卡号"
			});
			return ;
		}
		if($scope.apply.loanNumber==0){
			$ionicPopup.alert({
				title: '确认',
				template: "请选择当前还款期数"
			});
			return ;
		}
		$http.post(HOST + "MicroCredit/LoanRepay/pay", angular.toJson($scope.apply)).success(function(response) {
			if (response.rspCode == "0000") {
				$state.go('tab.payVerifyCode', {
					payMerchantId: $scope.apply.merchantId,
					payOrderId: $scope.apply.loanOrderId
				});
			} else {
				$ionicPopup.alert({
					title: '确认',
					template: "操作失败,失败原因:" + response.rspCode
				});
			}
		}).error(function(response) {
			$ionicPopup.alert({
				title: '确认',
				template: "程序异常！"
			});
		});
	};
});