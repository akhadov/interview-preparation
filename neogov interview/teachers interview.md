# NeoGov Interview Questions & Answers

## Section 1: C# & .NET Fundamentals

---

### 1. Polymorphism: Implement a Polymorphic Class

**Q: What is polymorphism and how do you implement it in C#?**

**A:** Polymorphism allows objects of different types to be treated as objects of a common base type. In C#, it's implemented through:

1. **Method Overriding** (Runtime polymorphism) - Using `virtual` and `override` keywords
2. **Method Overloading** (Compile-time polymorphism) - Same method name, different parameters

```csharp
public class Animal
{
    public virtual void Speak() => Console.WriteLine("Animal speaks");
}

public class Dog : Animal
{
    public override void Speak() => Console.WriteLine("Dog barks");
}

// Usage
Animal animal = new Dog();
animal.Speak(); // Output: "Dog barks"
```

---

### 2. Base/Derived Class Reference Issues

**Q: Does this code work? `Dog dog = new Animal();`**

**A:** **No, this does NOT compile.** You cannot assign a base class instance to a derived class reference. The compiler error: "Cannot implicitly convert type 'Animal' to 'Dog'."

**Valid assignments:**
```csharp
Animal animal = new Dog();    // ✅ Works - upcasting (implicit)
Dog dog = new Dog();          // ✅ Works - same type
Dog dog = (Dog)animal;        // ⚠️ Works only if animal IS actually a Dog (downcasting)
Dog dog = new Animal();       // ❌ Compile error
```

**Why?** A `Dog` reference expects all `Dog` members to exist, but `Animal` doesn't have them.

#### 🔥 Extra Tricky Questions:

**Q: What happens here?**
```csharp
Animal animal = new Dog();
Dog dog = (Dog)animal;
dog.Speak();
```
**A:** This works! Runtime downcasting succeeds because `animal` actually holds a `Dog` instance.

**Q: And this?**
```csharp
Animal animal = new Animal();
Dog dog = (Dog)animal;
```
**A:** Compiles but throws `InvalidCastException` at runtime.

**Q: How to safely downcast?**
```csharp
if (animal is Dog dog)
{
    dog.Speak();
}
// OR
Dog? dog = animal as Dog;
if (dog != null) { ... }
```

---

### 3. Task vs ValueTask

**Q: What's the difference between `Task` and `ValueTask`?**

| Aspect | Task | ValueTask |
|--------|------|-----------|
| **Allocation** | Always heap-allocated | Struct - stack-allocated when synchronous |
| **Await count** | Can be awaited multiple times | Can only be awaited **once** |
| **Use case** | General async operations | Hot paths, methods that often complete synchronously |
| **Performance** | Slight overhead from allocation | Zero allocation when result is cached/synchronous |

**When to use ValueTask:**
- Method often returns synchronously (cached results)
- High-frequency calls where allocation matters
- Never await multiple times or use `GetAwaiter().GetResult()` more than once

```csharp
public ValueTask<int> GetValueAsync()
{
    if (_cache.TryGetValue(key, out var value))
        return new ValueTask<int>(value); // No allocation!
    
    return new ValueTask<int>(FetchFromDbAsync());
}
```

#### 🔥 Extra Tricky Questions:

**Q: Can you store a ValueTask in a variable and await it twice?**
**A:** No! Results in undefined behavior. You must consume it immediately or convert to Task via `.AsTask()`.

**Q: What's `IValueTaskSource`?**
**A:** Interface for pooling ValueTask backing objects, enabling zero-allocation async for repeated operations.

---

### 4. Thread Fundamentals

**Q: Tell me about Thread in .NET.**

**A:** A `Thread` represents a single path of execution within a process.

```csharp
Thread thread = new Thread(() => Console.WriteLine("Running on new thread"));
thread.Start();
thread.Join(); // Wait for completion
```

**Key concepts:**
- **Foreground vs Background threads**: Foreground keeps app alive; Background terminates with main thread
- **Thread Pool**: Managed pool of reusable threads, accessed via `ThreadPool.QueueUserWorkItem()` or `Task.Run()`
- **Thread Safety**: Shared state requires synchronization

**Modern approach:** Prefer `Task` and `async/await` over raw threads - they use ThreadPool efficiently and provide better composability.

#### 🔥 Extra Tricky Questions:

**Q: What's the difference between `Thread.Sleep()` and `Task.Delay()`?**
**A:** `Thread.Sleep()` blocks the current thread. `Task.Delay()` releases the thread to do other work and is awaitable.

