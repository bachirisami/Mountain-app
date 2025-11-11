import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  standalone: true,
  templateUrl: './delete-modal.html',
})
export class DeleteModal {
  @Input() mountainName: string = '';
  @Output() confirmDelete = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  onConfirm() {
    this.confirmDelete.emit();
  }

  onClose() {
    this.closeModal.emit();
  }
}
