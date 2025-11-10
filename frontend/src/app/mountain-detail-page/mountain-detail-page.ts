import { Component, OnInit, signal, effect } from '@angular/core';
import { Mountain } from '../models/mountain.model';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MountainService } from '../mountain-service';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mountain-detail-page',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './mountain-detail-page.html',
  styleUrls: ['./mountain-detail-page.css'],
})
export class MountainDetailPage implements OnInit {
  // Signals
  mountain = signal<Mountain | null>(null);
  isLoggedIn = signal(false);
  errorMessage = signal<string | null>(null);

  showUpdateModal = signal(false);

  nameField = signal('');
  heightField = signal(1);
  locationField = signal('');

  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private mountainService: MountainService,
    private authService: AuthService,
    private router: Router
  ) {
    // Effect to populate the update fields automatically when mountain is loaded
    effect(() => {
      const m = this.mountain();
      if (m) {
        this.nameField.set(m.name);
        this.heightField.set(m.height);
        this.locationField.set(m.location);
      }
    });
  }

  ngOnInit(): void {
    // Get mountain ID from route
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoggedIn.set(this.authService.isLoggedIn());

    if (this.id) {
      this.loadMountain(this.id);
    }
  }

  // Load a mountain by ID
  async loadMountain(id: number) {
    const data = await this.mountainService.getMountainById(id);
    if (!data) {
      this.errorMessage.set('Mountain not found.');
      setTimeout(() => {
        this.router.navigate(['/dashboard']);
      }, 2000);
      return;
    }
    this.mountain.set(data);
  }

  // Delete a mountain
  async deleteMountain(id: number) {
    const confirmed = confirm(
      `Are you sure you want to delete "${this.mountain()!.name}"?`
    );
    if (!confirmed) return;

    await this.mountainService.deleteMountain(id);
    await this.router.navigate(['/dashboard']);
  }

  // Toggle update modal
  openUpdateModal() {
    this.showUpdateModal.set(true);
  }

  closeUpdateModal() {
    this.showUpdateModal.set(false);
  }

  // Update mountain
  async updateMountain() {
    if (!this.mountain()) return;

    const updated: Mountain = {
      id: this.mountain()!.id,
      name: this.nameField(),
      height: this.heightField(),
      location: this.locationField(),
    };

    await this.mountainService.updateMountain(updated, updated.id);
    await this.loadMountain(updated.id);
    this.closeUpdateModal();
    alert('Mountain updated successfully!');
  }
}
