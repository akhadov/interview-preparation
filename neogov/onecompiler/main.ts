import 'zone.js';
import '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

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
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule],
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
  `,
    styles: [`
    .table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1rem;
    }
    .table th, .table td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    .table th {
      background-color: #4CAF50;
      color: white;
    }
    .table tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    .pagination {
      display: flex;
      gap: 8px;
    }
    .pagination button {
      padding: 8px 16px;
      cursor: pointer;
      border: 1px solid #ddd;
      background-color: #fff;
    }
    .pagination button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `]
})
class AppComponent implements OnInit {
    private readonly API_URL = 'https://example.com/api/users';
    private readonly PAGE_SIZE = 10;

    users: User[] = [];
    currentPage = 0;
    totalCount = 0;
    isLoading = false;

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

    private async fetchPage(page: number): Promise<void> {
        if (this.isLoading || page < 0) {
            return;
        }

        this.isLoading = true;

        try {
            const response = await fetch(`${this.API_URL}?page=${page}`);
            const data: ApiResponse = await response.json();
            this.users = data.results;
            this.totalCount = data.count;
            this.currentPage = page;
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            this.isLoading = false;
        }
    }
}

bootstrapApplication(AppComponent).catch(err => console.error(err));
