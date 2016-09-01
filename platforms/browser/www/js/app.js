'use strict';

angular.module('starter', ['ionic', 'starter.controllers', 'ngCookies']).run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if (window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.constant('HOST', "http://113.207.110.2:8180/")//业务接口
	.constant('HOST2', "http://115.28.180.117:8080/")//后台支持接口
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('tab', {
			url: '/tab',
			abstract: true,
			templateUrl: 'templates/tabs.html'
		}).state('tab.product', {
			url: '/product',
			views: {
				'tab-product': {
					templateUrl: 'templates/tab-product.html',
					controller: 'ProductCtrl'
				}
			}
		}).state('tab.loanApply', {
			url: '/loanApply/:productId',
			views: {
				'tab-product': {
					templateUrl: 'templates/loan/apply.html',
					controller: 'LoanApplyCtrl'
				}
			}
		}).state('tab.myData', {
			url: '/myData',
			views: {
				'tab-myData': {
					templateUrl: 'templates/tab-myData.html',
					controller: 'MyDataCtrl'
				}
			}
		}).state('tab.payment', {
			url: '/payment/:applyId/:orderid/:loannumber/:productType',
			views: {
				'tab-myData': {
					templateUrl: 'templates/myData/payment.html',
					controller: 'PaymentCtrl'
				}
			}
		}).state('tab.account', {
			url: '/account',
			views: {
				'tab-account': {
					templateUrl: 'templates/tab-account.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.about', {
			url: '/about',
			views: {
				'tab-account': {
					templateUrl: 'templates/account/about.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.accountinfo', {
			url: '/accountinfo',
			views: {
				'tab-account': {
					templateUrl: 'templates/account/accountinfo.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.logout', {
			url: '/logout',
			views: {
				'tab-account': {
					templateUrl: 'templates/public/login.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('login', {
			url: '/login',
			templateUrl: 'templates/public/login.html',
			controller: 'LoginCtrl'
		}).state('register', {
			url: '/register',
			templateUrl: 'templates/public/register.html',
			controller: 'AccountCtrl'
		}).state('tab.bindingCard', {
			url: '/bindingCard',
			views: {
				'tab-account': {
					templateUrl: 'templates/public/bindingCard.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.bankList', {
			url: '/bankList',
			views: {
				'tab-account': {
					templateUrl: 'templates/public/bankList.html',
					controller: 'BankListCtrl'
				}
			}
		}).state('tab.bindingSuccess', {
			url: '/bindingSuccess',
			views: {
				'tab-account': {
					templateUrl: 'templates/public/bindingSuccess.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.bindingVerify', {
			url: '/bindingVerify',
			views: {
				'tab-account': {
					templateUrl: 'templates/public/bindingVerify.html',
					controller: 'AccountCtrl'
				}
			}
		}).state('tab.applySuccess', {
			url: '/applySuccess',
			views: {
				'tab-product': {
					templateUrl: 'templates/loan/applySuccess.html',
					controller: 'ProductCtrl'
				}
			}
		}).state('tab.paysuccess', {
			url: '/paysuccess',
			views: {
				'tab-myData': {
					templateUrl: 'templates/myData/paysuccess.html',
					controller: 'PaymentCtrl'
				}
			}
		}).state('tab.payVerifyCode', {
			url: '/payVerifyCode/:payMerchantId/:payOrderId',
			views: {
				'tab-myData': {
					templateUrl: 'templates/myData/payVerifyCode.html',
					controller: 'PaymentCtrl'
				}
			}
		});

		$urlRouterProvider.otherwise('/login');

		//$urlRouterProvider.otherwise('/tab/product');
	});