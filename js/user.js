// User constructs a new user object. For more details, see
// https://github.com/tiy-durham-fe-2015/curriculum/tree/master/assignments/user_mgmt
function User(spec) {
  var self = {
    firstName: spec.firstName,
    lastName: spec.lastName,
    email: spec.email,

    equal: function (otherUser) {
      return self.email === otherUser.email;
    }
  };

  return self;
}

