# NEOGOV Interview Answers

## .NET / C# / Backend

### Core C# Concepts

---

#### 1. What is the difference between `Expression<Func<T>>` and `Func<T>`?

**Answer:**
- `Func<T>` is a **compiled delegate** - it's executable code
- `Expression<Func<T>>` is an **expression tree** - a data structure representing code that can be analyzed, modified, or translated (e.g., to SQL by EF)

```csharp
// Func - compiled, executed in memory
Func<int, bool> func = x => x > 5;
bool result = func(10); // Executes immediately

// Expression - can be translated to SQL
Expression<Func<User, bool>> expr = u => u.Age > 18;
dbContext.Users.Where(expr); // Translated to: WHERE Age > 18
```

**🔥 Tricky Follow-up:**
> *"What happens if you use `Func<T>` in an EF query?"*

It will pull ALL data into memory first, then filter (client-side evaluation), causing performance issues!

```csharp
Func<User, bool> filter = u => u.Age > 18;
// BAD: Loads entire Users table, then filters in memory
var users = dbContext.Users.Where(filter).ToList();
```

---

#### 2. What is the difference between abstract class and interface?

**Answer:**

| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Multiple inheritance | No (single) | Yes (multiple) |
| Fields/State | Can have fields | No fields (only properties) |
| Constructors | Yes | No |
| Access modifiers | Any | Public by default |
| Default implementation | Always could | C# 8.0+ only |

**When to use:**
- **Interface**: Define a contract/capability (`IDisposable`, `IComparable`)
- **Abstract class**: Share code among related classes with common state

```csharp
public abstract class Animal
{
    protected string Name; // Can have state
    public abstract void Speak();
    public void Breathe() => Console.WriteLine("Breathing..."); // Shared implementation
}

public interface IFlyable
{
    void Fly(); // Contract only
}
```

**🔥 Tricky Follow-up:**
> *"Can you have a private method in an interface?"*

Yes! Since C# 8.0, interfaces can have private methods to support default implementations.

---

#### 3. What is Dependency Injection? What are its pros and cons?

**Answer:**
**DI** is a design pattern where dependencies are **injected** rather than created inside the class.

**Pros:**
- ✅ Loose coupling
- ✅ Easier testing (mock dependencies)
- ✅ Single Responsibility Principle
- ✅ Easier to change implementations

**Cons:**
- ❌ Learning curve
- ❌ More initial setup
- ❌ Can hide dependencies (constructor bloat)
- ❌ Runtime errors instead of compile-time

```csharp
// Without DI - tightly coupled
public class OrderService
{
    private readonly EmailService _email = new EmailService(); // Hard dependency
}

// With DI - loosely coupled
public class OrderService
{
    private readonly IEmailService _email;
    public OrderService(IEmailService email) => _email = email; // Injected
}
```

**🔥 Tricky Follow-up:**
> *"What happens if you have a circular dependency?"*

Runtime exception! A depends on B, B depends on A. Solutions: use `Lazy<T>`, refactor, or use property injection.

---

#### 4. What is DI and IoC?

**Answer:**
- **IoC (Inversion of Control)**: Principle - don't call us, we'll call you. The framework controls the flow.
- **DI (Dependency Injection)**: Implementation technique of IoC - injecting dependencies instead of creating them.

IoC is the **principle**, DI is **one way** to achieve it.

```
IoC Container (e.g., Microsoft.Extensions.DependencyInjection)
     ↓
Resolves and injects dependencies at runtime
     ↓
Your class receives ready-to-use dependencies
```

---

#### 5. What is Reflection? When do we use it?

**Answer:**
Reflection allows inspecting and manipulating types, methods, properties at **runtime**.

**Use cases:**
- Serializers (JSON.NET, System.Text.Json)
- ORM mappers (EF, Dapper)
- Dependency Injection containers
- Unit testing frameworks
- Plugin systems

```csharp
Type type = typeof(User);
PropertyInfo[] properties = type.GetProperties();

// Create instance dynamically
object instance = Activator.CreateInstance(type);

// Invoke method by name
MethodInfo method = type.GetMethod("GetFullName");
string result = (string)method.Invoke(instance, null);
```

**🔥 Tricky Follow-up:**
> *"What's the performance impact of Reflection?"*

Very slow! 10-100x slower. Use compiled expressions or source generators for hot paths.

---

#### 6. What is the difference between using a static class for a service and a service registered in DI as Singleton?

**Answer:**

| Feature | Static Class | DI Singleton |
|---------|-------------|--------------|
| Testability | Hard to mock | Easy to mock via interface |
| Dependencies | Cannot inject dependencies | Full DI support |
| Lifetime control | App domain lifetime | Container controlled |
| Interface support | No | Yes |

```csharp
// Static - hard to test
public static class Logger
{
    public static void Log(string msg) => Console.WriteLine(msg);
}

// Singleton via DI - testable
services.AddSingleton<ILogger, ConsoleLogger>();
```

**🔥 Tricky Follow-up:**
> *"When would you use a static class over a singleton?"*

Pure utility functions with no state/dependencies: `Math.Max()`, extension methods, string helpers.

---

#### 7. What is the difference between `string` and `StringBuilder`? How do you work with them?

