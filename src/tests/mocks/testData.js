const mockData = {
  signUpValid: {
    name: 'test',
    email: 'neddytest1@gmail.com',
    password: '12345678',
  },
  validData: {
    name: 'test123',
    email: 'test@gmail.com',
    password: 'test123',
  },
  validLogin: {
    email: 'neddytest1@gmail.com',
    password: '12345678',
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
  validDuty: {
    content: 'lets test this duty',
    complete: 'false',
    todoId: 1,
  },
  invalidDuty: {
    content: '',
  },
  validUpdate: {
    content: ' update test',
    complete: 'false',
  },
};
export default mockData;
