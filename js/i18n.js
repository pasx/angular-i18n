'use strict';

// declare modules

angular.module('i18n', ['ngResource']);


//i18n module features
angular.module('i18n')

.service('i18nService', function($rootScope,$resource) {  

        this.loadPromise = function(scope, language,success,params)
        {
            return new Promise(function(resolve, reject){
            var languageFilePath = 'i18n/i18n_' + language + '.json';
            console.log(languageFilePath);
            $resource(languageFilePath).get(function (data) {
                    scope.i18n = data;
                    resolve(language,data);                    
                },
                function(error){
                    reject(error);
                });
            });
        };
        
        this.getTranslation = function(scope, language, success, error) {
            
            //use current dictionary if present and same language
            if(language==scope.selectedLanguage && scope.i18n) success(language);            
            
            this.loadPromise(scope, language).then(function(lang){                
                 console.log(lang);
                 if(success) success('i18n - Current languages: ' + lang);
            }).catch(function(err){
                var s = "unspecified";
                if(err){
                    s = (err.status||"?") + " " + (err.statusText||s);
                }
                s = 'i18n - Error loading resources: ' + s;
                console.log(s);
                if(error) error(err);
                else alert(s);
            });                                   
        };    
        
        //clear data stored on scope to force a reload even if same language in next call to getTranslation (so server can be udpated w/o a restart)
        this.clear = function(scope) {
            scope = scope || $rootScope;
             scope.selectedLanguage = null;
             scope.i18n = null;
        }; 
        
        this.initialize = function(language,scope) {
            scope = scope || $rootScope;
             scope.selectedLanguage = language;
             //this function is provided to switch from one language to another on the given scope
             //or to access resources once they are loaded
             var that = this;
             scope.getTranslation = function (success, error, lang) {
                    if(!lang) lang = scope.selectedLanguage;
                    that.getTranslation(scope, lang, success, error);
                };
             this.getTranslation(scope, language);
        };    
    }) 

.run(['i18nService',
    function (i18nService ) {
        i18nService.initialize('en');
    }]);