**Answer:**
- `string` is **immutable** - every modification creates a new object
- `StringBuilder` is **mutable** - modifies in place

```csharp
// BAD - Creates ~1000 string objects
string result = "";
for (int i = 0; i < 1000; i++)
    result += i.ToString(); // New allocation each time!

// GOOD - Single buffer, resized as needed
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
string result = sb.ToString();
```

**Rule of thumb:** Use `StringBuilder` when concatenating in loops or 4+ concatenations.

**🔥 Tricky Follow-up:**
> *"What about string interpolation in a loop?"*

Same problem! `$"{a}{b}"` creates new strings. Use `StringBuilder.Append()` or `string.Create()` for performance.

---

#### 8. What is async/await?

**Answer:**
`async/await` is syntactic sugar for writing **asynchronous** code that looks synchronous.

- **async**: Marks a method as asynchronous
- **await**: Suspends execution until the Task completes, freeing the thread

```csharp
public async Task<User> GetUserAsync(int id)
{
    // Thread is freed while waiting for I/O
    var user = await _dbContext.Users.FindAsync(id);
    return user;
}
```

**Key point:** The thread is NOT blocked - it returns to the thread pool and can serve other requests.

**🔥 Tricky Follow-up:**
> *"What happens if you call `.Result` or `.Wait()` on an async method?"*

**Deadlock risk!** In ASP.NET (before Core) or UI apps. The sync context waits for itself.

```csharp
// DEADLOCK RISK
var result = GetUserAsync(1).Result; // DON'T DO THIS

// CORRECT
var result = await GetUserAsync(1);
```

---

#### 9. How do asynchronous requests work?

**Answer:**

1. Request comes in → Thread from pool handles it
2. When `await` is hit on I/O → Thread returns to pool
3. I/O completion → Continuation scheduled
4. Available thread picks up and completes the work

```
Request → Thread 1 → await DB call → Thread 1 returns to pool
                                           ↓
Response ← Thread 2 ← DB returns ← I/O Completion Port notifies
```

This is why async scales better - threads aren't blocked waiting for I/O!

---

#### 10. What are interfaces and abstract classes?

*See question #2 for detailed answer*

---

#### 11. How would you make a method asynchronous?

**Answer:**

1. Return `Task` or `Task<T>` instead of `void` or `T`
2. Add `async` modifier
3. Use `await` on async operations
4. Suffix with `Async` by convention

```csharp
// Before
public User GetUser(int id)
{
    return _dbContext.Users.Find(id);
}

// After
public async Task<User> GetUserAsync(int id)
{
    return await _dbContext.Users.FindAsync(id);
}
```

**🔥 Tricky Follow-up:**
> *"Should you use `async` if you're just returning a Task?"*

No! Avoid `async` overhead if just passing through:

```csharp
// Unnecessary async
public async Task<int> GetValueAsync() => await _service.GetAsync();

// Better - just return the Task
public Task<int> GetValueAsync() => _service.GetAsync();
```

---

#### 12. What is object deep copying?

**Answer:**
- **Shallow copy**: Copies references (objects share same nested objects)
- **Deep copy**: Creates independent copies of all nested objects

```csharp
// Shallow copy - nested objects are shared
var shallow = (Person)original.MemberwiseClone();

// Deep copy methods:
// 1. Serialization
public T DeepCopy<T>(T obj)
{
    var json = JsonSerializer.Serialize(obj);
    return JsonSerializer.Deserialize<T>(json);
}

// 2. Manual implementation
public Person DeepCopy()
{
    return new Person
    {
        Name = this.Name,
        Address = new Address // New instance!
        {
            City = this.Address.City
        }
    };
}
```

**🔥 Tricky Follow-up:**
> *"What about records with `with` expression?"*

It's a **shallow copy**! The `with` expression creates shallow copies.

---

#### 13. Operations with large strings (e.g., reading a large CSV file into a string)

**Answer:**
Don't load entire file into memory! Use **streaming**:

```csharp
// BAD - loads entire file into memory
string content = File.ReadAllText("huge.csv"); // OOM risk!

// GOOD - streaming line by line
await foreach (var line in File.ReadLinesAsync("huge.csv"))
{
    ProcessLine(line);
}

// BETTER - Span/Memory for parsing
using var reader = new StreamReader("huge.csv");
while (await reader.ReadLineAsync() is { } line)
{
    ReadOnlySpan<char> span = line.AsSpan();
    // Parse without allocations
}

// BEST for CSV - use a library like CsvHelper with streaming
```

**🔥 Tricky Follow-up:**
> *"What's `ReadOnlySpan<char>` and why use it?"*

Stack-allocated view over memory - no heap allocations. Great for parsing without creating substring objects.

---

### ASP.NET Core & Web APIs

---

#### 14. What is Entity Framework and what is it used for?

**Answer:**
EF is an **ORM (Object-Relational Mapper)** that lets you work with databases using .NET objects instead of SQL.

**Features:**
- LINQ to SQL translation
- Change tracking
- Migrations
- Code-first / Database-first approaches

```csharp
// Instead of SQL
var users = await _context.Users
    .Where(u => u.Age > 18)
    .OrderBy(u => u.Name)
    .ToListAsync();
// Generates: SELECT * FROM Users WHERE Age > 18 ORDER BY Name
```

---

