import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import { Mountain } from '../models/mountain.model';
import AuthService from '../auth-service';
import { MountainService } from '../mountain-service';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {NgOptimizedImage} from '@angular/common';
import {Header} from '../header/header';
import {debounceTime, of} from 'rxjs';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    Header,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  searchName = signal('');
  searchFor = toSignal(toObservable(this.searchName).pipe(debounceTime(300)), {
    initialValue: '',
  });
  currentPage = signal(1);
  totalPages = signal(1);

  private readonly mountainService = inject(MountainService);

  protected readonly mountains = this.mountainService.mountains;

  private readonly onPageStateChange = effect(() => {
    const name = this.searchFor();
    const page = this.currentPage();
    this.loadMountains();
  });

  async loadMountains() {
    const filters: MountainFilters = {
      name: this.searchFor(),
      page: this.currentPage(),
    };

    const res = await this.mountainService.queryMountains(filters);
    this.totalPages.set(res.last_page || 1);
  }

  async nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.set(this.currentPage() + 1);
      await this.loadMountains();
    }
  }

  async prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      await this.loadMountains();
    }
  }
}
