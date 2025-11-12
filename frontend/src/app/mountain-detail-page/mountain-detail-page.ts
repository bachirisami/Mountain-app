import {Component, computed, inject, OnInit, signal} from '@angular/core';
import { Mountain } from '../models/mountain.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MountainService } from '../mountain-service';
import { AuthService } from '../auth-service';
import { Header } from '../header/header';
import { DeleteModal } from '../delete-modal/delete-modal';
import { UpdateModal } from '../update-modal/update-modal';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-mountain-detail-page',
  standalone: true,
  imports: [Header, DeleteModal, UpdateModal, NgOptimizedImage],
  templateUrl: './mountain-detail-page.html',
  styleUrls: ['./mountain-detail-page.css'],
})
export class MountainDetailPage implements OnInit {
  mountain = signal<Mountain | null>(null);
  errorMessage = signal<string | null>(null);
  showUpdateModal = signal(false);
  showDeleteModal = signal(false);
  private route = inject(ActivatedRoute);
  private mountainService = inject(MountainService);
  protected authService = inject(AuthService);
  private router = inject(Router);

  mapUrl = computed(() => {
    const m = this.mountain();
    if (!m?.longitude || !m?.latitude) {
      return 'https://via.placeholder.com/650x400?text=No+Map';
    }
    return `https://static-maps.yandex.ru/1.x/?ll=${m.longitude},${m.latitude}&size=650,400&z=8&l=map&pt=${m.longitude},${m.latitude},pm2rdm`;
  });

  private id!: number;

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.loadMountain(this.id);
    }
  }

  async loadMountain(id: number) {
    const data = await this.mountainService.getMountainById(id);
    if (!data) {
      this.errorMessage.set('Mountain not found.');
      setTimeout(() => {
        this.router.navigate(['/']);
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

  async handleUpdate() {
    await this.loadMountain(this.id);
    this.closeUpdateModal();
  }
}
