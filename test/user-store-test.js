/*
  Tests the UserStore object
*/
QUnit.test('added users show up in queries', function(assert) {
  var user = makeUser(),
    users = UserStore();

  assert.equal(users.query().length, 0);
  users.add(user);
  assert.equal(users.query().length, 1);
  assert.equal(users.query()[0], user);
});

QUnit.test('the same user cannot be added twice', function (assert) {
  var users = UserStore(),
    fooUser = makeUser('Foo', 'Bar', 'foo@bar.com');

  assert.ok(users.add(fooUser));
  assert.ok(!users.add(makeUser('Baz', 'Buf', fooUser.email)));

  assert.equal(users.query().length, 1);
  assert.equal(users.query()[0].firstName, fooUser.firstName);
});

QUnit.test('exists is true if a user is in store', function (assert) {
  var users = UserStore(),
    user = makeUser('Joe', 'Shmo', 'js@example.com');

  users.add(user);

  assert.ok(users.exists(makeUser('Hello', 'World', user.email)));
  assert.ok(!users.exists(makeUser()));
});

QUnit.test('remove removes a user', function (assert) {
  var user1 = makeUser('Jane', 'Doe', 'jd@example.com'),
    user2 = makeUser('Joe', 'Shmo', 'js@example.com'),
    users = UserStore();

  users.add(user1);
  users.add(user2);

  assert.ok(users.exists(user2), 'User 2 should exist');
  assert.ok(users.exists(user1), 'User 1 should exist');

  users.remove(user1);

  assert.ok(users.exists(user2), 'User 2 should exist');
  assert.ok(!users.exists(user1), 'User 1 should not exist');
});

QUnit.test('queryByRole returns all users that have the role', function (assert) {
  var user1 = makeUser(),
    user2 = makeUser('Joe', 'Shmo', 'js@example.com'),
    users = UserStore();

  users.add(user1);
  users.add(user2);

  assert.equal(users.queryByRole('admin').length, 0);

  user1.addRole('admin');

  assert.equal(users.queryByRole('admin').length, 1);
  assert.equal(users.queryByRole('admin')[0], user1);

  user2.addRole('admin');

  assert.equal(users.queryByRole('admin').length, 2);
});

QUnit.test('have same domain checks email domain', function (assert) {
  var user1 = makeUser('A', 'B', 'a@example.com'),
    user2 = makeUser('C', 'D', 'c@example.com'),
    users = UserStore();

  users.add(user1);
  users.add(user2);

  assert.ok(users.haveSameDomain());

  user2.email = 'foobar.com';

  assert.ok(!users.haveSameDomain());
});
