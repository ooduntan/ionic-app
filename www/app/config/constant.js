angular.module('healthyPlaces')

//DEV
  .constant('BACKEND_URL', 'https://hp-dev.firebaseio.com/')
  .constant('IS_DEBUG', true);

//QA
//   .constant('BACKEND_URL','https://hp-qa-2091b.firebaseio.com/')
//   .constant('IS_DEBUG', true);

//PROD
//  .constant('BACKEND_URL','https://healthyplaces.firebaseio.com/')
//  .constant('IS_DEBUG', false);
