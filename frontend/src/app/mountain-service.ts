import {Injectable} from '@angular/core';
import {Mountain} from './models/mountain.model';
import axios from 'axios';
import {environment} from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MountainService {
  async getAllMountains(): Promise<Mountain[]> {
    try {
      const response = await axios.get<Mountain[]>(environment.apiUrl + 'mountains', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      return response.data.map((m) => ({
        id: m.id,
        name: m.name,
        height: m.height,
        location: m.location,
      }));
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return [];
    }
  }

  async getMountainById(id: number): Promise<Mountain | null> {
    try {
      const response = await axios.get<Mountain>(environment.apiUrl + 'mountains/' + id.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const m = response.data;

      return {
        id: m.id,
        name: m.name,
        height: m.height,
        location: m.location,
      };
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return null;
    }
  }

  async createMountain(mountain: Mountain): Promise<Mountain | null>  {
    try {
      const response = await axios.post<Mountain>(environment.apiUrl + 'mountains',
        {
          name: mountain.name,
          height: mountain.height,
          location: mountain.location,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        });

      return {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        location: response.data.location,
      };
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return null;
    }
  }

  async deleteMountain(id: number): Promise<boolean> {
    try {
      await axios.delete(environment.apiUrl + 'mountains/' + id.toString(), {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      return true;
    } catch (error: any) {
      console.error('Error deleting mountain:', error.response?.data || error.message);
      return false;
    }
  }

  async updateMountain(mountain: Mountain, id: number): Promise<Mountain | null>  {
    try {
      const response = await axios.put<Mountain>(environment.apiUrl + 'mountains/' + id.toString(),
        {
          name: mountain.name,
          height: mountain.height,
          location: mountain.location,
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          }
        });

      return {
        id: response.data.id,
        name: response.data.name,
        height: response.data.height,
        location: response.data.location,
      };
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return null;
    }
  }
}
