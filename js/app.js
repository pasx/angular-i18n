
app = angular.module('app', [
   'i18n'
]);

app.controller('appCtrl',['$scope',
function ($scope){  
  
}]);

app.run(['$rootScope',
    function ($rootScope) {        
        $rootScope.getTranslation (function(lang) { 
                var i18n = $rootScope.i18n; //when the function returns, the dictionary is defined
                alert(i18n.Hello);
            });
    }]);

