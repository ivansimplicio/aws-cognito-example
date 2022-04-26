import validator from 'validator';

export const validateCredentials = (email: string, password: string) => {
  const isValidEmail = validator.isEmail(email);
  if(!isValidEmail){
    throw new Error('Invalid email');
  }
  const isValidPassword = password.length >= 8;
  if(!isValidPassword){
    throw new Error('The password entered is too short, it must be at least 8 characters long.');
  }
}
