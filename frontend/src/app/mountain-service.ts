import {Injectable, OnInit, signal} from '@angular/core';
import {Mountain} from './models/mountain.model';
import axios from 'axios';
import { environment } from '../environments/environment';
import {CreateMountain} from './models/createMountain.model';
import {MountainResponse} from './models/mountainResponse.model';
type MountainQueryResults = {
  current_page: number;
  last_page: number;
}

@Injectable({
  providedIn: 'root',
})
export class MountainService implements OnInit{
  mountains = signal<Mountain[]>([]);

  async ngOnInit() {
    await this.queryMountains();
  }

  private async getAllMountains(filters: MountainFilters = {}): Promise<MountainResponse> {
    try {
      const response = await axios.get<MountainResponse>(environment.apiUrl + 'mountains', {
        params: filters,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      this.mountains.set(response.data.data);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching mountains:' + error);
    }
  }

  async queryMountains(filters: MountainFilters = {}): Promise<MountainQueryResults>
  {
    const queryReponse = await this.getAllMountains(filters)

    return {
      current_page: queryReponse.current_page,
      last_page: queryReponse.last_page,
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
        image_url: m.image_url,
        latitude: m.latitude,
        longitude: m.longitude,
      };
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return null;
    }
  }

  async createMountain(mountain: CreateMountain): Promise<Mountain | null>  {
    try {
      const response = await axios.post<Mountain>(environment.apiUrl + 'mountains/create',
        {
          name: mountain.name,
          height: mountain.height,
          location: mountain.location,
          latitude: mountain.latitude,
          longitude: mountain.longitude,
          image_url: mountain.image_url,
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
        image_url: response.data.image_url,
        latitude: response.data.latitude,
        longitude: response.data.longitude
      };
    }
    catch (error: any) {
      if (error.response?.status === 422 && error.response?.data?.errors) {
        throw error.response.data.errors;
      }
      throw new Error('Failed to create mountain');
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
          latitude: mountain.latitude,
          longitude: mountain.longitude,
          image_url: mountain.image_url
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
        image_url: response.data.image_url,
        latitude: response.data.latitude,
        longitude: response.data.longitude,
      };
    }
    catch (error) {
      console.error('Error fetching mountains:', error);
      return null;
    }
  }
}