**Q: Can you set thread priority?**
**A:** Yes, via `thread.Priority = ThreadPriority.Highest;` but it's OS-dependent and rarely recommended.

---

### 5. lock, Monitor, Semaphore

**Q: Explain lock, Monitor, and Semaphore.**

**A:**

**`lock`** - Syntactic sugar for Monitor. Ensures only one thread enters the critical section:
```csharp
private readonly object _lock = new();
lock (_lock)
{
    // Critical section - only one thread at a time
}
```

**`Monitor`** - More control than lock, supports timeouts and pulse/wait:
```csharp
if (Monitor.TryEnter(_lock, TimeSpan.FromSeconds(5)))
{
    try { /* work */ }
    finally { Monitor.Exit(_lock); }
}
```

**`Semaphore` / `SemaphoreSlim`** - Limits concurrent access to N threads:
```csharp
SemaphoreSlim semaphore = new(3); // Allow 3 concurrent
await semaphore.WaitAsync();
try { /* work */ }
finally { semaphore.Release(); }
```

| Feature | lock/Monitor | Semaphore |
|---------|--------------|-----------|
| Max threads | 1 | N (configurable) |
| Cross-process | No | Yes (Semaphore, not SemaphoreSlim) |
| Async support | No | Yes (SemaphoreSlim) |

#### 🔥 Extra Tricky Questions:

**Q: What's a deadlock? How to prevent it?**
**A:** Two threads waiting for each other's locks. Prevent by: consistent lock ordering, timeouts, `Monitor.TryEnter()`.

**Q: What's `Mutex` vs `Semaphore`?**
**A:** Mutex is a binary semaphore (count=1) that tracks ownership - only the owning thread can release it.

**Q: What's `ReaderWriterLockSlim`?**
**A:** Allows multiple readers OR single writer, optimizing read-heavy scenarios.

---

### 6. EF Core Query Optimization

**Q: Optimize this EF Core query.**

**A:** Key optimizations:

1. **Use Projections** - Select only needed columns:
```csharp
var results = context.Products
    .Where(p => p.UnitsInStock > 0)
    .Select(p => new 
    {
        p.ProductID,
        p.ProductName,
        p.UnitsInStock
    })
    .ToListAsync(); // Don't forget Async!
```

2. **Use Async methods** - `ToListAsync()`, `FirstOrDefaultAsync()`

3. **Avoid N+1 queries** - Use `.Include()` for related entities when needed

4. **Use `AsNoTracking()`** for read-only queries:
```csharp
context.Products.AsNoTracking().Where(...).ToListAsync();
```

5. **Pagination** - `.Skip().Take()` instead of loading everything

#### 🔥 Extra Tricky Questions:

**Q: What's the difference between `IQueryable` and `IEnumerable` in EF?**
**A:** `IQueryable` builds expression trees executed on DB server. `IEnumerable` fetches all data to memory first, then filters in-memory.

**Q: What does `AsSplitQuery()` do?**
**A:** Splits a query with multiple includes into separate SQL queries, avoiding cartesian explosion.

---

### 7. ConcurrentDictionary Optimization

**Q: They had a Dictionary cache with threading issues. Solution?**

**A:** Replace `Dictionary<TKey, TValue>` with `ConcurrentDictionary<TKey, TValue>`:

```csharp
// Thread-safe operations
private readonly ConcurrentDictionary<string, object> _cache = new();

// Atomic get-or-add
var value = _cache.GetOrAdd(key, k => ExpensiveComputation(k));

// Atomic update
_cache.AddOrUpdate(key, addValue, (k, old) => newValue);
```

**Why ConcurrentDictionary?**
- Lock-free reads
- Fine-grained locking for writes
- Atomic compound operations (`GetOrAdd`, `AddOrUpdate`)

#### 🔥 Extra Tricky Questions:

**Q: Is `ConcurrentDictionary` always faster?**
**A:** No. For single-threaded scenarios, regular Dictionary with external locking can be faster due to lower overhead.

**Q: What about `IMemoryCache`?**
**A:** Better for caching with expiration policies, size limits, and cache eviction. Use for application caching.

---

## Section 2: SQL & Database

---

### 8. Design Customer and Orders Tables

**Q: Design customer and orders tables with indexes, PK, FK, and constraints.**

