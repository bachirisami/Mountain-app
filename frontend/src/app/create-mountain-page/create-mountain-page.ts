import {Component, signal} from '@angular/core';
import {MountainService} from '../mountain-service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
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
  fieldErrors = signal<Record<string, string[]>>({});

  constructor(private mountainService: MountainService, private router: Router) {}

  async createMountain() {
    this.message.set('');
    this.fieldErrors.set({});

    const newMountain = {
      name: this.name(),
      height: this.height()!,
      location: this.location(),
      latitude: this.latitude()!,
      longitude: this.longitude()!,
      image_url: this.imageUrl(),
    };

    // Frontend validation
    const errors: string[] = [];

    if (!newMountain.name || newMountain.name.trim() === '') {
      errors.push('name');
    }
    if (!newMountain.height || newMountain.height < 1) {
      errors.push('height');
    }
    if (!newMountain.location || newMountain.location.trim() === '') {
      errors.push('location');
    }
    if (newMountain.latitude === null || newMountain.latitude === undefined) {
      errors.push('latitude');
    }
    if (newMountain.longitude === null || newMountain.longitude === undefined) {
      errors.push('longitude');
    }
    if (!newMountain.image_url || newMountain.image_url.trim() === '') {
      errors.push('image url');
    }

    if (errors.length > 0) {
      if (errors.length === 6) {
        this.message.set('All fields need to be filled in');
      } else if (errors.length === 1) {
        this.message.set(`The ${errors[0]} field is required`);
      } else {
        this.message.set(`The following fields are required: ${errors.join(', ')}`);
      }
      return;
    }

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
      this.router.navigate(['/mountains']);
    } catch (error: any) {
      if (error?.status === 422 && error?.error?.errors) {
        const backendErrors = error.error.errors;
        const errorFields = Object.keys(backendErrors).map(field => field.replace('_', ' '));

        if (errorFields.length === 6) {
          this.message.set('All fields need to be filled in');
        } else if (errorFields.length === 1) {
          this.message.set(`The ${errorFields[0]} field is required`);
        } else {
          this.message.set(`The following fields are required: ${errorFields.join(', ')}`);
        }
      } else {
        this.message.set(error?.error?.message || 'An error occurred');
      }
    }
  }
}
