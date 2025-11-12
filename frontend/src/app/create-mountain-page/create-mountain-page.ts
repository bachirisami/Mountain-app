import {Component, inject, signal} from '@angular/core';
import {MountainService} from '../mountain-service';
import {FormsModule} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {Header} from '../header/header';
import {NgClass} from '@angular/common';
import {CreateMountain} from '../models/createMountain.model';

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
  private mountainService = inject(MountainService);
  private router = inject(Router);

  async createMountain() {
    this.message.set('');
    this.fieldErrors.set({});

    const newMountain: CreateMountain = {
      name: this.name(),
      height: this.height()!,
      location: this.location(),
      latitude: this.latitude()!,
      longitude: this.longitude()!,
      image_url: this.imageUrl(),
    };

    const validations = [
      { field: 'name', valid: newMountain.name?.trim() },
      { field: 'height', valid: newMountain.height && newMountain.height > 0 },
      { field: 'location', valid: newMountain.location?.trim() },
      { field: 'latitude', valid: newMountain.latitude !== null && newMountain.latitude !== undefined },
      { field: 'longitude', valid: newMountain.longitude !== null && newMountain.longitude !== undefined },
      { field: 'image url', valid: newMountain.image_url?.trim() },
    ];

    const errors = validations.filter(v => !v.valid).map(v => v.field);

    if (errors.length > 0) {
      const msg = errors.length === 6
        ? 'All fields need to be filled in'
        : errors.length === 1
          ? `The ${errors[0]} field is required`
          : `The following fields are required: ${errors.join(', ')}`;
      this.message.set(msg);
      return;
    }

    try {
      await this.mountainService.createMountain(newMountain);
      this.message.set('Mountain created successfully!');
      this.resetForm();
      await this.router.navigate(['/mountains']);
    } catch (error: any) {
      this.handleError(error);
    }
  }

  private resetForm() {
    this.name.set('');
    this.height.set(null);
    this.location.set('');
    this.latitude.set(null);
    this.longitude.set(null);
    this.imageUrl.set('');
  }

  private handleError(error: any) {
    if (error?.status === 422 && error?.error?.errors) {
      const errorFields = Object.keys(error.error.errors).map(field => field.replace('_', ' '));
      const msg = errorFields.length === 6
        ? 'All fields need to be filled in'
        : errorFields.length === 1
          ? `The ${errorFields[0]} field is required`
          : `The following fields are required: ${errorFields.join(', ')}`;
      this.message.set(msg);
    } else {
      this.message.set(error?.error?.message || 'An error occurred');
    }
  }
}
