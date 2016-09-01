var app = angular.module('starter');

app.controller('ProductCtrl', function($scope) {

});

app.controller('LoanApplyCtrl', function($scope, $http, $state, $stateParams, $ionicPopup, HOST, $filter, $cookieStore) {
	var id = $stateParams.productId;
	$scope.apply = {};
	var it = $cookieStore.get("userInfo");
	$scope.apply.bankCode = it.bankcode || "";
	$scope.apply.bankName = it.bankname || "";
	$scope.apply.bankMobile = it.bankmobile || "";
	$scope.apply.bankLocation = it.banklocation || "";
	$scope.apply.province = it.bankprovince || "";
	$scope.apply.city = it.bankcity || "";
	$scope.apply.name = it.name || "";
	$scope.apply.mobile = it.mobile || "";
	$scope.apply.idnum = it.certId || "";
	$scope.apply.bankCardNo = it.bankcardno || "";
	$scope.apply.merchantId = "200";
	$scope.apply.productType = id;
	$scope.apply.eContractUrl = "";
	$scope.apply.idPhotoUrl = "";
	$scope.apply.service = "200";
	$scope.apply.subOrderId = "";
	$scope.apply.dateOfCredit = "";
	$scope.apply.subloanamount = "";
	$scope.apply.userid = "";
	$scope.apply.appdesc = "app测试2";

 $scope.xiunums=new Array();
for (var i=7; i <=30; i++) {
	$scope.xiunums.push(i);
}

$scope.loanApply = function() {
if($scope.apply.Loannumbers<=0)
{
	$ionicPopup.alert({
				title: "系统提示",
				template: "必须选择期数！"
			});
	return false;
}
		//realamount是用户到手的钱，loanamount是加上服务费的金额
		if (id == 1) {
			if($scope.apply.loanAmount==null){
				$ionicPopup.alert({
				title: "系统提示",
				template: "请输入100-10000范围内的贷款金额！"
			});
		  return false;
			}
			$scope.apply.productCode = "C0001";
			$scope.apply.realAmount = $scope.apply.loanAmount;
			$scope.apply.loanAmount = parseFloat($scope.apply.loanAmount * (1 + 0.08)).toFixed(2);
		} else {
				if($scope.apply.loanAmount==null){
				$ionicPopup.alert({
				title: "系统提示",
				template: "请输入1000-5000范围内的贷款金额！"
			});
		  return false;
		}
			$scope.apply.productCode = "C00002";
			//借款金额/(1+天数*利率/360)
			$scope.apply.realAmount = parseFloat($scope.apply.loanAmount / (1 + $scope.apply.Loannumbers * 0.14 / 360)).toFixed(2);
		}


		$scope.apply.loanOrderId = $filter('date')(new Date(), "yyyyMMddHHmmss") + parseInt(100 * Math.random() + 100);

		$http.defaults.headers.post["Content-Type"] = "application/json";
		$http.post(HOST + "MicroCredit/load/request", angular.toJson($scope.apply)).success(function(response) {
			if (response.rspCode == "0000") {
				$state.go('tab.applySuccess');
			} else {
				$ionicPopup.alert({
					title: response.rspCode,
					template: response.rspMsg
				});
			}
		}).error(function(response) {
			$ionicPopup.alert({
				title: "确认",
				template: "程序异常！"
			});
		});
	};
});