#### 15. What are the features of EF? (ChangeTracker, LINQ to SQL, etc.)

**Answer:**

1. **Change Tracking**: Automatically detects entity changes
2. **LINQ Provider**: Translates LINQ to SQL
3. **Lazy Loading**: Load related data on access (be careful with N+1!)
4. **Eager Loading**: `Include()` for related data
5. **Migrations**: Version control for database schema
6. **Conventions**: Auto-configures based on naming

```csharp
// Change Tracking
var user = await _context.Users.FindAsync(1);
user.Name = "New Name"; // Tracked!
await _context.SaveChangesAsync(); // UPDATE statement generated

// Eager Loading
var orders = await _context.Orders
    .Include(o => o.Customer)
    .Include(o => o.Items)
    .ToListAsync();
```

**🔥 Tricky Follow-up:**
> *"How do you disable Change Tracking?"*

```csharp
var users = await _context.Users.AsNoTracking().ToListAsync();
// Or globally: _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
```

---

#### 16. Is DbContext thread-safe? Is HttpClient thread-safe?

**Answer:**

| | DbContext | HttpClient |
|--|---------|-----------|
| Thread-safe? | ❌ NO | ✅ YES |
| Lifetime | Scoped (per request) | Singleton (via IHttpClientFactory) |

```csharp
// DbContext - register as Scoped
services.AddDbContext<AppDbContext>(options => ...);

// HttpClient - use IHttpClientFactory
services.AddHttpClient<IMyService, MyService>();
```

**🔥 Tricky Follow-up:**
> *"Why is HttpClient recommended as singleton but DbContext as scoped?"*

- HttpClient: Expensive socket creation, DNS caching
- DbContext: Not thread-safe, tracks entities per unit of work

---

#### 17. How would you get data about an authorized user and use it on the backend?

**Answer:**

1. **Claims from Token**: Access via `HttpContext.User`
2. **Custom Middleware**: Extract and enrich user data
3. **CurrentUser Service**: Encapsulate access

```csharp
// 1. Controller - direct access
[Authorize]
public IActionResult GetProfile()
{
    var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
    var email = User.FindFirst(ClaimTypes.Email)?.Value;
    return Ok(new { userId, email });
}

// 2. Service pattern - cleaner
public interface ICurrentUserService
{
    string UserId { get; }
    string Email { get; }
}

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _accessor;
    public CurrentUserService(IHttpContextAccessor accessor) => _accessor = accessor;
    
    public string UserId => _accessor.HttpContext?.User
        .FindFirst(ClaimTypes.NameIdentifier)?.Value;
}

// Register
services.AddHttpContextAccessor();
services.AddScoped<ICurrentUserService, CurrentUserService>();
```

---

#### 18. What are the DI scopes? Which parts of the application use which scopes?

**Answer:**

| Scope | Lifetime | Use Case |
|-------|---------|----------|
| **Singleton** | App lifetime | HttpClient, Caching, Configuration |
| **Scoped** | Per request | DbContext, CurrentUser, UnitOfWork |
| **Transient** | Per resolution | Lightweight, stateless services |

```csharp
services.AddSingleton<ICacheService, CacheService>();
services.AddScoped<IUserRepository, UserRepository>();
services.AddTransient<IValidator, Validator>();
```

**🔥 Tricky Follow-up:**
> *"What's the Captive Dependency problem?"*

A Singleton holding a Scoped dependency keeps the scoped service alive forever!

```csharp
// BUG: Singleton captures Scoped DbContext
public class SingletonService
{
    private readonly MyDbContext _context; // Lives forever! Wrong!
}
```

---

#### 19. How would you implement authorization and authentication for an application with many requests?

**Answer:**

**For high-throughput:**
1. **JWT tokens** - Stateless, no DB lookup per request
2. **Token caching** - Redis for validation results
3. **Asymmetric keys** - Public key verification is fast

```csharp
// JWT Setup
services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });

// Policy-based Authorization
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => 
        policy.RequireRole("Admin"));
});
```

**For many requests:** Consider OAuth2 with token introspection caching, or API Gateway with auth offloading.

---

#### 20. How would you pass information between different applications?

**Answer:**

| Method | When to Use | Pros |
|--------|-------------|------|
| **HTTP/REST** | Synchronous, simple | Universal, easy |
| **gRPC** | High performance, internal | Fast, typed contracts |
| **Message Queue (RabbitMQ, Kafka)** | Async, decoupled | Resilient, scalable |
| **SignalR** | Real-time | Bidirectional |
| **Shared Database** | Legacy | Avoid if possible |

```csharp
// gRPC - Fast internal communication
var reply = await client.GetUserAsync(new UserRequest { Id = 1 });

// RabbitMQ - Async decoupled
channel.BasicPublish("orders", "", body);

// HTTP - Simple REST
var user = await httpClient.GetFromJsonAsync<User>("/api/users/1");
```

---

#### 21. Implement a Web API controller

**Answer:**

```csharp
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<UserDto>>> GetAll()
    {
        var users = await _userService.GetAllAsync();
        return Ok(users);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<UserDto>> GetById(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null)
            return NotFound();
        return Ok(user);
    }

    [HttpPost]
    public async Task<ActionResult<UserDto>> Create([FromBody] CreateUserRequest request)
    {
        var user = await _userService.CreateAsync(request);
        return CreatedAtAction(nameof(GetById), new { id = user.Id }, user);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] UpdateUserRequest request)
    {
        await _userService.UpdateAsync(id, request);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        await _userService.DeleteAsync(id);
        return NoContent();
    }
}
```

