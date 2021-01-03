const mockData = {
  signUpValid: {
    name: 'berrry',
    email: 'neddybertinn@gmail.com',
    password: '12345678',
  },
  validData: {
    name: 'test123',
    email: 'test@gmail.com',
    password: 'test123',
  },
  validLogin: {
    name: 'berrry',
    email: 'berrry@gmail.com',
    password: 'berrry',
  },
  incorrectPasswordLogin: {
    name: 'berrry',
    email: 'berrry@gmail.com',
    password: 'berrryyy',
  },
  invalidPassword: {
    name: 'test123',
    email: 'test@gmail.com',
    password: 'test',
  },
  invalidEmail: {
    name: 'test123',
    email: 'test',
    password: 'test123',
  },
  invalidName: {
    name: '',
    email: 'test@gmail.com',
    password: 'test123',
  },
};
export default mockData;
