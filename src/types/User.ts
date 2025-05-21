
export interface Location {
  street: string;
  city: string;
  state: string;
  country: string;
  timezone: string;
}
export interface User {
  id:string;
  title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr';
  firstName: string;
  lastName: string;
  picture: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth: string; // puede ser Date si haces casting, pero usualmente se guarda como string
  phone: string;
  registerDate:string;
  location?: Location;
}

