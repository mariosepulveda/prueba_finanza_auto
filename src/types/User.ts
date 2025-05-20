export interface User {
  id: number | string;
  title: 'mr' | 'ms' | 'mrs' | 'miss' | 'dr';
  firstName: string;
  lastName: string;
  image: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  birthDate: string; // puede ser Date si haces casting, pero usualmente se guarda como string
  phone: string;
}