---

#### 22-26. Quality, Resilience, and Performance

**Answer:**

**Key practices for quality software:**

1. **Resilience Patterns:**
   - Retry with Polly
   - Circuit Breaker
   - Timeout policies
   - Bulkhead isolation

```csharp
// Polly Retry
services.AddHttpClient<IExternalService, ExternalService>()
    .AddTransientHttpErrorPolicy(p => 
        p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(1)));
```

2. **Scalability:**
   - Stateless services
   - Horizontal scaling
   - Caching (Redis)
   - Database read replicas

3. **Performance:**
   - Async all the way
   - Response caching
   - Query optimization
   - Connection pooling

4. **Quality:**
   - Unit & integration tests
   - Code reviews
   - Static analysis
   - CI/CD pipelines

---

### Testing

---

#### 27-29. Testing

**Answer:**

**Types of tests:**
- **Unit tests**: Isolated, mock dependencies (xUnit, NUnit)
- **Integration tests**: Test with real dependencies (WebApplicationFactory)
- **E2E tests**: Full user flows (Selenium, Playwright)

```csharp
// Unit Test Example
public class UserServiceTests
{
    private readonly Mock<IUserRepository> _repoMock = new();
    private readonly UserService _sut;

    public UserServiceTests()
    {
        _sut = new UserService(_repoMock.Object);
    }

    [Fact]
    public async Task GetById_UserExists_ReturnsUser()
    {
        // Arrange
        var expected = new User { Id = 1, Name = "John" };
        _repoMock.Setup(r => r.GetByIdAsync(1))
            .ReturnsAsync(expected);

        // Act
        var result = await _sut.GetByIdAsync(1);

        // Assert
        Assert.NotNull(result);
        Assert.Equal("John", result.Name);
    }

    [Fact]
    public async Task GetById_UserNotFound_ReturnsNull()
    {
        // Arrange
        _repoMock.Setup(r => r.GetByIdAsync(99))
            .ReturnsAsync((User)null);

        // Act
        var result = await _sut.GetByIdAsync(99);

        // Assert
        Assert.Null(result);
    }
}

// Integration Test
public class UsersControllerTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly HttpClient _client;

    public UsersControllerTests(WebApplicationFactory<Program> factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task GetUsers_ReturnsSuccessStatusCode()
    {
        var response = await _client.GetAsync("/api/users");
        response.EnsureSuccessStatusCode();
    }
}
```

**Tools:** xUnit, NUnit, Moq, FluentAssertions, AutoFixture, WebApplicationFactory

---

### Message Queues & Background Jobs

---

#### 30-35. RabbitMQ & Hangfire

**RabbitMQ:**

```
Producer → Exchange → Queue(s) → Consumer(s)
```

- **Exchange types**: Direct, Fanout, Topic, Headers
- **Message persistence**: Durable queues, persistent delivery mode
- **Ordering**: FIFO within a single queue
- **Multiple consumers**: Round-robin by default

```csharp
// Producer
channel.BasicPublish(exchange: "orders", 
    routingKey: "order.created",
    body: Encoding.UTF8.GetBytes(json));

// Consumer with acknowledgment
channel.BasicConsume(queue: "orders", 
    autoAck: false, // Manual ack
    consumer);

// In consumer
channel.BasicAck(deliveryTag, false); // Success
channel.BasicNack(deliveryTag, false, true); // Requeue on failure
```

**Handling failures:**
- Dead Letter Exchange (DLX)
- Retry with exponential backoff
- Error queues for manual processing

**Hangfire:**
Background job processing library.

```csharp
// Fire-and-forget
BackgroundJob.Enqueue(() => SendEmail(email));

// Delayed
BackgroundJob.Schedule(() => SendReminder(id), TimeSpan.FromDays(1));

// Recurring
RecurringJob.AddOrUpdate("daily-cleanup", 
    () => CleanupService.Run(), Cron.Daily);
```

---

### Database Audit

---

#### 36. Store complete history of operations (audit trail)

**Answer:**

**Options:**

1. **EF Core Interceptors/SaveChanges override:**

```csharp
public override async Task<int> SaveChangesAsync(CancellationToken ct = default)
{
    var auditEntries = OnBeforeSaveChanges();
    var result = await base.SaveChangesAsync(ct);
    await OnAfterSaveChanges(auditEntries);
    return result;
}

private List<AuditEntry> OnBeforeSaveChanges()
{
    ChangeTracker.DetectChanges();
    var entries = new List<AuditEntry>();
    
    foreach (var entry in ChangeTracker.Entries())
    {
        if (entry.State == EntityState.Modified)
        {
            var audit = new AuditEntry
            {
                TableName = entry.Entity.GetType().Name,
                Action = "UPDATE",
                ChangedAt = DateTime.UtcNow,
                OldValues = JsonSerializer.Serialize(entry.OriginalValues.ToObject()),
                NewValues = JsonSerializer.Serialize(entry.CurrentValues.ToObject())
            };
            entries.Add(audit);
        }
    }
    return entries;
}
```

