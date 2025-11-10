import {Component, signal} from '@angular/core';
import {Mountain} from '../models/mountain.model';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  search = signal('');
  mountains = signal<Mountain[]>([]);
  filterMountains = signal<Mountain[]>([]);


}
