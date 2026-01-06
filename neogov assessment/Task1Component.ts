import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

interface ApiResponse {
  count: number;
  results: User[];
}

@Component({
  selector: 'app-task1',
  template: `
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let user of users">
          <td>{{ user.id }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button
        class="first-page-btn"
        [disabled]="isFirstPage || isLoading"
        (click)="navigateToFirst()">
        first
      </button>
      <button
        class="previous-page-btn"
        [disabled]="isFirstPage || isLoading"
        (click)="navigateToPrevious()">
        previous
      </button>
      <button
        class="next-page-btn"
        [disabled]="isLastPage || isLoading"
        (click)="navigateToNext()">
        next
      </button>
      <button
        class="last-page-btn"
        [disabled]="isLastPage || isLoading"
        (click)="navigateToLast()">
        last
      </button>
    </div>
  `
})
export default class Task1Component implements OnInit {
  private readonly API_URL = 'https://example.com/api/users';
  private readonly PAGE_SIZE = 10;

  users: User[] = [];
  currentPage = 0;
  totalCount = 0;
  isLoading = false;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchPage(0);
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.PAGE_SIZE);
  }

  get isFirstPage(): boolean {
    return this.currentPage === 0;
  }

  get isLastPage(): boolean {
    return this.currentPage >= this.totalPages - 1;
  }

  navigateToFirst(): void {
    this.fetchPage(0);
  }

  navigateToPrevious(): void {
    this.fetchPage(this.currentPage - 1);
  }

  navigateToNext(): void {
    this.fetchPage(this.currentPage + 1);
  }

  navigateToLast(): void {
    this.fetchPage(this.totalPages - 1);
  }

  private fetchPage(page: number): void {
    if (this.isLoading || page < 0) {
      return;
    }

    this.isLoading = true;

    this.http.get<ApiResponse>(`${this.API_URL}?page=${page}`).subscribe({
      next: (response) => {
        this.users = response.results;
        this.totalCount = response.count;
        this.currentPage = page;
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      }
    });
  }
}