2. **Temporal Tables (SQL Server):**
```sql
ALTER TABLE Users ADD
    StartTime DATETIME2 GENERATED ALWAYS AS ROW START,
    EndTime DATETIME2 GENERATED ALWAYS AS ROW END,
    PERIOD FOR SYSTEM_TIME (StartTime, EndTime);

ALTER TABLE Users SET (SYSTEM_VERSIONING = ON 
    (HISTORY_TABLE = dbo.UsersHistory));
```

---

### Performance & Optimization

---

#### 37-40. Slow Query Optimization

**Approach:**

1. **Identify**: SQL Profiler, EF logging, Application Insights
2. **Analyze**: Execution plan, missing indexes
3. **Fix**: Add indexes, rewrite query, optimize EF

```csharp
// Enable EF Logging
optionsBuilder.LogTo(Console.WriteLine, LogLevel.Information);

// Common EF Issues:
// 1. N+1 Problem - use Include()
var orders = await _context.Orders
    .Include(o => o.Items) // Eager load
    .ToListAsync();

// 2. Loading too much data - use projection
var names = await _context.Users
    .Select(u => new { u.Id, u.Name }) // Only needed columns
    .ToListAsync();

// 3. No indexes - add in migration
migrationBuilder.CreateIndex("IX_Users_Email", "Users", "Email");
```

**🔥 Tricky Follow-up:**
> *"What's the difference between `Include()` and `ThenInclude()`?"*

`Include` for direct navigation. `ThenInclude` for nested navigation properties.

---

### Algorithms

---

#### 41-42. Longest Palindrome Length

**Answer:**

```csharp
// Find max length palindrome that can be built from characters
public int LongestPalindrome(string s)
{
    var charCount = new Dictionary<char, int>();
    foreach (char c in s)
    {
        charCount[c] = charCount.GetValueOrDefault(c, 0) + 1;
    }
    
    int length = 0;
    bool hasOdd = false;
    
    foreach (var count in charCount.Values)
    {
        length += count / 2 * 2; // Add pairs
        if (count % 2 == 1) hasOdd = true;
    }
    
    return hasOdd ? length + 1 : length; // Add middle char if odd exists
}

// Find longest palindrome substring
public string LongestPalindromeSubstring(string s)
{
    if (string.IsNullOrEmpty(s)) return "";
    
    int start = 0, maxLen = 1;
    
    for (int i = 0; i < s.Length; i++)
    {
        // Odd length palindrome
        var (l1, r1) = ExpandAroundCenter(s, i, i);
        // Even length palindrome  
        var (l2, r2) = ExpandAroundCenter(s, i, i + 1);
        
        if (r1 - l1 > maxLen) { start = l1; maxLen = r1 - l1; }
        if (r2 - l2 > maxLen) { start = l2; maxLen = r2 - l2; }
    }
    
    return s.Substring(start, maxLen);
}

private (int, int) ExpandAroundCenter(string s, int left, int right)
{
    while (left >= 0 && right < s.Length && s[left] == s[right])
    {
        left--; right++;
    }
    return (left + 1, right - left - 1); // Return start and length
}
```

---

#### 43-44. Algorithm Complexity

**Answer:**

| Algorithm | Time Complexity |
|-----------|-----------------|
| Bubble Sort | O(n²) |
| Quick Sort | O(n log n) average, O(n²) worst |
| Merge Sort | O(n log n) |
| Dictionary lookup | **O(1)** average |

**Dictionary O(1) explanation:**
- Uses hash function to compute bucket index
- Direct array access with hash
- Collision handling adds minimal overhead

```csharp
var dict = new Dictionary<string, int>();
dict["key"] = 1; // O(1) insert
var value = dict["key"]; // O(1) lookup
```

**🔥 Tricky Follow-up:**
> *"When is Dictionary lookup O(n)?"*

When all keys hash to the same bucket (poor hash function or malicious input).

---

## SQL / Databases

---

#### 1-2. Primary Key vs Foreign Key

**Answer:**

- **Primary Key (PK)**: Unique identifier for each row. Cannot be NULL. One per table.
- **Foreign Key (FK)**: Reference to PK in another table. Enforces referential integrity.

```sql
CREATE TABLE Orders (
    Id INT PRIMARY KEY,                    -- PK
    CustomerId INT FOREIGN KEY REFERENCES Customers(Id)  -- FK
);
```

---

#### 3-5. Indexes

**Answer:**

**What:** Data structure (B-tree) that speeds up data retrieval.

**Pros:** ✅ Faster reads, faster WHERE, JOIN, ORDER BY
**Cons:** ❌ Slower writes, storage overhead, maintenance

```sql
-- Create index
CREATE INDEX IX_Users_Email ON Users(Email);

-- Composite index
CREATE INDEX IX_Orders_CustomerId_Date ON Orders(CustomerId, OrderDate);
```

**Fragmented Index:** When data pages are out of order due to inserts/updates.
Fix: `ALTER INDEX IX_Name REBUILD;`

**Storage:** B-tree (balanced tree) structure with leaf pages containing data/pointers.

---

#### 6. What is a View?

**Answer:**

A **virtual table** based on a query. Simplifies complex queries, provides abstraction.

