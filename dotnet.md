# .NET Interview Questions

<details>
<summary><strong>Type System Basics</strong></summary>

### Primitive, Reference, and Value Types

<details>
<summary>1. What is the difference between value types and reference types in .NET?</summary>

- Value types store data directly, allocated on the stack, and copying creates an independent copy
- Reference types store a reference to the heap, copying shares the same underlying object
- Examples: value types (`int`, `struct`, `enum`), reference types (`class`, `string`, `object`)
</details>

<details>
<summary>2. Where are value types and reference types stored in memory?</summary>

- Value types are typically stored on the stack (or inline within objects on the heap)
- Reference types are stored on the heap with a reference/pointer on the stack
</details>

<details>
<summary>3. What happens when you pass a value type vs. a reference type to a method?</summary>

- Value types are passed by copy (changes don't affect the original)
- Reference types pass a copy of the reference (changes to the object affect the original)
- Using `ref` or `out` keywords changes this behavior
</details>

<details>
<summary>4. What is boxing and unboxing? What are the performance implications?</summary>

- Boxing: converting a value type to `object` (allocates on heap)
- Unboxing: extracting the value type from an `object` (requires type check and copy)
- Performance cost: heap allocation, garbage collection pressure, and cache misses
</details>

<details>
<summary>5. Can you explain the difference between struct and class?</summary>

- `struct` is a value type, `class` is a reference type
- Structs cannot inherit (except from interfaces), classes support inheritance
- Structs have default parameterless constructor, classes can define custom ones
- Structs are better for small, immutable data; classes for complex objects
</details>

---

### Nullable Value Types

<details>
<summary>6. What are nullable value types and why do we need them?</summary>

- `Nullable<T>` or `T?` allows value types to represent `null`
- Useful for database fields, optional parameters, and representing "no value"
- Example: `int?` can be `null`, `1`, `2`, etc.
</details>

<details>
<summary>7. How do you check if a nullable type has a value and how do you access it?</summary>

- Use `.HasValue` property or compare to `null`
- Access value with `.Value` property (throws if null) or `.GetValueOrDefault()`
- Use null-coalescing operator `??` for default values
</details>

<details>
<summary>8. What operators can you use with nullable types?</summary>

- Null-coalescing: `??` (provides default if null)
- Null-coalescing assignment: `??=` (assigns if variable is null)
- Null-conditional: `?.` and `?[]` (short-circuit if null)
</details>

<details>
<summary>9. What is the difference between nullable reference types (C# 8.0+) and nullable value types?</summary>

- Nullable value types add null capability to value types at runtime
- Nullable reference types are compile-time annotations for code analysis
- NRTs help prevent `NullReferenceException` through compiler warnings
</details>

---

### Generics

<details>
<summary>10. What are generics and what problems do they solve?</summary>

- Allow type-safe code that works with any data type
- Eliminate boxing/unboxing for value types
- Provide compile-time type checking instead of runtime casts
- Enable code reuse without sacrificing performance
</details>

<details>
<summary>11. What are generic constraints and what types of constraints exist?</summary>

- `where T : struct` - must be a value type
- `where T : class` - must be a reference type
- `where T : new()` - must have a parameterless constructor
- `where T : BaseClass` - must inherit from a class
- `where T : IInterface` - must implement an interface
- `where T : notnull` - must be non-nullable
</details>

<details>
<summary>12. What is covariance and contravariance in generics?</summary>

- Covariance (`out`): allows a more derived type to be used (`IEnumerable<out T>`)
- Contravariance (`in`): allows a less derived type to be used (`Action<in T>`)
- Only works with interfaces and delegates, not classes
</details>

<details>
<summary>13. What is the difference between List&lt;object&gt; and using generics List&lt;T&gt;?</summary>

- `List<object>` requires boxing for value types and casting for retrieval
- `List<T>` is type-safe, no boxing, compile-time checking
- Generics provide better performance and safer code
</details>

---

### Type Members

<details>
<summary>14. What is the difference between a field and a property?</summary>

- Fields are variables declared directly in a class
- Properties are accessors (get/set) that encapsulate fields
- Properties allow validation, computed values, and access control
- Best practice: expose properties, keep fields private
</details>

<details>
<summary>15. What is the difference between const and readonly?</summary>

- `const`: compile-time constant, implicitly static, value embedded in IL
- `readonly`: runtime constant, can be assigned in constructor
- `const` must be primitive or string; `readonly` can be any type
</details>

<details>
<summary>16. What are the different types of constructors in C#?</summary>

- Instance constructor: initializes object instances
- Static constructor: initializes static members, runs once per type
- Copy constructor: creates a new object as a copy of an existing one
- Primary constructor (C# 12+): parameters in class declaration
</details>

<details>
<summary>17. What are static members and when should you use them?</summary>

- Belong to the type itself, not instances
- Shared across all instances, no `this` reference
- Use for: utility methods, constants, shared state, factory methods
- Avoid for: mutable shared state (thread-safety concerns)
</details>

<details>
<summary>18. What is the difference between instance and static methods?</summary>

- Instance methods operate on object instances, have access to `this`
- Static methods belong to the type, cannot access instance members
- Extension methods are static but appear as instance methods
</details>

</details>

---

<details>
<summary><strong>Advanced Type System</strong></summary>

### System.Object

<details>
<summary>19. What methods does System.Object provide and what are they for?</summary>

- `ToString()`: returns string representation of the object
- `Equals(object)`: determines equality with another object
- `GetHashCode()`: returns a hash code for hash-based collections
- `GetType()`: returns the runtime type of the object
- `MemberwiseClone()`: creates a shallow copy (protected)
- `Finalize()`: called by GC before object is collected (protected)
</details>

<details>
<summary>20. Why should you override GetHashCode when you override Equals?</summary>

- Objects that are equal must return the same hash code
- Hash-based collections (Dictionary, HashSet) use hash codes for lookups
- Violating this contract causes incorrect behavior in collections
- The hash code should be based on the same fields used in Equals
</details>

---

### Tuples

<details>
<summary>21. What are Tuples and what are the differences between System.Tuple and ValueTuple?</summary>

- `System.Tuple`: reference type, immutable, properties named Item1, Item2, etc.
- `ValueTuple`: value type, mutable, supports named elements
- ValueTuple syntax: `(int x, string y) = (1, "hello")`
- ValueTuple is preferred for better performance and readability
</details>

<details>
<summary>22. How do you use tuple deconstruction?</summary>

- `var (name, age) = GetPerson();` - deconstruct into new variables
- `(string name, int age) = GetPerson();` - with explicit types
- `(name, _) = GetPerson();` - using discards for unwanted values
- Custom classes can implement `Deconstruct` method
</details>

---

### Anonymous Types

<details>
<summary>23. What are anonymous types and when would you use them?</summary>

- Compiler-generated classes with read-only properties: `new { Name = "John", Age = 30 }`
- Type is inferred, cannot be named explicitly
- Useful for LINQ projections and temporary data groupings
- Limited to method scope; cannot be returned from methods (use tuples instead)
</details>

---

### Object Comparison

<details>
<summary>24. Explain the different ways to compare objects in C# (Equals, ==, IEquatable, IComparable).</summary>

- `==`: reference equality by default, can be overloaded for value semantics
- `Equals(object)`: virtual method from Object, can be overridden
- `IEquatable<T>`: strongly-typed equality, avoids boxing for value types
- `IComparable<T>`: ordering comparison, returns -1, 0, or 1
- `IEqualityComparer<T>`: external comparison logic for collections
</details>

<details>
<summary>25. What is ReferenceEquals and when would you use it?</summary>

- `ReferenceEquals(a, b)` checks if two references point to the same object
- Returns true only for same instance, never calls overloaded operators
- Useful when you need identity comparison regardless of Equals override
- Always returns false for value types (they are boxed first)
</details>

<details>
<summary>26. How do you implement IEquatable&lt;T&gt; correctly?</summary>

```csharp
public class Person : IEquatable<Person>
{
    public string Name { get; }
    public int Age { get; }
    
    public bool Equals(Person? other)
    {
        if (other is null) return false;
        return Name == other.Name && Age == other.Age;
    }
    
    public override bool Equals(object? obj) => Equals(obj as Person);
    
    public override int GetHashCode() => HashCode.Combine(Name, Age);
}
```
</details>

---

### Type Conversion

<details>
<summary>27. What are implicit and explicit type conversion operators?</summary>

- `implicit operator`: automatic conversion, no cast needed (safe conversions)
- `explicit operator`: requires cast syntax, may lose data
- Use implicit when conversion is always safe; explicit when data loss is possible

```csharp
public static implicit operator double(Temperature t) => t.Celsius;
public static explicit operator int(Temperature t) => (int)t.Celsius;
```
</details>

<details>
<summary>28. What is the difference between (Type), as, and is operators?</summary>

- `(Type)obj`: cast operator, throws InvalidCastException if fails
- `obj as Type`: returns null if cast fails (reference types only)
- `obj is Type`: returns bool, can use pattern matching
- `obj is Type variable`: combines check and assignment
</details>

---

### Working with Text

<details>
<summary>29. What is the difference between String and StringBuilder?</summary>

- `String` is immutable; each modification creates a new string
- `StringBuilder` is mutable; efficient for multiple concatenations
- Use StringBuilder when concatenating in loops or many operations
- String is interned; StringBuilder is not
</details>

<details>
<summary>30. Explain string interning in .NET.</summary>

- Compiler stores identical string literals in a shared pool
- `string.Intern()` adds strings to the pool at runtime
- `string.IsInterned()` checks if a string is in the pool
- Reduces memory for duplicate strings but prevents garbage collection
</details>

<details>
<summary>31. What are the common text encodings and how do you work with them?</summary>

- `UTF-8`: variable-length, ASCII-compatible, most common for web
- `UTF-16`: used internally by .NET strings (2 or 4 bytes per char)
- `ASCII`: 7-bit, English characters only
- Use `Encoding.UTF8.GetBytes(string)` and `Encoding.UTF8.GetString(bytes)`
</details>

<details>
<summary>32. What is Span&lt;T&gt; and how does it help with string manipulation?</summary>

- Stack-allocated view over contiguous memory (arrays, strings, native memory)
- `ReadOnlySpan<char>` for string slicing without allocations
- `string.AsSpan()` creates a span from a string
- Useful for parsing and high-performance string operations
</details>

</details>

---

<details>
<summary><strong>Object-Oriented Programming</strong></summary>

### Inheritance, Polymorphism, Encapsulation

<details>
<summary>33. Explain the four pillars of OOP.</summary>

- **Encapsulation**: hiding internal details, exposing only necessary interface
- **Abstraction**: representing complex systems with simplified models
- **Inheritance**: creating new classes based on existing ones
- **Polymorphism**: treating objects of different types through a common interface
</details>

<details>
<summary>34. What is the difference between virtual, override, and new keywords?</summary>

- `virtual`: allows a method to be overridden in derived classes
- `override`: provides a new implementation of a virtual method
- `new`: hides the base class method (breaks polymorphism)
</details>

<details>
<summary>35. What is the difference between an abstract class and an interface?</summary>

- Abstract class: can have implementation, single inheritance, can have state
- Interface: contract only (until C# 8.0), multiple inheritance, no state
- C# 8.0+ interfaces can have default implementations
</details>

<details>
<summary>36. When would you choose inheritance vs. composition?</summary>

- Inheritance: "is-a" relationship, shared behavior across hierarchy
- Composition: "has-a" relationship, more flexible, easier to change
- Prefer composition for better decoupling and testability
</details>

<details>
<summary>37. What are access modifiers in C# and what do they mean?</summary>

- `public`: accessible from anywhere
- `private`: accessible only within the same class
- `protected`: accessible within class and derived classes
- `internal`: accessible within the same assembly
- `protected internal`: accessible within assembly or derived classes
- `private protected`: accessible within class or derived classes in same assembly
</details>

<details>
<summary>38. What is method overloading vs. method overriding?</summary>

- Overloading: same name, different parameters (compile-time polymorphism)
- Overriding: same signature in derived class (runtime polymorphism)
</details>

<details>
<summary>39. What is explicit interface implementation and when would you use it?</summary>

- Implement interface members that are only accessible through the interface type
- Syntax: `void IInterface.Method() { }`
- Use when: implementing multiple interfaces with same member names
- Use when: hiding interface members from the class's public API
- Members are not visible when using the class type directly
</details>

</details>

---

<details>
<summary><strong>Delegates, Lambdas, and Events</strong></summary>

<details>
<summary>40. What is a delegate and how is it used?</summary>

- Type-safe function pointer that holds reference to a method
- Can point to instance or static methods with matching signature
- Supports multicast (multiple methods in invocation list)
- Built-in delegates: `Action<T>`, `Func<T, TResult>`, `Predicate<T>`
</details>

<details>
<summary>41. What is the difference between Func, Action, and Predicate?</summary>

- `Action<T>`: delegate that returns void, takes 0-16 parameters
- `Func<T, TResult>`: delegate that returns a value, takes 0-16 parameters
- `Predicate<T>`: delegate that takes T and returns bool
- `Predicate<T>` is equivalent to `Func<T, bool>`
</details>

<details>
<summary>42. What is a lambda expression and how does it relate to delegates?</summary>

- Concise syntax for anonymous methods: `(x, y) => x + y`
- Expression lambdas: `x => x * 2` (single expression)
- Statement lambdas: `x => { return x * 2; }` (code block)
- Can capture variables from enclosing scope (closures)
</details>

<details>
<summary>43. What are closures and what are their implications?</summary>

- Lambda captures variables from the enclosing scope by reference
- Captured variables are stored in a compiler-generated class
- Variable values are evaluated when the delegate is invoked, not when created
- Can cause unexpected behavior in loops; use local copy if needed
</details>

<details>
<summary>44. What is an event and how does it differ from a delegate?</summary>

- Events are a restricted wrapper around delegates
- Only the declaring class can invoke the event (raise)
- Subscribers can only add (+= ) or remove (-=) handlers
- Prevents external code from clearing all subscribers or invoking directly
</details>

<details>
<summary>45. How do you implement the standard event pattern?</summary>

```csharp
public class Publisher
{
    public event EventHandler<MyEventArgs>? MyEvent;
    
    protected virtual void OnMyEvent(MyEventArgs e)
    {
        MyEvent?.Invoke(this, e);
    }
}

public class MyEventArgs : EventArgs
{
    public string Message { get; init; }
}
```
</details>

</details>

---

<details>
<summary><strong>Collections and Data Structures</strong></summary>

### Arrays, Lists, Sets, Dictionaries

<details>
<summary>46. What are the main differences between Array, List, and LinkedList?</summary>

- Array: fixed size, fast index access O(1), memory efficient
- List&lt;T&gt;: dynamic size, fast index access O(1), append O(1) amortized
- LinkedList&lt;T&gt;: fast insert/remove O(1), slow index access O(n)
</details>

<details>
<summary>47. When would you use a HashSet&lt;T&gt; instead of a List&lt;T&gt;?</summary>

- HashSet: unique elements only, O(1) lookup/add/remove
- List: allows duplicates, O(n) for Contains/Remove
- Use HashSet when you need fast lookups and uniqueness
</details>

<details>
<summary>48. Explain the Dictionary&lt;TKey, TValue&gt; and how it works internally.</summary>

- Key-value pairs with O(1) average access time
- Uses hash codes to distribute entries into buckets
- Requires `GetHashCode()` and `Equals()` for custom key types
- Throws exception for duplicate keys (unlike `TryAdd`)
</details>

<details>
<summary>49. What is the difference between IEnumerable&lt;T&gt; and ICollection&lt;T&gt;?</summary>

- `IEnumerable<T>`: forward-only iteration, deferred execution
- `ICollection<T>`: adds Count, Add, Remove, Contains, Clear
- `IList<T>`: adds index-based access and Insert/RemoveAt
</details>

<details>
<summary>50. What is the difference between IEnumerable, ICollection, and IList?</summary>

- `IEnumerable`: read-only iteration
- `ICollection`: adds modification capabilities and count
- `IList`: adds indexed access and position-based operations
</details>

<details>
<summary>51. How do you choose the right collection type for your scenario?</summary>

- Need fast key lookup? → `Dictionary<K,V>`
- Need unique values? → `HashSet<T>`
- Need ordered unique values? → `SortedSet<T>`
- Need FIFO? → `Queue<T>`, LIFO? → `Stack<T>`
- Need random access by index? → `List<T>` or array
</details>

---

### Collection Expressions (C# 12)

<details>
<summary>52. What are collection expressions in C# 12?</summary>

- New syntax for creating collections: `[1, 2, 3]`
- Works with arrays, List, Span, and other collection types
- Spread operator `..` to include other collections: `[..existing, 4, 5]`
- Type is inferred from the target: `int[] arr = [1, 2, 3];`
</details>

<details>
<summary>53. How do spread elements work in collection expressions?</summary>

```csharp
int[] first = [1, 2, 3];
int[] second = [4, 5, 6];
int[] combined = [..first, ..second]; // [1, 2, 3, 4, 5, 6]

List<int> list = [..first, 10, ..second];
```
- Spread (`..`) inlines elements from another collection
- Can mix spread elements with individual elements
</details>

</details>

---

<details>
<summary><strong>IEnumerable and Iterators</strong></summary>

<details>
<summary>54. How does foreach work internally?</summary>

- Calls `GetEnumerator()` on the collection
- Repeatedly calls `MoveNext()` and accesses `Current` property
- Disposes the enumerator when done (if IDisposable)
- Equivalent to a while loop with the enumerator
</details>

<details>
<summary>55. What is yield return and how does it work?</summary>

- Creates a state machine that generates values on demand
- Method execution pauses at `yield return` and resumes on next iteration
- `yield break` exits the iterator early
- Enables lazy evaluation without implementing IEnumerator manually
</details>

<details>
<summary>56. What is deferred (lazy) execution and why is it important?</summary>

- Query is not executed until the results are enumerated
- Allows query composition without intermediate allocations
- Multiple enumerations execute the query multiple times
- Use `ToList()` or `ToArray()` to materialize results once
</details>

<details>
<summary>57. How do you implement a custom iterator?</summary>

```csharp
public IEnumerable<int> GetEvenNumbers(int max)
{
    for (int i = 0; i <= max; i += 2)
    {
        yield return i;
    }
}

// Or implement IEnumerator<T> manually for more control
```
</details>

<details>
<summary>58. What are the differences between IEnumerable&lt;T&gt; and IEnumerator&lt;T&gt;?</summary>

- `IEnumerable<T>`: represents a collection that can be enumerated (has GetEnumerator)
- `IEnumerator<T>`: represents the iteration state (Current, MoveNext, Reset)
- IEnumerable is the "factory" for IEnumerator instances
- Multiple enumerators can iterate the same collection independently
</details>

</details>

---

<details>
<summary><strong>LINQ</strong></summary>

### LINQ to Objects Basics

<details>
<summary>59. What is LINQ and what problems does it solve?</summary>

- Language Integrated Query: unified query syntax for different data sources
- Provides type-safe, compile-time checked queries
- Works with objects, databases, XML, and more
- Reduces boilerplate code for filtering, sorting, and transforming data
</details>

<details>
<summary>60. What is the difference between deferred and immediate execution in LINQ?</summary>

- Deferred: query is not executed until you iterate (`Select`, `Where`, `OrderBy`)
- Immediate: query executes immediately (`ToList`, `ToArray`, `Count`, `First`)
- Deferred allows query composition and works with streaming data
</details>

<details>
<summary>61. What is the difference between Select and SelectMany?</summary>

- `Select`: one-to-one projection (transforms each element)
- `SelectMany`: one-to-many projection (flattens nested collections)
- Example: extracting all items from a list of orders
</details>

<details>
<summary>62. Explain the difference between First, FirstOrDefault, Single, and SingleOrDefault.</summary>

- `First`: first element, throws if empty
- `FirstOrDefault`: first element or default if empty
- `Single`: exactly one element, throws if empty or multiple
- `SingleOrDefault`: one element or default, throws if multiple
</details>

<details>
<summary>63. What is the difference between query syntax and method syntax in LINQ?</summary>

- Query syntax: SQL-like (`from x in collection where x > 5 select x`)
- Method syntax: extension methods (`collection.Where(x => x > 5)`)
- Both compile to the same IL; method syntax is more flexible
</details>

<details>
<summary>64. What is the purpose of GroupBy in LINQ?</summary>

- Groups elements by a key into `IGrouping<TKey, TElement>`
- Each group is a collection of elements sharing the same key
- Useful for aggregations and hierarchical data
</details>

---

### Advanced LINQ

<details>
<summary>65. How does LINQ work internally?</summary>

- Extension methods on IEnumerable&lt;T&gt; that return IEnumerable&lt;T&gt;
- Methods use `yield return` for deferred execution
- Query expressions are compiled to method calls
- Expression trees (IQueryable) for translatable queries
</details>

<details>
<summary>66. What is the difference between IEnumerable and IQueryable?</summary>

- `IEnumerable<T>`: in-memory, executes in CLR using delegates
- `IQueryable<T>`: out-of-process, uses expression trees for translation
- IQueryable extends IEnumerable with query translation capabilities
- LINQ to SQL/EF uses IQueryable to generate SQL from expressions
</details>

<details>
<summary>67. How do you implement a custom LINQ extension method?</summary>

```csharp
public static class LinqExtensions
{
    public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T?> source) 
        where T : class
    {
        foreach (var item in source)
        {
            if (item is not null)
                yield return item;
        }
    }
    
    public static IEnumerable<T> DistinctBy<T, TKey>(
        this IEnumerable<T> source,
        Func<T, TKey> keySelector)
    {
        var seen = new HashSet<TKey>();
        foreach (var element in source)
        {
            if (seen.Add(keySelector(element)))
                yield return element;
        }
    }
}
```
</details>

<details>
<summary>68. What are expression trees and when would you use them?</summary>

- Data structure representing code as objects (not executable code)
- `Expression<Func<T, bool>>` vs `Func<T, bool>`
- Can be analyzed, modified, and compiled at runtime
- Used by LINQ providers (EF, LINQ to SQL) to translate to SQL
</details>

</details>

---

<details>
<summary><strong>Resource Management</strong></summary>

### Using, IDisposable, Try-Catch-Finally

<details>
<summary>69. What is IDisposable and why is it important?</summary>

- Interface for releasing unmanaged resources (files, connections, handles)
- Garbage collector doesn't handle unmanaged resources automatically
- Provides deterministic cleanup at a known point in time
</details>

<details>
<summary>70. How does the using statement work?</summary>

- Ensures `Dispose()` is called even if an exception occurs
- Syntactic sugar for try-finally block
- C# 8.0 introduced `using` declaration (disposes at end of scope)
</details>

<details>
<summary>71. What is the dispose pattern and how do you implement it correctly?</summary>

```csharp
public class ResourceHolder : IDisposable
{
    private bool _disposed = false;
    private IntPtr _unmanagedResource;
    private ManagedResource? _managedResource;

    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (_disposed) return;
        
        if (disposing)
        {
            // Dispose managed resources
            _managedResource?.Dispose();
        }
        
        // Free unmanaged resources
        if (_unmanagedResource != IntPtr.Zero)
        {
            // Release unmanaged resource
            _unmanagedResource = IntPtr.Zero;
        }
        
        _disposed = true;
    }

    ~ResourceHolder() => Dispose(false);
}
```
</details>

<details>
<summary>72. What is the difference between Dispose and Finalize?</summary>

- `Dispose`: called explicitly or via `using`, deterministic
- `Finalize` (destructor): called by GC, non-deterministic, performance cost
- Prefer `Dispose`; use finalizer only as a safety net
</details>

<details>
<summary>73. What is IAsyncDisposable and when should you use it?</summary>

- Interface for async cleanup: `ValueTask DisposeAsync()`
- Use with `await using` statement
- Required when Dispose involves async operations (flushing buffers, closing network connections)
- Implement both IDisposable and IAsyncDisposable for flexibility
</details>

---

### Exception Handling

<details>
<summary>74. Explain try, catch, and finally blocks.</summary>

- `try`: contains code that might throw exceptions
- `catch`: handles specific exceptions, can have multiple blocks
- `finally`: always executes for cleanup, regardless of exceptions
</details>

<details>
<summary>75. What happens if an exception is thrown in a finally block?</summary>

- The new exception replaces any exception from try/catch
- Original exception is lost (unless explicitly preserved)
- Avoid throwing from finally blocks
</details>

<details>
<summary>76. What are exception filters (when clause) and when would you use them?</summary>

- `catch (Exception ex) when (ex.Message.Contains("timeout"))`
- Allows conditional catching without unwinding the stack
- Useful for logging without catching, or handling specific error codes
</details>

<details>
<summary>77. What is the difference between throw and throw ex?</summary>

- `throw;` preserves the original stack trace
- `throw ex;` resets the stack trace to the current location
- Always use `throw;` to rethrow to preserve debugging information
</details>

<details>
<summary>78. What are custom exceptions and when should you create them?</summary>

- Derive from Exception (or more specific base like InvalidOperationException)
- Create when you need domain-specific exception types
- Include standard constructors (default, message, inner exception)
- Add custom properties for additional context
</details>

</details>

---

<details>
<summary><strong>Pattern Matching and Deconstruction</strong></summary>

<details>
<summary>79. What pattern types are available in C#?</summary>

- **Type pattern**: `x is string s`
- **Constant pattern**: `x is null`, `x is 42`
- **Relational pattern**: `x is > 0 and < 100`
- **Logical pattern**: `x is not null`, `x is 1 or 2 or 3`
- **Property pattern**: `x is { Length: > 0 }`
- **Positional pattern**: `x is (0, 0)`
- **List pattern**: `x is [1, 2, ..]`
</details>

<details>
<summary>80. How do you use pattern matching in switch expressions?</summary>

```csharp
string GetDescription(object obj) => obj switch
{
    null => "Nothing",
    int n when n < 0 => "Negative number",
    int n => $"Number: {n}",
    string { Length: 0 } => "Empty string",
    string s => $"String: {s}",
    IEnumerable<int> nums => $"Count: {nums.Count()}",
    _ => "Unknown"
};
```
</details>

<details>
<summary>81. What is deconstruction and how do you implement it for custom types?</summary>

```csharp
public class Person
{
    public string Name { get; init; }
    public int Age { get; init; }
    
    public void Deconstruct(out string name, out int age)
    {
        name = Name;
        age = Age;
    }
}

// Usage
var person = new Person { Name = "Alice", Age = 30 };
var (name, age) = person;
```
</details>

<details>
<summary>82. What are list patterns (C# 11)?</summary>

```csharp
int[] numbers = [1, 2, 3, 4, 5];

var result = numbers switch
{
    [] => "Empty",
    [var single] => $"Single: {single}",
    [var first, ..] => $"First: {first}",
    [.., var last] => $"Last: {last}",
    [var first, .. var middle, var last] => $"First: {first}, Last: {last}"
};
```
</details>

</details>

---

<details>
<summary><strong>Garbage Collection</strong></summary>

<details>
<summary>83. How does garbage collection work in .NET?</summary>

- Automatic memory management for managed heap
- Uses generational collection (Gen 0, 1, 2) for efficiency
- Gen 0: short-lived objects, collected frequently
- Gen 2: long-lived objects, collected less often
- Large Object Heap (LOH) for objects > 85KB
</details>

<details>
<summary>84. What are the different generations in GC?</summary>

- **Generation 0**: newly allocated objects, collected most frequently
- **Generation 1**: survived one collection, buffer between Gen 0 and Gen 2
- **Generation 2**: long-lived objects, collected during full GC
- Objects that survive a collection are promoted to the next generation
</details>

<details>
<summary>85. What is the Large Object Heap (LOH)?</summary>

- Stores objects >= 85KB (configurable in modern .NET)
- Not compacted by default (can be enabled)
- Collected only during Gen 2 collections
- Can cause fragmentation; use ArrayPool for large arrays
</details>

<details>
<summary>86. How can you optimize for garbage collection?</summary>

- Reduce allocations: use structs, Span&lt;T&gt;, stackalloc, ArrayPool
- Avoid boxing (use generics)
- Pool frequently created objects
- Avoid finalizers when possible
- Use `GC.Collect()` sparingly (almost never in production)
</details>

<details>
<summary>87. What are weak references and when would you use them?</summary>

- `WeakReference<T>` holds a reference that doesn't prevent GC
- Use for caches where objects can be recreated if needed
- `TryGetTarget(out T target)` to check if object is still alive
- Useful for observer patterns to avoid memory leaks
</details>

</details>

---

<details>
<summary><strong>CLR Basics and Assemblies</strong></summary>

<details>
<summary>88. What is the CLR and what does it do?</summary>

- Common Language Runtime: execution engine for .NET
- Provides: memory management (GC), type safety, exception handling
- JIT compilation: converts IL to native code at runtime
- Security, thread management, and interop services
</details>

<details>
<summary>89. What is an assembly and what does it contain?</summary>

- Unit of deployment, versioning, and security in .NET
- Contains: IL code, metadata, manifest, resources
- Types: EXE (entry point) or DLL (library)
- Can be signed with strong name for identity and versioning
</details>

<details>
<summary>90. What is the assembly manifest?</summary>

- Describes the assembly: name, version, culture, public key
- Lists all files in the assembly
- Contains type references and dependencies on other assemblies
- Defines permissions and security requirements
</details>

<details>
<summary>91. How does assembly resolution work?</summary>

- CLR searches in order: GAC, application base, probing paths
- Version binding: exact match by default, can redirect with config
- Fusion log viewer helps debug loading failures
- `AssemblyResolve` event for custom resolution
</details>

<details>
<summary>92. What is the difference between strong-named and regular assemblies?</summary>

- Strong-named: signed with public/private key pair
- Has unique identity (name + version + culture + public key token)
- Required for GAC installation
- Helps prevent assembly spoofing
</details>

</details>

---

<details>
<summary><strong>Method Arguments (ref, out, in)</strong></summary>

<details>
<summary>93. What is the difference between ref, out, and in parameters?</summary>

- `ref`: pass by reference, must be initialized before call
- `out`: pass by reference, must be assigned inside the method
- `in`: pass by reference, readonly (cannot modify)
- All avoid copying for value types
</details>

<details>
<summary>94. When should you use each parameter modifier?</summary>

- `ref`: when method needs to read and modify the caller's variable
- `out`: when method returns multiple values (like TryParse pattern)
- `in`: when passing large structs to avoid copying (performance optimization)
- Default (none): for most cases, especially reference types
</details>

<details>
<summary>95. What is ref return and ref local?</summary>

```csharp
public ref int GetElement(int[] array, int index)
{
    return ref array[index];  // Returns reference, not copy
}

ref int element = ref GetElement(myArray, 5);
element = 100;  // Modifies array directly
```
- Allows returning references to avoid copying
- Useful for high-performance scenarios with large structs
</details>

</details>

---

<details>
<summary><strong>Generics In Depth</strong></summary>

<details>
<summary>96. Explain covariance, contravariance, and invariance with examples.</summary>

- **Covariance** (`out T`): can use more derived type
  ```csharp
  IEnumerable<Animal> animals = new List<Dog>(); // Dog derives from Animal
  ```
- **Contravariance** (`in T`): can use less derived type
  ```csharp
  Action<Dog> dogAction = (Animal a) => { }; // Can treat Dog as Animal
  ```
- **Invariance**: must use exact type (default for generic classes)
  ```csharp
  List<Animal> animals = new List<Dog>(); // Compile error
  ```
</details>

<details>
<summary>97. Why doesn't List&lt;T&gt; support covariance?</summary>

- List&lt;T&gt; is mutable (you can Add elements)
- If allowed: `List<Animal> animals = new List<Dog>();`
- You could add a Cat: `animals.Add(new Cat());`
- This would corrupt the List&lt;Dog&gt; with a Cat
- Covariance only works for "read-only" interfaces like IEnumerable
</details>

<details>
<summary>98. What happens with generics at runtime (reification)?</summary>

- .NET uses reified generics: type information is preserved at runtime
- Each closed generic type (List&lt;int&gt;, List&lt;string&gt;) is distinct
- JIT generates specialized code for value types
- Contrast with Java's type erasure where generics are compile-time only
</details>

</details>

---

<details>
<summary><strong>Immutable Structures</strong></summary>

<details>
<summary>99. What is immutability and why is it beneficial?</summary>

- Object state cannot be changed after creation
- Benefits: thread-safety, predictability, easier reasoning
- Enables safe sharing without defensive copying
- Prevents accidental state corruption
</details>

<details>
<summary>100. How do you create immutable types in C#?</summary>

- Use `readonly` fields and `init`-only properties
- Use records: `public record Person(string Name, int Age);`
- Return new instances instead of modifying state
- Use immutable collections: `ImmutableList<T>`, `ImmutableDictionary<TKey, TValue>`
</details>

<details>
<summary>101. What are records and how do they support immutability?</summary>

- `record` keyword creates immutable reference types by default
- `record struct` for value type records
- Automatic: Equals, GetHashCode, ToString, Deconstruct
- `with` expressions for non-destructive mutation: `person with { Age = 31 }`
</details>

<details>
<summary>102. What are the immutable collection types in System.Collections.Immutable?</summary>

- `ImmutableArray<T>`: fast random access, most efficient for read-heavy
- `ImmutableList<T>`: efficient insertions and removals
- `ImmutableDictionary<TKey, TValue>`: immutable key-value pairs
- `ImmutableHashSet<T>`: immutable unique elements
- Builder pattern for efficient batch modifications
</details>

</details>

---

<details>
<summary><strong>Streams</strong></summary>

<details>
<summary>103. What is the Stream class and its purpose?</summary>

- Abstract base class for reading/writing bytes
- Provides unified API for files, memory, network, etc.
- Key methods: Read, Write, Seek, Flush, Close
- Properties: CanRead, CanWrite, CanSeek, Length, Position
</details>

<details>
<summary>104. What are the common Stream implementations?</summary>

- `FileStream`: read/write files
- `MemoryStream`: in-memory byte buffer
- `NetworkStream`: network socket communication
- `BufferedStream`: adds buffering to any stream
- `GZipStream`, `DeflateStream`: compression/decompression
</details>

<details>
<summary>105. What are StreamReader and StreamWriter?</summary>

- `StreamReader`: reads characters from a byte stream (handles encoding)
- `StreamWriter`: writes characters to a byte stream
- Higher-level than Stream (text vs bytes)
- ReadLine, ReadToEnd, WriteLine for text operations
</details>

<details>
<summary>106. How do async stream operations work?</summary>

```csharp
await using var stream = new FileStream("file.txt", FileMode.Open, 
    FileAccess.Read, FileShare.Read, bufferSize: 4096, useAsync: true);
    
byte[] buffer = new byte[1024];
int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);

// Or with Memory<T>
bytesRead = await stream.ReadAsync(buffer.AsMemory());
```
</details>

</details>

---

<details>
<summary><strong>Multi-Threading Basics</strong></summary>

### Thread and TPL

<details>
<summary>107. What is a Thread and how do you create one?</summary>

```csharp
Thread thread = new Thread(() => 
{
    Console.WriteLine("Running on new thread");
});
thread.Start();
thread.Join(); // Wait for completion
```
- Lowest level threading primitive
- Prefer Task or ThreadPool for most scenarios
- Threads are expensive to create (~1MB stack)
</details>

<details>
<summary>108. What is the ThreadPool and why should you use it?</summary>

- Pool of pre-created worker threads managed by .NET
- Avoids overhead of creating/destroying threads
- `ThreadPool.QueueUserWorkItem(work)` or use `Task.Run()`
- Automatically grows/shrinks based on demand
</details>

<details>
<summary>109. What is the Task Parallel Library (TPL)?</summary>

- Higher-level abstraction over threads since .NET 4.0
- `Task` represents an asynchronous operation
- `Task<T>` returns a result
- Provides continuations, exception handling, cancellation
- Forms the foundation for async/await
</details>

<details>
<summary>110. What is AggregateException and when does it occur?</summary>

- Container for multiple exceptions from parallel operations
- Thrown by: `Task.Wait()`, `Task.Result`, `Task.WaitAll()`, `Parallel.ForEach`
- Flatten nested AggregateExceptions with `.Flatten()`
- Handle with `.Handle(ex => ...)` for selective handling
</details>

---

### Basic Synchronization Primitives

<details>
<summary>111. What is lock and how does it work?</summary>

```csharp
private readonly object _lock = new object();

lock (_lock)
{
    // Only one thread can execute this at a time
    _counter++;
}
```
- Syntactic sugar for Monitor.Enter/Exit
- Ensures mutual exclusion
- Lock on private object, never on `this` or public objects
</details>

<details>
<summary>112. What is the difference between Monitor and lock?</summary>

- `lock` is syntactic sugar for `Monitor.Enter`/`Monitor.Exit` with try/finally
- Monitor provides additional methods: `TryEnter` (with timeout), `Wait`, `Pulse`
- Use Monitor directly when you need timeout or signaling
</details>

<details>
<summary>113. What is the difference between Mutex and Semaphore?</summary>

- `Mutex`: exclusive access (only one thread), can be named for cross-process
- `Semaphore`: limits concurrent access to N threads
- `SemaphoreSlim`: lightweight, async-compatible, single process only
- Mutex is owned by a thread; Semaphore is not
</details>

<details>
<summary>114. What are concurrent collections and when should you use them?</summary>

- `ConcurrentDictionary<TKey, TValue>`: thread-safe dictionary
- `ConcurrentQueue<T>`, `ConcurrentStack<T>`: thread-safe FIFO/LIFO
- `ConcurrentBag<T>`: thread-safe unordered collection
- `BlockingCollection<T>`: producer-consumer scenarios
- Use when multiple threads access the same collection
</details>

</details>

---

<details>
<summary><strong>Advanced Multi-Threading</strong></summary>

### Advanced Synchronization

<details>
<summary>115. Explain ManualResetEvent and AutoResetEvent.</summary>

- Both are signaling primitives for thread coordination
- `ManualResetEvent`: stays signaled until manually reset; all waiting threads proceed
- `AutoResetEvent`: automatically resets after releasing one thread
- Methods: `Set()`, `Reset()`, `WaitOne()`
- Use Slim variants (`ManualResetEventSlim`) for better performance
</details>

<details>
<summary>116. What is ReaderWriterLock and when would you use it?</summary>

- Allows multiple readers OR one writer
- `ReaderWriterLockSlim` is the preferred modern version
- Use when reads are far more frequent than writes
- Methods: `EnterReadLock()`, `EnterWriteLock()`, `ExitReadLock()`, `ExitWriteLock()`
</details>

<details>
<summary>117. What is Interlocked and when should you use it?</summary>

```csharp
Interlocked.Increment(ref counter);
Interlocked.Add(ref total, value);
Interlocked.Exchange(ref location, newValue);
Interlocked.CompareExchange(ref location, newValue, comparand);
```
- Atomic operations without locks
- More efficient than lock for simple operations
- Works on int, long, float, double, object references
</details>

<details>
<summary>118. What is the volatile keyword?</summary>

- Ensures reads/writes are not reordered by compiler or CPU
- Every read gets the latest value; every write is immediately visible
- Does NOT provide atomicity for compound operations
- Use `Interlocked` or `lock` for thread-safe modifications
</details>

---

### Async/Await In Depth

<details>
<summary>119. What is the purpose of async and await keywords?</summary>

- Enable asynchronous programming with synchronous-looking code
- `async` marks a method as asynchronous
- `await` suspends execution until the awaited task completes
- Prevent blocking the calling thread
</details>

<details>
<summary>120. What is the difference between Task and Task&lt;T&gt;?</summary>

- `Task`: represents an async operation with no return value
- `Task<T>`: represents an async operation returning a value of type T
- `ValueTask<T>`: stack-allocated alternative for sync completion scenarios
</details>

<details>
<summary>121. What happens when you await a Task?</summary>

- Control returns to the caller immediately
- The rest of the method is registered as a continuation
- When the task completes, the continuation executes
- By default, continues on the original synchronization context
</details>

<details>
<summary>122. What is ConfigureAwait(false) and when should you use it?</summary>

- Configures whether to capture and return to the synchronization context
- `ConfigureAwait(false)`: doesn't capture context, better for library code
- Use in library code to avoid deadlocks and improve performance
</details>

<details>
<summary>123. What are common pitfalls with async/await?</summary>

- Blocking on async code (`.Result` or `.Wait()`) causing deadlocks
- Async void methods (only valid for event handlers)
- Not awaiting tasks (fire and forget without exception handling)
- Mixing sync and async code incorrectly
</details>

---

### Task Cancellation

<details>
<summary>124. How does CancellationToken work?</summary>

```csharp
var cts = new CancellationTokenSource();
var token = cts.Token;

// In async method
async Task DoWorkAsync(CancellationToken cancellationToken)
{
    while (!cancellationToken.IsCancellationRequested)
    {
        await Task.Delay(100, cancellationToken);
        // Do work
    }
}

// To cancel
cts.Cancel();
```
</details>

<details>
<summary>125. What is the difference between IsCancellationRequested and ThrowIfCancellationRequested?</summary>

- `IsCancellationRequested`: returns bool, allows graceful cleanup
- `ThrowIfCancellationRequested()`: throws OperationCanceledException if cancelled
- Use throw for immediate cancellation; check for graceful completion
</details>

---

### TaskCompletionSource

<details>
<summary>126. What is TaskCompletionSource and when would you use it?</summary>

```csharp
public Task<int> WrapCallbackAsTask()
{
    var tcs = new TaskCompletionSource<int>();
    
    SomeApiWithCallback(result => tcs.SetResult(result),
                        error => tcs.SetException(error));
    
    return tcs.Task;
}
```
- Creates a Task that you control manually
- Bridge callback-based APIs to Task-based async
- Methods: SetResult, SetException, SetCanceled
</details>

---

### SynchronizationContext

<details>
<summary>127. What is SynchronizationContext and why does it matter?</summary>

- Abstraction for posting work to a specific context (UI thread, ASP.NET request)
- `Post()`: async execution, `Send()`: sync execution
- Captured by `await` by default (unless ConfigureAwait(false))
- WinForms/WPF have UI synchronization contexts
- ASP.NET Core has no synchronization context (simpler async)
</details>

<details>
<summary>128. Why can blocking on async code cause deadlocks?</summary>

- UI thread calls `.Result` and blocks waiting for task
- Task completes and tries to continue on UI thread (captured context)
- UI thread is blocked, so continuation can never run
- Deadlock: both waiting for each other
- Solution: use `await` instead, or `ConfigureAwait(false)` in library code
</details>

</details>

---

<details>
<summary><strong>Interop with Unmanaged Code</strong></summary>

<details>
<summary>129. What is P/Invoke and how do you use it?</summary>

```csharp
using System.Runtime.InteropServices;

public class NativeMethods
{
    [DllImport("user32.dll", CharSet = CharSet.Unicode)]
    public static extern int MessageBox(IntPtr hWnd, string text, 
                                         string caption, uint type);
    
    [DllImport("kernel32.dll")]
    public static extern bool Beep(uint frequency, uint duration);
}

// Usage
NativeMethods.MessageBox(IntPtr.Zero, "Hello", "Title", 0);
```
</details>

<details>
<summary>130. What marshaling options are available for P/Invoke?</summary>

- `[MarshalAs]` attribute controls type conversion
- `CharSet`: ANSI, Unicode, Auto for strings
- `LayoutKind`: Sequential, Explicit for struct layout
- `In`, `Out` attributes for parameter direction
- `SafeHandle` for proper resource cleanup
</details>

<details>
<summary>131. What are SafeHandle and IntPtr?</summary>

- `IntPtr`: raw pointer, no automatic cleanup
- `SafeHandle`: wraps native handle with Dispose pattern
- SafeHandle ensures cleanup even if exception occurs
- Use SafeHandle for handles that need to be freed
</details>

</details>

---

<details>
<summary><strong>Dynamic Typing</strong></summary>

<details>
<summary>132. What is the dynamic keyword in C#?</summary>

- Bypasses compile-time type checking
- Type resolution happens at runtime using DLR
- Useful for: COM interop, reflection-heavy code, dynamic languages
- No IntelliSense; runtime errors instead of compile errors
</details>

<details>
<summary>133. What is the difference between dynamic and object?</summary>

- `object`: compile-time type checking, requires casting
- `dynamic`: runtime type checking, no casting needed
- `object` operations are limited to Object methods
- `dynamic` allows any operation (resolved at runtime)
</details>

<details>
<summary>134. When should you avoid using dynamic?</summary>

- When static typing is possible (most cases)
- Performance-critical code (runtime overhead)
- When you need compile-time safety
- In library APIs (consumers lose type safety)
- Valid uses: COM interop, reflection, dynamic JSON
</details>

<details>
<summary>135. What is ExpandoObject?</summary>

```csharp
dynamic expando = new ExpandoObject();
expando.Name = "John";
expando.Age = 30;
expando.SayHello = (Action)(() => Console.WriteLine($"Hello, {expando.Name}!"));

expando.SayHello();

// Can be treated as dictionary
var dict = (IDictionary<string, object>)expando;
foreach (var kvp in dict)
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
```
</details>

</details>

---

<details>
<summary><strong>Reflection</strong></summary>

<details>
<summary>136. What is reflection and what can you do with it?</summary>

- Inspect and manipulate types, methods, properties at runtime
- Get type information: `typeof(T)`, `obj.GetType()`
- Create instances, invoke methods, access properties dynamically
- Read custom attributes
- Use cases: serialization, dependency injection, testing frameworks
</details>

<details>
<summary>137. How do you find types implementing an interface in an assembly?</summary>

```csharp
var assembly = Assembly.GetExecutingAssembly();
// Or: Assembly.Load("AssemblyName");

var types = assembly.GetTypes()
    .Where(t => typeof(IMyInterface).IsAssignableFrom(t) 
                && !t.IsInterface 
                && !t.IsAbstract);

foreach (var type in types)
{
    Console.WriteLine(type.Name);
}
```
</details>

<details>
<summary>138. How do you instantiate an object of a type using reflection?</summary>

```csharp
// With parameterless constructor
var instance = Activator.CreateInstance(type);

// With constructor parameters
var instance = Activator.CreateInstance(type, new object[] { arg1, arg2 });

// Generic version
var instance = Activator.CreateInstance<MyClass>();

// Using ConstructorInfo for more control
var ctor = type.GetConstructor(new[] { typeof(string), typeof(int) });
var instance = ctor?.Invoke(new object[] { "hello", 42 });
```
</details>

<details>
<summary>139. How do you invoke a method marked with an attribute?</summary>

```csharp
[AttributeUsage(AttributeTargets.Method)]
public class RunOnStartupAttribute : Attribute { }

// Find and invoke methods with the attribute
var methods = type.GetMethods()
    .Where(m => m.GetCustomAttribute<RunOnStartupAttribute>() != null);

foreach (var method in methods)
{
    if (method.IsStatic)
        method.Invoke(null, null);
    else
        method.Invoke(instance, null);
}
```
</details>

<details>
<summary>140. What are the performance implications of reflection?</summary>

- Significantly slower than direct calls (10-100x)
- No compile-time checking (runtime errors)
- Strategies to improve:
  - Cache MethodInfo, PropertyInfo objects
  - Use compiled expressions or delegates
  - Consider source generators for compile-time reflection
  - Use generic constraints when possible
</details>

<details>
<summary>141. What are source generators and how do they relate to reflection?</summary>

- Compile-time code generation (no runtime overhead)
- Analyze code and generate additional C# source
- Alternative to reflection for serialization, DI, validation
- Examples: System.Text.Json, logging generators
- Provides performance of hand-written code with metaprogramming benefits
</details>

</details>