```sql
CREATE TABLE Customers (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(255) NOT NULL UNIQUE,
    FirstName NVARCHAR(100) NOT NULL,
    LastName NVARCHAR(100) NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETUTCDATE(),
    
    CONSTRAINT CK_Email CHECK (Email LIKE '%_@_%._%')
);

CREATE TABLE Orders (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    CustomerId INT NOT NULL,
    OrderDate DATETIME2 DEFAULT GETUTCDATE(),
    TotalAmount DECIMAL(18,2) NOT NULL CHECK (TotalAmount >= 0),
    Status NVARCHAR(50) DEFAULT 'Pending',
    
    CONSTRAINT FK_Orders_Customers 
        FOREIGN KEY (CustomerId) REFERENCES Customers(Id)
        ON DELETE CASCADE -- or NO ACTION based on business rules
);

-- Indexes
CREATE INDEX IX_Orders_CustomerId ON Orders(CustomerId);
CREATE INDEX IX_Orders_OrderDate ON Orders(OrderDate);
CREATE INDEX IX_Customers_Email ON Customers(Email); -- Already unique, auto-indexed
```

**Key Points:**
- **Primary Key**: Clustered, unique identifier
- **Foreign Key**: Referential integrity between tables
- **Indexes**: Speed up lookups and joins on frequently queried columns
- **Constraints**: CHECK, UNIQUE, NOT NULL enforce data integrity

---

### 9. JOIN Query

**Q: Write a SELECT to fetch customer email and order id for all users who have orders.**

```sql
SELECT o.Id AS OrderId, c.Email
FROM Orders AS o
INNER JOIN Customers AS c ON c.Id = o.CustomerId;
```

**Q: Change to RIGHT/LEFT JOIN and explain the difference.**

```sql
-- LEFT JOIN: All customers, even those without orders (NULLs for order columns)
SELECT c.Email, o.Id AS OrderId
FROM Customers AS c
LEFT JOIN Orders AS o ON c.Id = o.CustomerId;

-- RIGHT JOIN: All orders (same as INNER here since orders must have customer)
SELECT c.Email, o.Id AS OrderId  
FROM Customers AS c
RIGHT JOIN Orders AS o ON c.Id = o.CustomerId;
```

| Join Type | Result |
|-----------|--------|
| INNER | Only matching rows from both tables |
| LEFT | All rows from left table + matching from right |
| RIGHT | All rows from right table + matching from left |
| FULL | All rows from both tables |

#### 🔥 Extra Tricky Questions:

**Q: What's the difference between `WHERE` and `ON` in JOINs?**
**A:** For INNER JOIN, same result. For OUTER JOINs, `ON` filters before join, `WHERE` filters after (can eliminate NULLs).

**Q: What's a CROSS JOIN?**
**A:** Cartesian product - every row from table A combined with every row from table B.

---

### 10. Slow Query Optimization

**Q: How to optimize slow queries or stored procedures?**

**A:**

1. **Analyze Execution Plan** - `SET STATISTICS IO ON`, `INCLUDE ACTUAL EXECUTION PLAN`
2. **Add appropriate indexes** - Cover frequently filtered/joined columns
3. **Avoid SELECT *** - Only select needed columns
4. **Use SARGable predicates** - Avoid functions on indexed columns:
   ```sql
   -- Bad: WHERE YEAR(OrderDate) = 2024
   -- Good: WHERE OrderDate >= '2024-01-01' AND OrderDate < '2025-01-01'
   ```
5. **Update statistics** - `UPDATE STATISTICS TableName`
6. **Consider query hints** - `WITH (NOLOCK)`, `OPTION (RECOMPILE)`
7. **Partition large tables**
8. **Archive historical data**

---

### 11. Intermittent Slow Query

**Q: A query is slow intermittently - sometimes super fast, sometimes super slow. Why?**

**A:** Common causes:

1. **Parameter Sniffing** - Execution plan optimized for one parameter, bad for others
   - Solution: `OPTION (RECOMPILE)` or `OPTIMIZE FOR UNKNOWN`

2. **Lock/Block Contention** - Query waiting for other transactions
   - Diagnose: `sp_who2`, `sys.dm_exec_requests`

3. **Stale Statistics** - Optimizer makes bad decisions
   - Solution: `UPDATE STATISTICS`

4. **Memory Pressure** - Plan evicted from cache, recompiles
   - Diagnose: Check SQL Server memory metrics

5. **Tempdb Contention** - Heavy temp table usage
   - Diagnose: Check tempdb wait stats

6. **Index Fragmentation** - Periodic rebuilds needed
   - Solution: `ALTER INDEX REBUILD`

