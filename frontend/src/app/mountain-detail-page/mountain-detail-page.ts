import { Component, OnInit, signal } from '@angular/core';
import { Mountain } from '../models/mountain.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MountainService } from '../mountain-service';
import { AuthService } from '../auth-service';
import { Header } from '../header/header';
import { DeleteModal } from '../delete-modal/delete-modal';
import { UpdateModal } from '../update-modal/update-modal';

@Component({
  selector: 'app-mountain-detail-page',
  standalone: true,
  imports: [Header, DeleteModal, UpdateModal],
  templateUrl: './mountain-detail-page.html',
  styleUrls: ['./mountain-detail-page.css'],
})
export class MountainDetailPage implements OnInit {
  mountain = signal<Mountain | null>(null);
  isLoggedIn = signal(false);
  errorMessage = signal<string | null>(null);
  showUpdateModal = signal(false);
  showDeleteModal = signal(false);

  private id!: number;

  constructor(
    private route: ActivatedRoute,
    private mountainService: MountainService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.isLoggedIn.set(this.authService.isLoggedIn());

    if (this.id) {
      this.loadMountain(this.id);
    }
  }

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

  openDeleteModal() {
    this.showDeleteModal.set(true);
  }

  closeDeleteModal() {
    this.showDeleteModal.set(false);
  }

  async confirmDelete() {
    if (!this.mountain()) return;

    await this.mountainService.deleteMountain(this.mountain()!.id);
    this.closeDeleteModal();
    await this.router.navigate(['/']);
  }

  openUpdateModal() {
    this.showUpdateModal.set(true);
  }

  closeUpdateModal() {
    this.showUpdateModal.set(false);
  }

  async handleUpdate(data: any) {
    if (!this.mountain()) return;

    const updated: Mountain = {
      id: this.mountain()!.id,
      name: data.name,
      height: data.height,
      location: data.location,
      image_url: data.imageUrl,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    await this.mountainService.updateMountain(updated, updated.id);
    await this.loadMountain(updated.id);
    this.closeUpdateModal();
  }
}