```sql
CREATE VIEW ActiveUsersWithOrders AS
SELECT u.Id, u.Name, COUNT(o.Id) as OrderCount
FROM Users u
JOIN Orders o ON u.Id = o.UserId
WHERE u.IsActive = 1
GROUP BY u.Id, u.Name;

-- Use like table
SELECT * FROM ActiveUsersWithOrders WHERE OrderCount > 5;
```

---

#### 7. JOINs

**Answer:**

| JOIN | Returns |
|------|--------|
| INNER | Matching rows only |
| LEFT | All left + matching right |
| RIGHT | Matching left + all right |
| FULL | All rows from both |
| CROSS | Cartesian product |

```sql
-- Most common: INNER JOIN
SELECT o.Id, c.Name
FROM Orders o
INNER JOIN Customers c ON o.CustomerId = c.Id;

-- When you need all records from one side: LEFT JOIN
SELECT c.Name, o.Id
FROM Customers c
LEFT JOIN Orders o ON c.Id = o.CustomerId;  -- Shows customers with no orders too
```

---

#### 10-12. SQL Coding Examples

**Find duplicates:**
```sql
SELECT Email, COUNT(*) as Count
FROM Users
GROUP BY Email
HAVING COUNT(*) > 1;
```

**Join 3 tables with calculation:**
```sql
SELECT 
    o.Id,
    (p.Price * oi.Quantity) + d.DiscountAmount AS Total
FROM Orders o
JOIN OrderItems oi ON o.Id = oi.OrderId
JOIN Products p ON oi.ProductId = p.Id
JOIN Discounts d ON o.DiscountId = d.Id;
```

**Users who spent more than amount:**
```sql
SELECT u.Id, u.Name, SUM(o.Total) as TotalSpent
FROM Users u
JOIN Orders o ON u.Id = o.UserId
JOIN OrderItems oi ON o.Id = oi.OrderId
GROUP BY u.Id, u.Name
HAVING SUM(o.Total) > @amount;
```

---

## JavaScript / TypeScript

---

#### 1. let vs const

**Answer:**

```javascript
let x = 1;
x = 2;          // ✅ Can reassign

const y = 1;
y = 2;          // ❌ Error: Cannot reassign

const arr = [1, 2];
arr.push(3);    // ✅ Can mutate object/array
arr = [];       // ❌ Cannot reassign reference
```

**Rule:** Use `const` by default, `let` when reassignment needed.

---

#### 2. filter vs map

**Answer:**

```javascript
const nums = [1, 2, 3, 4, 5];

// filter: Select items based on condition (returns subset)
const evens = nums.filter(n => n % 2 === 0); // [2, 4]

// map: Transform each item (returns same length)
const doubled = nums.map(n => n * 2); // [2, 4, 6, 8, 10]
```

---

#### 3. Regular function vs Arrow function

**Answer:**

| Feature | Regular Function | Arrow Function |
|---------|-----------------|----------------|
| `this` binding | Dynamic (caller) | Lexical (enclosing) |
| `arguments` object | Yes | No |
| Constructor | Can use `new` | Cannot |
| Hoisting | Yes | No |

```javascript
const obj = {
    name: "John",
    regular: function() {
        console.log(this.name); // "John" - this = obj
    },
    arrow: () => {
        console.log(this.name); // undefined - this = enclosing scope
    }
};
```

**🔥 Tricky Follow-up:**
> *"When would you NOT use arrow functions?"*

Object methods, event handlers where you need `this`, when you need `arguments` object.

---

#### 4. Custom event handler

**Answer:**

```javascript
// Add event listener
element.addEventListener('click', handleClick);

// Custom event
const customEvent = new CustomEvent('userLoggedIn', { 
    detail: { userId: 123 } 
});
document.dispatchEvent(customEvent);

// Listen
document.addEventListener('userLoggedIn', (e) => {
    console.log(e.detail.userId);
});
```

---

#### 5-7. Promises and Threading

**Answer:**

**Promises:** Object representing eventual completion/failure of async operation.

```javascript
// Creating
const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve('Done!'), 1000);
});

// Using
promise
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Async/await (cleaner)
const result = await promise;
```

**JavaScript is single-threaded!** Uses event loop for async:
- Call stack executes sync code
- Web APIs handle async operations
- Event loop moves callbacks to stack when ready

**Non-blocking long tasks:**
```javascript
// Web Workers for CPU-intensive
const worker = new Worker('heavy-task.js');

// Break into chunks
function processInChunks(items) {
    const chunk = items.splice(0, 100);
    processChunk(chunk);
    if (items.length > 0) {
        setTimeout(() => processInChunks(items), 0);
    }
}
```

---

#### 8-10. Array Operations

```javascript
// Merge arrays
const arr1 = [{ id: 1, name: 'A' }];
const arr2 = [{ id: 2, name: 'B' }];
const merged = [...arr1, ...arr2];

// Get unique by field
const unique = merged.filter((item, index, self) =>
    index === self.findIndex(t => t.id === item.id)
);

// Or with Map (more efficient)
const uniqueById = [...new Map(merged.map(item => [item.id, item])).values()];

// Filter invalid IDs
const validItems = items.filter(item => 
    item.id != null && 
    typeof item.id === 'number' && 
    item.id > 0
);
```