**Diagnosis approach:**
```sql
-- Check wait stats
SELECT * FROM sys.dm_exec_query_stats;
-- Check blocking
SELECT * FROM sys.dm_exec_requests WHERE blocking_session_id <> 0;
```

---

## Section 3: Performance Debugging

---

### 12. Slow Job Details Page

**Q: You're developing a job posting site. Job details page is loading slow. How do you debug and resolve?**

**A:**

**Frontend Debugging:**
1. **Browser DevTools Network Tab**:
   - Check if it's slow TTFB (server issue) or slow download (payload size)
   - Identify slowest requests

2. **Performance Tab**:
   - Look for long tasks, layout thrashing, excessive re-renders

3. **Solutions**:
   - Lazy load below-the-fold content
   - Code splitting
   - Image optimization
   - Virtual scrolling for long lists

**Backend/API Layer:**
1. **API Response Time**: Add timing headers/logs
2. **Database Queries**: Profile slow queries
3. **Add caching layers**:
   - Response caching
   - Redis/Memory cache for frequently accessed job details

**Database Overload Scenario:**
- **Server-side caching**: Redis, IMemoryCache for hot data
- **Client-side caching**: React Query, SWR - avoid fetching same endpoint from multiple components
- **CDN** for static assets
- **Read replicas** for scaling reads

#### 🔥 Extra Tricky Questions:

**Q: What's React Query's stale-while-revalidate pattern?**
**A:** Returns cached data immediately (stale) while fetching fresh data in background. Best UX for most cases.

**Q: How would you implement server-side caching?**
```csharp
[ResponseCache(Duration = 60)]
public async Task<IActionResult> GetJobDetails(int id)
{
    // Or use IMemoryCache / IDistributedCache
}
```

---

## Section 4: Architecture & Experience

---

### 13. Monolith to Microservice Migration

**Q: Tell me about your experience with monolith to microservice migration.**

**A:** Key considerations:

1. **Identify Boundaries**: Use Domain-Driven Design to find bounded contexts
2. **Strangler Fig Pattern**: Incrementally replace monolith pieces
3. **Data Separation**: Each service owns its data
4. **Communication**: 
   - Sync: REST/gRPC for queries
   - Async: Message queues (RabbitMQ, Azure Service Bus) for events
5. **Challenges**:
   - Distributed transactions (Saga pattern)
   - Service discovery
   - Monitoring/tracing (OpenTelemetry)

#### 🔥 Extra Tricky Questions:

**Q: What's the difference between Saga and 2-Phase Commit?**
**A:** Saga uses compensating transactions (eventual consistency). 2PC locks resources across services (strong consistency but poor availability).

**Q: When NOT to use microservices?**
**A:** Small team, simple domain, rapid prototyping - monolith is often better.

---

### 14. Working with Angular

**Q: Are you willing to work with Angular?**

**A:** Yes! Key Angular concepts as a .NET developer:

- **Component-based architecture** (similar to Blazor)
- **TypeScript** (strongly typed, familiar to C# devs)
- **Dependency Injection** (built-in, similar to .NET DI)
- **RxJS** for reactive programming
- **Angular CLI** for project scaffolding

---

## Bonus: Additional Tricky Questions

### C# Fundamentals

**Q: What's the difference between `ref` and `out`?**
**A:** `ref` requires initialization before passing. `out` doesn't require initialization but must be assigned inside the method.

**Q: What's `sealed` class?**
**A:** Cannot be inherited. Slight performance benefit due to devirtualization.

**Q: Difference between `const` and `readonly`?**
**A:** `const` is compile-time, inlined everywhere. `readonly` is runtime, can be set in constructor.

### Async Deep Dive

**Q: What's `ConfigureAwait(false)`?**
**A:** Doesn't capture synchronization context after await. Use in libraries to avoid deadlocks and improve performance.

**Q: What causes async deadlocks?**
**A:** Blocking on async code (`.Result`, `.Wait()`) in SynchronizationContext-using code (UI, ASP.NET non-Core).

### Database Advanced

**Q: What's an Index Seek vs Index Scan?**
**A:** Seek: Directly navigates to matching rows (fast). Scan: Reads entire index (slower).

**Q: What's a Covering Index?**
**A:** Index that includes all columns needed for a query, avoiding key lookup.

**Q: What's database isolation levels?**
**A:** READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE, SNAPSHOT - tradeoff between consistency and concurrency.
