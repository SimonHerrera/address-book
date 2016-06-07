angular.module('app', ['ngRoute', 'ui.bootstrap'])
  .config(($routeProvider) => (
    $routeProvider
      .when('/', {
        controller: 'MainCtrl',
        controllerAs: 'main',
        templateUrl: 'app/partials/main.html',
      })
      .when('/addresses', {
        controller: 'AddressCtrl',
        controllerAs: 'address',
        templateUrl: 'app/partials/addresses.html',
      })
      .when('/addresses/new', {
        controller: 'NewAddressCtrl',
        controllerAs: 'address',
        templateUrl: 'app/partials/addresses-new.html',
      })
      //adding edit
      .when('/addresses/:id/edit', {
        controller: 'EditAddressCtrl',
        controllerAs: 'address',
        templateUrl: 'app/partials/addresses-new.html',
      })
      .otherwise('/')
  ))
  .controller('MainCtrl', function () {
    const main = this
  })
  .controller('AddressCtrl', function (AddressFactory) {
    const address = this

    address.list = AddressFactory.all()

    // challenge mode
    // AddressFactory.all().then(list =>
    //   address.list = list
    // )

    address.delete = (index) => {
      AddressFactory.delete(index)

      // grab list again
      // address.list = AddressFactory.all()
      // or
      // edit in place
      // address.list.splice(index, 1)
      address.list = [
        ...address.list.slice(0, index),
        ...address.list.slice(index + 1)
      ]
    }

    // challenge
    // address.delete = (index) => {
    //   AddressFactory.delete(index).then(...)
    // }
  })
  .factory('AddressFactory', () => {
    let list =   [
      {
        name: 'Simon Herrera',
        phone: '+16152345678',
        email: 'amy@example.com',
        twitter: 'amy'
      },
      {
        name: 'Nicole Herrera',
        phone: '615-982-4664',
        email: 'bob@example.com',
        twitter: 'bob'
      },
      {
        name: 'Connor Herrera',
        phone: '615-924-1365',
        email: 'cal@example.com',
        twitter: 'cal'
      },
      {
        name: 'Nicole Herrera',
        phone: '615-955-5599',
        email: 'dom@example.com',
        twitter: 'dom'
      }
    ]

    return {
      all () {
        return list
      },

      get (id) {
        return list[id]
      },

      create (person) {
        list.push(person)
      },

      update (index, person) {
        // id when passed by $routeParams is a string
        // thus: string + 1 === `${string}1`
        // prefer unary plus operator: +string + 1 === Number(string) + 1

        list = [
          ...list.slice(0, index),
          person,
          ...list.slice(+index + 1),
        ]
      },

      delete (index) {
        list = [
          ...list.slice(0, index),
          ...list.slice(index + 1),
        ]
      }
    }
  })
  .controller('EditAddressCtrl', function (AddressFactory, $routeParams, $location) {
    const address = this
    const id = $routeParams.id

    address.person = AddressFactory.get(id)

    // challenge mode
    // AddressFactory.get(index).then(...)

    address.submit = () => {
      AddressFactory.update(id, address.person)
      $location.path('/addresses')

      // challenge mode
      // AddressFactory.update(address.person).then(...)
    }
  })
  .controller('NewAddressCtrl', function (AddressFactory, $location) {
    const address = this

    address.submit = () => {
      AddressFactory.create(address.person)
      $location.path('/addresses')

      // challenge mode
      // AddressFactory.create(address.person).then(...)
      //
      // challenge mode #2: add a 1 second delay, but implemnet #1 first
    }
  })












  [
      {
        name: 'Simon Herrera',
        phone: '+16152345678',
        email: 'amy@example.com',
        twitter: 'amy'
      },
      {
        name: 'Nicole Herrera',
        phone: '+16153456789',
        email: 'bob@example.com',
        twitter: 'bob'
      },
      {
        name: 'Connor Herrera',
        phone: '+16154567890',
        email: 'cal@example.com',
        twitter: 'cal'
      },
      {
        name: 'Nicole Herrera',
        phone: '+16155678901',
        email: 'dom@example.com',
        twitter: 'dom'
      }
    ]