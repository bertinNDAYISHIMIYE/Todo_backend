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
    name: 'shizzy',
    email: 'shizzy@gmail.com',
    password: 'shizzy',
  },
  incorrectPasswordLogin: {
    name: 'shizzy',
    email: 'shizzy@gmail.com',
    password: 'shizziii',
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
