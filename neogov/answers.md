# Interview Answers

## Task 1: Angular Component with Pagination

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users-table',
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
      <button class="first-page-btn" (click)="goToPage(0)" [disabled]="loading || currentPage === 0">first</button>
      <button class="previous-page-btn" (click)="goToPage(currentPage - 1)" [disabled]="loading || currentPage === 0">previous</button>
      <button class="next-page-btn" (click)="goToPage(currentPage + 1)" [disabled]="loading || currentPage >= totalPages - 1">next</button>
      <button class="last-page-btn" (click)="goToPage(totalPages - 1)" [disabled]="loading || currentPage >= totalPages - 1">last</button>
    </div>
  `
})
export default class UsersTableComponent implements OnInit {
  users: any[] = [];
  currentPage = 0;
  totalPages = 0;
  loading = false;
  private readonly API_URL = 'https://example.com/api/users';
  private readonly PAGE_SIZE = 10;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.goToPage(0);
  }

  goToPage(page: number) {
    this.loading = true;
    this.http.get<any>(`${this.API_URL}?page=${page}`).subscribe(response => {
      this.users = response.results;
      this.currentPage = page;
      this.totalPages = Math.ceil(response.count / this.PAGE_SIZE);
      this.loading = false;
    });
  }
}
```

## Task 2: Entity Framework Core - Blog/Post Implementation

```csharp
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.EntityFrameworkCore;

public class BlogEntity
{
    public int BlogId { get; set; }
    
    [Required]
    [StringLength(50, MinimumLength = 10)]
    public string Name { get; set; }
    
    [Required]
    public bool IsActive { get; set; }
    public List<PostEntity> Articles { get; set; }
}

public class PostEntity
{
    public int PostId { get; set; }
    
    [Required]
    public int ParentId { get; set; }
    
    [Required]
    [StringLength(50, MinimumLength = 10)]
    public string Name { get; set; }
    
    [Required]
    [MaxLength(1000)]
    public string Content { get; set; }
    
    [Required]
    public DateTime Created { get; set; }
    
    public DateTime? Updated { get; set; }
}

public class BlogsContext : DbContext
{
    public DbSet<BlogEntity> BlogsEntities { get; set; }
    public DbSet<PostEntity> PostsEntities { get; set; }

    public BlogsContext(DbContextOptions<BlogsContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // BlogEntity configuration
        modelBuilder.Entity<BlogEntity>(entity =>
        {
            entity.ToTable("blogs");
            entity.HasKey(e => e.BlogId);
            entity.Property(e => e.BlogId).HasColumnName("blog_id");
            entity.Property(e => e.IsActive)
                .HasConversion(
                    v => v ? "Blog is active" : "Blog is not active",
                    v => v == "Blog is active"
                );
            entity.HasMany(e => e.Articles)
                  .WithOne()
                  .HasForeignKey(e => e.ParentId);
        });

        // PostEntity configuration
        modelBuilder.Entity<PostEntity>(entity =>
        {
            entity.ToTable("articles");
            entity.HasKey(e => e.PostId);
            entity.Property(e => e.PostId).HasColumnName("post_id");
            entity.Property(e => e.ParentId).HasColumnName("blog_id");
        });
    }
}
```

## SQL Questions - Answers & Examples

### Question 1: Return XML RAW
**Answer: A**
`FOR XML RAW` creates a `<row>` element for each row in the result set, with each column as an attribute.
```sql
SELECT * FROM dbo.Table1 FOR XML RAW;
-- Result: <row Id="1" Name="xxx"/><row Id="2" Name="aaa"/>
```

### Question 2: Left Join vs Outer Apply
**Answer: A, C**
`LEFT JOIN` and `OUTER APPLY` both return all rows from the primary table even if no matches exist in the joined table.
```sql
-- LEFT JOIN example
SELECT COUNT(1) FROM dbo.Orders o LEFT JOIN dbo.OrderDetails od ON o.OrderID = od.OrderID;

-- OUTER APPLY example (equivalent)
SELECT COUNT(1) FROM dbo.Orders o OUTER APPLY (SELECT * FROM dbo.OrderDetails od WHERE o.OrderId = od.OrderId) T;
```

### Question 3: SELECT INTO Properties
**Answer: A, C**
`SELECT INTO` creates a new table with the same schema and data, but does **not** copy indexes, primary keys, or constraints (except for IDENTITY).
```sql
SELECT * INTO dbo.Employees2 FROM dbo.Employees;
-- Result: Same columns and data types, but no Primary Key or non-clustered indexes.
```

### Question 4: View WITH CHECK OPTION
**Answer: C**
`WITH CHECK OPTION` prevents users from updating or inserting rows through the view that would not be visible in the view.
```sql
CREATE VIEW dbo.EmployeesFromLondon AS
SELECT * FROM dbo.Employees WHERE City = 'London'
WITH CHECK OPTION;
-- Trying to update City to 'Warsaw' will fail because the row would "disappear" from the view.
```

### Question 5: Update with Join/Exists
**Answer: C, D**
Both syntaxes are valid in SQL Server for updating based on related tables.
```sql
-- Using JOIN
UPDATE od SET Discount = 0
FROM dbo.OrderDetails od JOIN dbo.Orders o ON o.OrderId = od.OrderId
WHERE o.EmployeeId = 10;

-- Using EXISTS
UPDATE od SET Discount = 0
FROM dbo.OrderDetails od
WHERE EXISTS (SELECT 1 FROM dbo.Orders o WHERE o.OrderId = od.OrderId AND o.EmployeeId = 10);
```

### Question 6: Merge OUTPUT
**Answer: D**
The `OUTPUT` clause in a `MERGE` statement can capture the `$action` and values from both `Inserted` and `Deleted` tables.
```sql
MERGE dbo.Employees2 AS target ...
WHEN MATCHED THEN UPDATE ...
WHEN NOT MATCHED THEN INSERT ...
OUTPUT $action, Inserted.EmployeeID, Inserted.LastName, Inserted.FirstName, Deleted.LastName, Deleted.FirstName INTO #Temp;
```

### Question 7: Slow Query in Production
**Answer: A**
Outdated statistics cause the query optimizer to choose inefficient execution plans. Updating them helps the optimizer understand current data distribution.
```sql
UPDATE STATISTICS dbo.BigTable;
```

### Question 8: IDENTITY_INSERT Gap
**Answer: C**
When you manually insert a value (e.g., 1000) into an identity column, SQL Server updates the internal seed. The next auto-generated value will be `MaxVal + 1`.
```sql
-- If current max is 1000, next Insert automatically gets 1001.
INSERT INTO dbo.Employees (FirstName, LastName) VALUES('Ben','Affleck');
-- Ben Affleck's ID will be 1001.
```

### Question 9: Deadlocks
**Answer: A**
Deadlocks occur when two processes wait for each other's locks. Accessing resources in the same order (e.g., always Table1 then Table2) is the primary way to prevent circular waits.
```sql
-- Script 1 and Script 2 should both update Table1 first, then Table2.
```

### Question 10: Running Total
**Answer: B, C**
A running total is achieved using `SUM(...) OVER` with an `ORDER BY` clause. By default, `ORDER BY` implies `RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`.
```sql
SELECT CustomerId, Value,
SUM(Value) OVER(PARTITION BY CustomerId ORDER BY OrderDate) AS RunningTotal
FROM dbo.Orders;
```
