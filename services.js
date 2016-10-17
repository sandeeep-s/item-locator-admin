angular.module('itemAdmin.services', []).factory('Item', function($resource) {
  return $resource('http://localhost:8090/items/:id', { id: '@_id' }, {
    update: {
      method: 'PUT'
    }
  });
});
