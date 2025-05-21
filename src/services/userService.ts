import axios from "axios"
import { User } from '../types/User';
import { UserApiResponse } from '../types/userResponse';


const API_BASE_URL = 'https://dummyapi.io/data/v1';
const APP_ID = '6606af1b45b6da258bde34ab';


const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'app-id': APP_ID,
    'Content-Type': 'application/json',
  },
})


export const getUsers = async (page:number, limit:number): Promise<UserApiResponse> => {
    const response = await api.get<UserApiResponse>('/user', {
      params: { page, limit },
    });
    return response.data; // `data` viene en { data: [], total: ..., etc. }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    return null;
  }
};


export const updateUser = async (id: string | number, userData: Partial<User>): Promise<User | null> => {
  try {
    const response = await api.put<User>(`/user/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    return null;
  }
};


export const createUser = async (userData: {
  title: string;
  firstName: string;
  lastName: string;
  picture: string;
  gender: string;
  email: string;
  dateOfBirth: string;
  phone: string;
}): Promise<User | null> => {
  try {
    const response = await api.post<User>('/user/create', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    return null;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    return null;
  }
};