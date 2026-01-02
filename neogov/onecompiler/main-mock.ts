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

// Mock data for demonstration
const MOCK_USERS: User[] = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Bob', lastName: 'Johnson' },
    { id: 4, firstName: 'Alice', lastName: 'Williams' },
    { id: 5, firstName: 'Charlie', lastName: 'Brown' },
    { id: 6, firstName: 'Diana', lastName: 'Davis' },
    { id: 7, firstName: 'Edward', lastName: 'Miller' },
    { id: 8, firstName: 'Fiona', lastName: 'Wilson' },
    { id: 9, firstName: 'George', lastName: 'Moore' },
    { id: 10, firstName: 'Hannah', lastName: 'Taylor' },
    { id: 11, firstName: 'Ivan', lastName: 'Anderson' },
    { id: 12, firstName: 'Julia', lastName: 'Thomas' },
    { id: 13, firstName: 'Kevin', lastName: 'Jackson' },
    { id: 14, firstName: 'Laura', lastName: 'White' },
    { id: 15, firstName: 'Mike', lastName: 'Harris' },
    { id: 16, firstName: 'Nina', lastName: 'Martin' },
    { id: 17, firstName: 'Oscar', lastName: 'Garcia' },
    { id: 18, firstName: 'Paula', lastName: 'Martinez' },
    { id: 19, firstName: 'Quinn', lastName: 'Robinson' },
    { id: 20, firstName: 'Rachel', lastName: 'Clark' },
    { id: 21, firstName: 'Steve', lastName: 'Lewis' },
    { id: 22, firstName: 'Tina', lastName: 'Lee' },
    { id: 23, firstName: 'Uma', lastName: 'Walker' },
    { id: 24, firstName: 'Victor', lastName: 'Hall' },
    { id: 25, firstName: 'Wendy', lastName: 'Allen' },
];

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

    <p>Page {{ currentPage + 1 }} of {{ totalPages }}</p>
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
      margin-bottom: 1rem;
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
    private readonly PAGE_SIZE = 5;
    private readonly allUsers = MOCK_USERS;

    users: User[] = [];
    currentPage = 0;
    totalCount = MOCK_USERS.length;
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

    private fetchPage(page: number): void {
        if (this.isLoading || page < 0) {
            return;
        }

        this.isLoading = true;

        // Simulate API delay
        setTimeout(() => {
            const start = page * this.PAGE_SIZE;
            const end = start + this.PAGE_SIZE;
            this.users = this.allUsers.slice(start, end);
            this.currentPage = page;
            this.isLoading = false;
        }, 300);
    }
}

bootstrapApplication(AppComponent).catch(err => console.error(err));