---

## Angular

---

#### 1-2. Signals

**Answer:**

**Signals** (Angular 16+) are reactive primitives for state management.

```typescript
// Before Signals - Zone.js change detection
@Component({...})
export class OldComponent {
    count = 0;
    increment() { this.count++; } // Triggers zone check
}

// With Signals - Fine-grained reactivity
@Component({...})
export class NewComponent {
    count = signal(0);
    doubled = computed(() => this.count() * 2);
    
    increment() {
        this.count.update(c => c + 1); // Only affected views update
    }
}
```

**Before Signals:** Used `BehaviorSubject`, `@Input()/@Output()`, services with RxJS.

---

#### 3-4. Angular Dependency Injection

**Answer:**

```typescript
// Root scope - singleton for entire app
@Injectable({ providedIn: 'root' })
export class GlobalService {}

// Component scope - new instance per component
@Component({
    providers: [LocalService] // New instance for this component tree
})
export class MyComponent {}
```

**🔥 Tricky Follow-up:**
> *"What if you want one instance per lazy-loaded module?"*

Use `providedIn: 'any'` or provide in module's providers array.

---

#### 5-11. Component Lifecycle

**Answer:**

**Order:**
1. `constructor` - DI happens
2. `ngOnChanges` - Input changes
3. `ngOnInit` - Component initialized ⭐ Most used
4. `ngDoCheck` - Every change detection
5. `ngAfterContentInit` - After content projection
6. `ngAfterContentChecked` - After content check
7. `ngAfterViewInit` - After view initialized ⭐
8. `ngAfterViewChecked` - After view check
9. `ngOnDestroy` - Cleanup ⭐

```typescript
export class MyComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    
    ngOnInit() {
        this.subscription = this.service.getData().subscribe();
    }
    
    ngOnDestroy() {
        this.subscription.unsubscribe(); // Release resources!
    }
}
```

**Trigger frequency:**
- `ngOnInit`: Once
- `ngOnChanges`: Every input change
- `ngDoCheck`, `ngAfterViewChecked`: Every CD cycle (many times!)

---

#### 12-14. Change Detection

**Answer:**

**Default:** Checks entire component tree on any event.

**OnPush:** Only checks when:
- Input reference changes
- Event originated from component
- Async pipe emits
- Manual `markForCheck()`

```typescript
@Component({
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedComponent {
    @Input() data: Data; // Must be immutable reference!
}
```

---

#### 12. Data Sharing Between Components

**Answer:**

```typescript
// Down: @Input
@Input() user: User;

// Up: @Output
@Output() onSave = new EventEmitter<User>();
this.onSave.emit(user);

// Horizontal: Service
@Injectable({ providedIn: 'root' })
export class SharedService {
    private userSubject = new BehaviorSubject<User>(null);
    user$ = this.userSubject.asObservable();
    
    setUser(user: User) { this.userSubject.next(user); }
}
```

---

#### 15-17. Template Forms vs Reactive Forms

**Answer:**

```typescript
// Template-driven (simple forms)
<input [(ngModel)]="user.name" required>

// Reactive Forms (complex, more control)
export class MyComponent {
    form = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.email])
    });
    
    onSubmit() {
        if (this.form.valid) {
            console.log(this.form.value);
        }
    }
}
```

---

#### 18-21. Directives and Services

**Answer:**

**Directives:**
- **Structural**: `*ngIf`, `*ngFor` - modify DOM
- **Attribute**: `[ngClass]`, `[ngStyle]` - modify appearance

```typescript
// Custom directive
@Directive({ selector: '[highlight]' })
export class HighlightDirective {
    @HostListener('mouseenter') onEnter() {
        this.el.nativeElement.style.backgroundColor = 'yellow';
    }
    constructor(private el: ElementRef) {}
}
```

**Service vs Component:**
- **Service**: Business logic, data access, shared state
- **Component**: UI, user interaction

---

#### 22-23. HTTP Interceptors

**Answer:**

```typescript
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private router: Router) {}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getToken();
        
        const authReq = token 
            ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` }})
            : req;
            
        return next.handle(authReq).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.auth.logout();
                    this.router.navigate(['/login']);
                }
                return throwError(() => error);
            })
        );
    }
}

// Register in providers
providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]
```

---

#### 24-28. Angular Coding Examples

**Save person with form:**

```typescript
// person.service.ts
@Injectable({ providedIn: 'root' })
export class PersonService {
    private persons = signal<Person[]>([]);
    persons$ = this.persons.asReadonly();
    
    count = computed(() => this.persons().length);
    
    addPerson(person: Person) {
        this.persons.update(p => [...p, person]);
    }
}

// person-form.component.ts
@Component({
    template: `
        <form [formGroup]="form" (ngSubmit)="save()">
            <input formControlName="firstName">
            <input formControlName="lastName">
            <button type="submit" [disabled]="form.invalid">Save</button>
        </form>
        
        <p>Live: {{ form.get('firstName')?.value }} {{ form.get('lastName')?.value }}</p>
        <p>Saved: {{ personService.count() }}</p>
    `
})
export class PersonFormComponent {
    form = new FormGroup({
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required)
    });
    
    constructor(public personService: PersonService) {}
    
    save() {
        if (this.form.valid) {
            this.personService.addPerson(this.form.value as Person);
            this.form.reset();
        }
    }
}

