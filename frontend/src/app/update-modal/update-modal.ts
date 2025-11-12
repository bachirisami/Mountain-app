import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  @Output() saveUpdate = new EventEmitter<{
    name: string;
    height: number;
    location: string;
    imageUrl: string;
    latitude: number;
    longitude: number;
  }>();
  @Output() closeModal = new EventEmitter<void>();

  nameField = signal('');
  heightField = signal(1);
  locationField = signal('');
  imageUrlField = signal('');
  latitudeField = signal(0);
  longitudeField = signal(0);
  message = signal('');

  onSubmit() {
    this.message.set('');

    // Frontend validation
    const errors: string[] = [];

    if (this.nameField() && this.nameField().trim() === '') {
      errors.push('name');
    }
    if (this.heightField() !== null && this.heightField() < 1) {
      errors.push('height');
    }
    if (this.locationField() && this.locationField().trim() === '') {
      errors.push('location');
    }
    if (this.imageUrlField() && this.imageUrlField().trim() === '') {
      errors.push('image url');
    }

    if (errors.length > 0) {
      if (errors.length === 1) {
        this.message.set(`The ${errors[0]} field must be valid`);
      } else {
        this.message.set(`The following fields must be valid: ${errors.join(', ')}`);
      }
      return;
    }

    this.saveUpdate.emit({
      name: this.nameField(),
      height: this.heightField(),
      location: this.locationField(),
      imageUrl: this.imageUrlField(),
      latitude: this.latitudeField(),
      longitude: this.longitudeField(),
    });
  }

  onClose() {
    this.closeModal.emit();
  }
}
