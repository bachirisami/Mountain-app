import {Component, signal} from '@angular/core';
import {MountainService} from '../mountain-service';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {Header} from '../header/header';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-create-mountain-page',
  imports: [
    FormsModule,
    RouterLink,
    Header,
    NgClass
  ],
  templateUrl: './create-mountain-page.html',
  styleUrl: './create-mountain-page.css',
})
export class CreateMountainPage {
  name = signal('');
  height = signal<number | null>(null);
  location = signal('');
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);
  imageUrl = signal('');
  message = signal('');

  constructor(private mountainService: MountainService) {}

  async createMountain() {
    const newMountain = {
      name: this.name(),
      height: this.height()!,
      location: this.location(),
      latitude: this.latitude()!,
      longitude: this.longitude()!,
      image_url: this.imageUrl(),
    };

    try {
      const result = await this.mountainService.createMountain(newMountain);

      if (result) {
        this.message.set('Mountain created successfully!');
        this.name.set('');
        this.height.set(null);
        this.location.set('');
        this.latitude.set(null);
        this.longitude.set(null);
        this.imageUrl.set('');
      }
    } catch (errors: any) {
      if (typeof errors === 'object') {
        const errorMessages = Object.values(errors).flat().join(', ');
        this.message.set(errorMessages);
      } else {
        this.message.set('Failed to create mountain.');
      }
    }
  }
}