// person-list.component.ts (route: /list)
@Component({
    template: `
        <ul>
            @for (person of personService.persons$(); track person.firstName) {
                <li>{{ person.firstName }} {{ person.lastName }}</li>
            }
        </ul>
    `
})
export class PersonListComponent {
    constructor(public personService: PersonService) {}
}
```

---

## Practical Coding Tasks (.NET)

---

#### 1-9. Student/Teacher Tasks

```csharp
public class Person
{
    public string Name { get; set; }
    
    public virtual string GetInitials()
    {
        return string.Join("", Name.Split(' ').Select(p => p[0]));
    }
}

public class Student : Person
{
    public decimal GPA { get; set; }
}

public class Teacher : Person { }

public class Principal : Person
{
    public string Title { get; set; }
    
    public override string GetInitials()
    {
        return $"{Title} {base.GetInitials()}";
    }
}

// Solutions
public class StudentService
{
    // 1. Students with GPA > 3
    public List<Student> GetHighGPA(List<Student> students)
        => students.Where(s => s.GPA > 3).ToList();
    
    // 2. Names of students with GPA >= 3
    public List<string> GetHighGPANames(List<Student> students)
        => students.Where(s => s.GPA >= 3).Select(s => s.Name).ToList();
    
    // 3. Get only names
    public List<string> GetNames(List<Student> students)
        => students.Select(s => s.Name).ToList();
    
    // 4. First names only
    public List<string> GetFirstNames(List<Student> students)
        => students.Select(s => s.Name.Split(' ')[0]).ToList();
    
    // 5-6. Get initials
    public List<string> GetInitials(List<Student> students)
        => students.Select(s => s.GetInitials()).ToList();
}
```

---

#### 10-11. Supervisor Hierarchy (with cycle detection)

```csharp
public class Employee
{
    public string Id { get; set; }
    public string ManagerId { get; set; }
}

public string FindRootSupervisor(List<Employee> employees)
{
    var managerOf = employees.ToDictionary(e => e.Id, e => e.ManagerId);
    var allManagers = employees.Select(e => e.ManagerId).Where(m => m != null).ToHashSet();
    var allEmployees = employees.Select(e => e.Id).ToHashSet();
    
    // Root = manager who is not managed by anyone outside of cycles
    foreach (var emp in employees)
    {
        var visited = new HashSet<string>();
        var current = emp.Id;
        
        while (current != null && !visited.Contains(current))
        {
            visited.Add(current);
            if (!managerOf.ContainsKey(current)) break;
            current = managerOf[current];
        }
        
        // If we didn't hit a cycle and current has no manager
        if (!managerOf.ContainsKey(current) || managerOf[current] == null)
        {
            return current;
        }
    }
    
    // All in cycles - return first employee by some criteria
    return employees.First().Id;
}

// SQL with CTE
/*
WITH RECURSIVE EmployeeHierarchy AS (
    -- Anchor: employees who are not subordinates
    SELECT e.Id, e.ManagerId, 0 as Level, CAST(e.Id AS VARCHAR(1000)) as Path
    FROM Employees e
    WHERE e.ManagerId IS NULL
    
    UNION ALL
    
    -- Recursive
    SELECT e.Id, e.ManagerId, eh.Level + 1, eh.Path + ',' + e.Id
    FROM Employees e
    JOIN EmployeeHierarchy eh ON e.ManagerId = eh.Id
    WHERE eh.Path NOT LIKE '%' + e.Id + '%' -- Cycle detection
)
SELECT TOP 1 Id FROM EmployeeHierarchy WHERE ManagerId IS NULL;
*/
```

---

## General / Behavioral Questions

---

#### 1. Tell me about yourself

**Template:**
> "I'm a [Senior/Mid] Full-Stack Developer with [X] years of experience, primarily in .NET and Angular. Most recently at [Company], I [key achievement]. I'm passionate about [clean code/architecture/mentoring]. I'm looking for [what you want from this role]."

---

#### 6. How do you prioritize tasks for a sprint?

**Answer:**
1. **Business value** - What impacts users most?
2. **Dependencies** - Unblock others first
3. **Risk** - Tackle unknowns early
4. **Deadlines** - Hard dates first
5. **Effort** - Balance quick wins with big items

---

#### 7. Urgent unexpected bug

**Answer:**
1. **Assess severity** - Is it production? Data loss? Security?
2. **Communicate** - Update stakeholders immediately
3. **Triage** - Can we hotfix or need rollback?
4. **Fix** - Smallest safe change
5. **Post-mortem** - Root cause, prevent recurrence

---

#### 8. Code review focus

**Answer:**
- **Correctness** - Does it work? Edge cases?
- **Security** - Injection, auth, data exposure
- **Performance** - N+1, memory leaks, O(n²)
- **Readability** - Names, structure, comments
- **Testing** - Coverage, meaningful tests
- **Design** - SOLID, patterns, coupling

---

#### 9. Questions for the interviewer

**Good questions:**
- What does the team structure look like?
- What's the biggest technical challenge right now?
- How do you handle tech debt?
- What does success look like in this role in 6 months?
- What's the code review/deployment process?
