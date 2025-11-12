import { Component, EventEmitter, Input, Output, signal, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MountainService } from '../mountain-service';
import { Mountain } from '../models/mountain.model';

@Component({
  selector: 'app-update-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update-modal.html',
})
export class UpdateModal {
  @Input() set name(value: string) { this.nameField.set(value); }
  @Input() set height(value: number) { this.heightField.set(value); }
  @Input() set location(value: string) { this.locationField.set(value); }
  @Input() set imageUrl(value: string) { this.imageUrlField.set(value); }
  @Input() set latitude(value: number) { this.latitudeField.set(value); }
  @Input() set longitude(value: number) { this.longitudeField.set(value); }
  @Input() mountainId!: number;

  @Output() updateSuccess = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  private mountainService = inject(MountainService);

  nameField = signal('');
  heightField = signal(1);
  locationField = signal('');
  imageUrlField = signal('');
  latitudeField = signal(0);
  longitudeField = signal(0);
  message = signal('');

  async onSubmit() {
    this.message.set('');

    const errors: string[] = [];

    if (!this.nameField() || this.nameField().trim() === '') {
      errors.push('name');
    }
    if (this.heightField() === null || this.heightField() < 1 || isNaN(this.heightField())) {
      errors.push('height');
    }
    if (!this.locationField() || this.locationField().trim() === '') {
      errors.push('location');
    }
    if (!this.imageUrlField() || this.imageUrlField().trim() === '') {
      errors.push('image url');
    }
    if (this.latitudeField() === null || isNaN(this.latitudeField()) || this.latitudeField() < -90 || this.latitudeField() > 90) {
      errors.push('latitude (must be between -90 and 90)');
    }
    if (this.longitudeField() === null || isNaN(this.longitudeField()) || this.longitudeField() < -180 || this.longitudeField() > 180) {
      errors.push('longitude (must be between -180 and 180)');
    }

    if (errors.length > 0) {
      if (errors.length === 1) {
        this.message.set(`The ${errors[0]} field must be valid and filled in`);
      } else {
        this.message.set(`The following fields must be valid and filled in: ${errors.join(', ')}`);
      }
      return;
    }

    const updated: Mountain = {
      id: this.mountainId,
      name: this.nameField(),
      height: this.heightField(),
      location: this.locationField(),
      image_url: this.imageUrlField(),
      latitude: this.latitudeField(),
      longitude: this.longitudeField(),
    };

    await this.mountainService.updateMountain(updated, this.mountainId);
    this.updateSuccess.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
