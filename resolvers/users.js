
const userResolver = {
  userExists: ({ user }) => {
    const { email, password } = user;
    const findUser = global.data.users.find(
      (user) => user.email === email && user.password === password);
    return !!findUser;
  },

  registerUser: ({ newUser }) => {
    global.data.users.push(newUser);
    return true;
  }
}
module.exports = userResolver;
