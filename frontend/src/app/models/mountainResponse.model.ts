import {Mountain} from './mountain.model';

export interface MountainResponse {
  current_page: number;
  data: Mountain[];
  last_page: number;
}
