'use strict';

angular.module('cpZenPlatform').factory('utilsService', function() {
  var utils = {};

  utils.toTags = function(values){
    var tags = _.map(values, function(value){
      return {text: value};
    });

    return tags;
  };

  utils.frTags = function(tags){
    return _.pluck(tags, 'text');
  };

  utils.contains = _.contains;

  utils.hasAccess = function(userTypes, allowedTypes){
    var returnType = _.find(allowedTypes, function(allowedType){
      return _.contains(userTypes, allowedType);
    });
    return (typeof returnType === 'undefined') ? false : true;
  };

  utils.validatePassword = function(password, email) {
    if(password) {
      var numbers = /[0-9]/;
      var characters = /[!|@|#|$|%|^|&|*|(|)|-|_]/;

      var numberCount = numbers.test(password);
      var characterCount = characters.test(password);
      var minPasswordLength = 8;
      var characterGroupCount = numberCount + characterCount;

      var matchesEmail = (function() { 
        if(password === email) { 
          return true; 
        } else { 
          return false; 
        }
      }());
      
      if ((password.length >= minPasswordLength) && (characterGroupCount >= 1) && !matchesEmail) {
        //Password valid
        return {valid: true};
      } else if(matchesEmail) {
        //Password matches email address
        return {valid: false, msg: 'Password must not be the same as your email address'};
      } else {
        //Password invalid
        return {valid: false, msg: 'Password must be a minimum of 8 characters in length and contain at least one number or punctuation character'};
      }
    }
    return {valid: true};
  }

  utils.capitalizeFirstLetter = function (string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  utils.keyForValue = function (obj, value) {
    for( var prop in obj ) {
      if( obj.hasOwnProperty( prop ) ) {
        if( obj[ prop ] === value )
          return prop;
      }
    }
  }

  utils.getHighestUserType = function (userTypes) {
    var userTypesByPermissionLevel = {
      'champion': 1,
      'mentor': 2,
      'parent-guardian': 3,
      'attendee-o13': 4,
      'attendee-u13': 5
    };

    var userTypeNumbers = [];

    _.each(userTypes, function (userType) {
      userTypeNumbers.push(userTypesByPermissionLevel[userType]);
    });

    var sortedUserTypeNumbers = _.sortBy(userTypeNumbers);
    var highestUserType = utils.keyForValue(userTypesByPermissionLevel, sortedUserTypeNumbers[0]);
    return highestUserType;
  }

  return utils;
});
