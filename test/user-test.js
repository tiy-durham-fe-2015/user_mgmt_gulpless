/*
  Unit tests for the User class.
*/

qunitUtils.throwsException('spec is required', User);

qunitUtils.requireSpecStrings(['firstName', 'lastName', 'email'], User, makeUser)

QUnit.test('user constructor can take roles', function (assert) {
  var user = User({
    firstName: 'Chris',
    lastName: 'Davies',
    email: 'foo@bar.com',
    roles: ['admin', 'user']
  });

  assert.ok(user.isInRole('user'));
  assert.ok(user.isInRole('admin'));
});

QUnit.test('users with the same email should be equal', function (assert) {
  var user1 = makeUser(),
    user2 = makeUser('Joe', 'Shmo', 'js@example.com');

  assert.ok(!user1.equal(user2));
  assert.ok(user1.equal(makeUser()));
});

QUnit.test('add role puts user in role', function(assert) {
  var user = makeUser(),
    role = 'admin';

  assert.ok(!user.isInRole(role));
  user.addRole(role);
  assert.ok(user.isInRole(role));
});

QUnit.test('duplicate adds behave like a single add', function (assert) {
  var user = makeUser(),
    role = 'student';

  user.addRole(role);
  user.addRole(role);

  assert.ok(user.isInRole(role));

  user.removeRole(role);
  assert.ok(!user.isInRole(role));
});
