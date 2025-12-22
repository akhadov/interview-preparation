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

---

<details>
<summary><strong>Entity Framework</strong></summary>

### Entity Framework Basics

<details>
<summary>142. What is Entity Framework and what problems does it solve?</summary>

- Object-Relational Mapper (ORM) for .NET
- Maps database tables to C# classes and vice versa
- Eliminates manual SQL writing for CRUD operations
- Provides LINQ support for type-safe queries
- Handles connection management, transactions, and change tracking
</details>

<details>
<summary>143. What is the difference between Fluent API and Data Annotations?</summary>

- **Data Annotations**: attributes on entity classes/properties
  ```csharp
  [Table("Products")]
  public class Product
  {
      [Key]
      public int Id { get; set; }
      
      [Required]
      [MaxLength(100)]
      public string Name { get; set; }
  }
  ```
- **Fluent API**: configuration in `OnModelCreating` method
  ```csharp
  modelBuilder.Entity<Product>(entity =>
  {
      entity.ToTable("Products");
      entity.HasKey(p => p.Id);
      entity.Property(p => p.Name)
            .IsRequired()
            .HasMaxLength(100);
  });
  ```
- Fluent API has higher precedence and more configuration options
- Data Annotations are simpler but less flexible
</details>

<details>
<summary>144. When would you choose Fluent API over Data Annotations?</summary>

- Complex configurations not supported by annotations (e.g., composite keys, table splitting)
- Keep domain models clean (no EF dependencies)
- Configure relationships with cascading deletes
- Set up indexes, sequences, or database-specific features
- Apply configurations conditionally or from external sources
</details>

---

### Migrations

<details>
<summary>145. What are EF Migrations and why are they important?</summary>

- Track and apply database schema changes incrementally
- Generate SQL scripts from model changes
- Enable version control of database schema
- Support both upgrading and downgrading database versions
- Commands: `Add-Migration`, `Update-Database`, `Remove-Migration`
</details>

<details>
<summary>146. How do you apply migrations in production?</summary>

- **Script generation**: `Script-Migration` to generate SQL scripts for DBA review
- **Bundle**: `dotnet ef migrations bundle` creates executable for deployment
- **Programmatic**: `context.Database.Migrate()` (use cautiously)
- Never use `Update-Database` directly in production
- Always backup database before applying migrations
</details>

---

### Data Seeding

<details>
<summary>147. What is Data Seeding in Entity Framework?</summary>

- Populate database with initial/default data
- Configured in `OnModelCreating` using `HasData()`
  ```csharp
  modelBuilder.Entity<Category>().HasData(
      new Category { Id = 1, Name = "Electronics" },
      new Category { Id = 2, Name = "Clothing" }
  );
  ```
- Data is part of migrations (reproducible)
- Primary keys must be explicitly specified
- Updates to seeded data create new migrations
</details>

<details>
<summary>148. What are the limitations of HasData seeding?</summary>

- Requires explicit primary key values
- Cannot use navigation properties directly
- Limited to simple scenarios (no computed values)
- Alternatives for complex seeding:
  - Custom initialization logic in startup
  - SQL scripts in migrations
  - `DbContext.SaveChanges()` in seed method
</details>

---

### Supported Approaches

<details>
<summary>149. What is Code-First approach in Entity Framework?</summary>

- Define C# classes first, database is generated from them
- Use migrations to evolve database schema
- Domain model is the source of truth
- Benefits: version control, clean domain models, rapid development
- Best for new projects or when you control the database
</details>

<details>
<summary>150. What is Database-First approach in Entity Framework?</summary>

- Start with existing database, generate C# classes from it
- Use `Scaffold-DbContext` command for reverse engineering
- Database schema is the source of truth
- Benefits: work with legacy databases, DBA-controlled schemas
- Regeneration needed when database changes
</details>

<details>
<summary>151. How do you choose between Code-First and Database-First?</summary>

- **Code-First**: greenfield projects, full control over schema, agile development
- **Database-First**: existing databases, DBA-managed schemas, complex stored procedures
- **Model-First** (legacy): visual designer, less common in EF Core
- Consider team expertise and organizational policies
</details>

---

### IQueryable vs IEnumerable

<details>
<summary>152. What is the difference between IQueryable and IEnumerable in EF?</summary>

- `IQueryable<T>`: query translated to SQL, executed on database
- `IEnumerable<T>`: data loaded into memory, filtering done in C#
  ```csharp
  // IQueryable - SQL: SELECT * FROM Products WHERE Price > 100
  var expensive = context.Products.Where(p => p.Price > 100);
  
  // IEnumerable - loads ALL products, then filters in memory
  IEnumerable<Product> products = context.Products;
  var expensive = products.Where(p => p.Price > 100);
  ```
- Always prefer `IQueryable` for database queries
- `AsEnumerable()` or `ToList()` switches to client evaluation
</details>

<details>
<summary>153. When would you intentionally use client-side evaluation?</summary>

- When using C# methods not translatable to SQL
- Complex string manipulations or custom logic
- Working with in-memory cached data
- Use `AsEnumerable()` at the point where client evaluation is needed
- EF Core throws exception for untranslatable queries by default
</details>

---

### Loading Related Entities

<details>
<summary>154. What is Eager Loading and how do you use it?</summary>

- Load related entities in a single query using `Include()`
  ```csharp
  var orders = context.Orders
      .Include(o => o.Customer)
      .Include(o => o.OrderItems)
          .ThenInclude(oi => oi.Product)
      .ToList();
  ```
- Generates JOINs in SQL
- Best when you know you'll need related data
- Can lead to large result sets (Cartesian explosion)
</details>

<details>
<summary>155. What is Lazy Loading and what are its pros/cons?</summary>

- Related entities loaded on first access
- Requires: virtual navigation properties + proxies or `ILazyLoader`
  ```csharp
  public virtual ICollection<Order> Orders { get; set; }
  ```
- **Pros**: simple, loads only what's accessed
- **Cons**: N+1 query problem, unexpected database calls
- Must be explicitly enabled in EF Core
</details>

<details>
<summary>156. What is Explicit Loading?</summary>

- Manually load related entities on demand
  ```csharp
  var order = context.Orders.Find(1);
  
  // Load related entities explicitly
  context.Entry(order)
      .Collection(o => o.OrderItems)
      .Load();
  
  context.Entry(order)
      .Reference(o => o.Customer)
      .Load();
  ```
- More control than lazy loading
- Useful when decision to load is conditional
</details>

<details>
<summary>157. What is the N+1 query problem and how do you avoid it?</summary>

- 1 query for parent + N queries for each child (lazy loading)
  ```csharp
  // N+1 Problem
  var orders = context.Orders.ToList(); // 1 query
  foreach (var order in orders)
  {
      var items = order.OrderItems; // N queries!
  }
  ```
- Solutions:
  - Use eager loading with `Include()`
  - Use projection with `Select()`
  - Use split queries for large includes
  - Disable lazy loading in performance-critical code
</details>

---

### Many-to-Many Relationships

<details>
<summary>158. How do you implement Many-to-Many relationships in EF Core?</summary>

- **EF Core 5+**: Skip navigations (no join entity needed)
  ```csharp
  public class Student
  {
      public int Id { get; set; }
      public ICollection<Course> Courses { get; set; }
  }
  
  public class Course
  {
      public int Id { get; set; }
      public ICollection<Student> Students { get; set; }
  }
  ```
- **With payload** (extra columns in join table):
  ```csharp
  public class Enrollment
  {
      public int StudentId { get; set; }
      public int CourseId { get; set; }
      public DateTime EnrollmentDate { get; set; }
      public Student Student { get; set; }
      public Course Course { get; set; }
  }
  ```
</details>

<details>
<summary>159. How do you configure Many-to-Many with Fluent API?</summary>

```csharp
// Skip navigation (EF Core 5+)
modelBuilder.Entity<Student>()
    .HasMany(s => s.Courses)
    .WithMany(c => c.Students)
    .UsingEntity(j => j.ToTable("StudentCourses"));

// With explicit join entity
modelBuilder.Entity<Enrollment>()
    .HasKey(e => new { e.StudentId, e.CourseId });

modelBuilder.Entity<Enrollment>()
    .HasOne(e => e.Student)
    .WithMany(s => s.Enrollments)
    .HasForeignKey(e => e.StudentId);

modelBuilder.Entity<Enrollment>()
    .HasOne(e => e.Course)
    .WithMany(c => c.Enrollments)
    .HasForeignKey(e => e.CourseId);
```
</details>

---

### Change Tracking

<details>
<summary>160. What is Change Tracking in Entity Framework?</summary>

- EF tracks state of entities loaded from database
- States: `Unchanged`, `Added`, `Modified`, `Deleted`, `Detached`
- Automatically detects changes when `SaveChanges()` is called
- Enables EF to generate appropriate INSERT/UPDATE/DELETE statements
</details>

<details>
<summary>161. When and why would you disable Change Tracking?</summary>

- Use `AsNoTracking()` for read-only queries
  ```csharp
  var products = context.Products
      .AsNoTracking()
      .Where(p => p.IsActive)
      .ToList();
  ```
- Benefits: better performance, lower memory usage
- Use when: reporting queries, read-only APIs, large data sets
- Cannot call `SaveChanges()` on untracked entities
</details>

<details>
<summary>162. How do you manually control entity state?</summary>

```csharp
// Check current state
var state = context.Entry(product).State;

// Manually set state
context.Entry(product).State = EntityState.Modified;

// Or use DbSet methods
context.Products.Add(product);      // Added
context.Products.Update(product);   // Modified
context.Products.Remove(product);   // Deleted
context.Products.Attach(product);   // Unchanged
```
</details>

---

### Working with Disconnected Entities

<details>
<summary>163. What are disconnected entities and why are they challenging?</summary>

- Entities not tracked by current DbContext (e.g., from web API requests)
- Context doesn't know if entity is new or existing
- Common in web applications where entities cross request boundaries
- Must manually determine and set correct entity state
</details>

<details>
<summary>164. How do you handle updates with disconnected entities?</summary>

```csharp
public void UpdateProduct(ProductDto dto)
{
    var product = new Product
    {
        Id = dto.Id,
        Name = dto.Name,
        Price = dto.Price
    };
    
    // Option 1: Update all properties
    context.Products.Update(product);
    
    // Option 2: Attach and mark specific properties
    context.Attach(product);
    context.Entry(product).Property(p => p.Name).IsModified = true;
    
    // Option 3: Load existing and map changes
    var existing = context.Products.Find(dto.Id);
    if (existing != null)
    {
        existing.Name = dto.Name;
        existing.Price = dto.Price;
    }
    
    context.SaveChanges();
}
```
</details>

---

### Inheritance Strategies

<details>
<summary>165. What inheritance strategies does EF Core support?</summary>

- **Table per Hierarchy (TPH)**: single table with discriminator column
- **Table per Type (TPT)**: separate table for each type
- **Table per Concrete Class (TPC)**: separate table for each concrete class
- Each has different trade-offs for performance and normalization
</details>

<details>
<summary>166. Explain Table per Hierarchy (TPH) strategy.</summary>

```csharp
public abstract class Payment
{
    public int Id { get; set; }
    public decimal Amount { get; set; }
}

public class CashPayment : Payment { }

public class CardPayment : Payment
{
    public string CardNumber { get; set; }
}

// Single table with discriminator
modelBuilder.Entity<Payment>()
    .HasDiscriminator<string>("PaymentType")
    .HasValue<CashPayment>("Cash")
    .HasValue<CardPayment>("Card");
```
- **Pros**: best query performance, single table
- **Cons**: nullable columns, no database constraints per type
</details>

<details>
<summary>167. Explain Table per Type (TPT) strategy.</summary>

```csharp
modelBuilder.Entity<CashPayment>().ToTable("CashPayments");
modelBuilder.Entity<CardPayment>().ToTable("CardPayments");
```
- Separate table for each derived type
- Base type properties in base table, derived in their tables
- **Pros**: normalized, proper constraints, no nullable columns
- **Cons**: JOINs required, slower queries
</details>

<details>
<summary>168. Explain Table per Concrete Class (TPC) strategy.</summary>

```csharp
modelBuilder.Entity<Payment>().UseTpcMappingStrategy();
modelBuilder.Entity<CashPayment>().ToTable("CashPayments");
modelBuilder.Entity<CardPayment>().ToTable("CardPayments");
```
- Each concrete type has its own complete table
- No table for abstract base class
- **Pros**: no JOINs for concrete type queries
- **Cons**: UNION needed for base type queries, duplicate columns
</details>

<details>
<summary>169. How do you choose the right inheritance strategy?</summary>

| Strategy | Use When |
|----------|----------|
| TPH | Most queries on base type, few derived types, performance critical |
| TPT | Need database constraints, many properties per derived type |
| TPC | Rarely query base type, want isolated tables per type |

- TPH is the default and usually best for performance
- Consider data integrity requirements and query patterns
</details>

---

### Owned Entities

<details>
<summary>170. What are Owned Entities in EF Core?</summary>

- Value objects that belong to another entity
- No identity of their own (no primary key table)
- Always accessed through owner entity
  ```csharp
  public class Order
  {
      public int Id { get; set; }
      public Address ShippingAddress { get; set; }
  }

  [Owned]
  public class Address
  {
      public string Street { get; set; }
      public string City { get; set; }
      public string ZipCode { get; set; }
  }
  ```
- Stored in same table as owner (or separate table with config)
</details>

<details>
<summary>171. How do you configure Owned Entities with Fluent API?</summary>

```csharp
modelBuilder.Entity<Order>()
    .OwnsOne(o => o.ShippingAddress, address =>
    {
        address.Property(a => a.Street).HasColumnName("ShipStreet");
        address.Property(a => a.City).HasColumnName("ShipCity");
    });

// Owned entity in separate table
modelBuilder.Entity<Order>()
    .OwnsOne(o => o.ShippingAddress)
    .ToTable("OrderAddresses");

// Collection of owned entities
modelBuilder.Entity<Order>()
    .OwnsMany(o => o.OrderItems);
```
</details>

---

### Value Conversion

<details>
<summary>172. What is Value Conversion in EF Core?</summary>

- Convert property values between .NET type and database type
- Useful for: enums, encrypted values, JSON, custom types
  ```csharp
  modelBuilder.Entity<Order>()
      .Property(o => o.Status)
      .HasConversion<string>(); // Enum to string

  // Custom converter
  modelBuilder.Entity<User>()
      .Property(u => u.Email)
      .HasConversion(
          v => v.ToLower(),           // To database
          v => v                       // From database
      );
  ```
</details>

<details>
<summary>173. How do you create a custom ValueConverter?</summary>

```csharp
public class MoneyConverter : ValueConverter<Money, decimal>
{
    public MoneyConverter() : base(
        money => money.Amount,
        value => new Money(value))
    { }
}

// Or use ValueConverter<TModel, TProvider>
var converter = new ValueConverter<List<string>, string>(
    v => JsonSerializer.Serialize(v, null),
    v => JsonSerializer.Deserialize<List<string>>(v, null)
);

modelBuilder.Entity<Post>()
    .Property(p => p.Tags)
    .HasConversion(converter);
```
</details>

---

### Global Query Filters

<details>
<summary>174. What are Global Query Filters and when would you use them?</summary>

- Automatically applied to all queries for an entity
- Common uses: soft delete, multi-tenancy, row-level security
  ```csharp
  modelBuilder.Entity<Product>()
      .HasQueryFilter(p => !p.IsDeleted);

  modelBuilder.Entity<Order>()
      .HasQueryFilter(o => o.TenantId == _tenantId);
  ```
- All queries automatically exclude deleted/other tenant data
</details>

<details>
<summary>175. How do you bypass Global Query Filters?</summary>

```csharp
// Include filtered entities
var allProducts = context.Products
    .IgnoreQueryFilters()
    .ToList();

// Include in navigation (EF Core 5+)
var orders = context.Orders
    .Include(o => o.Products.IgnoreQueryFilters())
    .ToList();
```
- Use `IgnoreQueryFilters()` when you need all data
- Be careful not to accidentally expose filtered data
</details>

</details>

---

<details>
<summary><strong>HTTP</strong></summary>

### Web Resources

<details>
<summary>176. What is the difference between URI, URL, and URN?</summary>

- **URI** (Uniform Resource Identifier): generic identifier for any resource
- **URL** (Uniform Resource Locator): URI that specifies how to access the resource (includes scheme/protocol)
- **URN** (Uniform Resource Name): URI that names a resource without specifying location
- Example: `https://example.com/page` (URL), `urn:isbn:0451450523` (URN)
- All URLs and URNs are URIs, but not all URIs are URLs
</details>

<details>
<summary>177. What are the components of a URI?</summary>

```
https://user:pass@example.com:8080/path/to/resource?query=value#section
|_____|  |______| |_________| |__||________________||__________||_____|
scheme  userinfo    host     port     path           query     fragment
```
- **Scheme**: protocol (`http`, `https`, `ftp`)
- **Host**: domain name or IP address
- **Port**: optional, defaults depend on scheme (80 for HTTP, 443 for HTTPS)
- **Path**: hierarchical path to resource
- **Query string**: key-value pairs after `?`, separated by `&`
- **Fragment**: client-side reference after `#`, not sent to server
</details>

<details>
<summary>178. What are Media Types (MIME types)?</summary>

- Format specification for data: `type/subtype`
- Common examples:
  - `text/html`, `text/plain`, `text/css`
  - `application/json`, `application/xml`, `application/pdf`
  - `image/png`, `image/jpeg`, `image/svg+xml`
  - `multipart/form-data` for file uploads
- Used in `Content-Type` and `Accept` headers
- Can include parameters: `text/html; charset=utf-8`
</details>

---

### HTTP Transaction

<details>
<summary>179. What is an HTTP transaction?</summary>

- Single request-response exchange between client and server
- Client sends request (method, URL, headers, optional body)
- Server processes and returns response (status code, headers, optional body)
- Stateless: each transaction is independent
- Persistent connections allow multiple transactions per TCP connection
</details>

<details>
<summary>180. What are the main HTTP methods and their purposes?</summary>

| Method | Purpose | Idempotent | Safe | Body |
|--------|---------|------------|------|------|
| GET | Retrieve resource | Yes | Yes | No |
| POST | Create resource / submit data | No | No | Yes |
| PUT | Replace resource entirely | Yes | No | Yes |
| PATCH | Partial update | No* | No | Yes |
| DELETE | Remove resource | Yes | No | Optional |
| HEAD | GET without body (metadata only) | Yes | Yes | No |
| OPTIONS | Get allowed methods / CORS preflight | Yes | Yes | No |

*PATCH can be idempotent depending on implementation
</details>

<details>
<summary>181. What is the difference between PUT and PATCH?</summary>

- **PUT**: replaces entire resource; must send complete representation
  ```http
  PUT /users/1
  { "name": "John", "email": "john@example.com", "age": 30 }
  ```
- **PATCH**: partial update; send only changed fields
  ```http
  PATCH /users/1
  { "age": 31 }
  ```
- PUT is idempotent; PATCH may or may not be
- Use PUT when client has full resource; PATCH for partial updates
</details>

<details>
<summary>182. What do the HTTP status code ranges mean?</summary>

- **1xx Informational**: request received, continuing process
  - `100 Continue`, `101 Switching Protocols`
- **2xx Success**: request successfully received and processed
  - `200 OK`, `201 Created`, `204 No Content`
- **3xx Redirection**: further action needed
  - `301 Moved Permanently`, `302 Found`, `304 Not Modified`
- **4xx Client Error**: problem with the request
  - `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`
- **5xx Server Error**: server failed to fulfill valid request
  - `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`
</details>

<details>
<summary>183. What is the structure of an HTTP message?</summary>

**Request:**
```http
GET /api/users HTTP/1.1
Host: example.com
Accept: application/json
Authorization: Bearer token123

[optional body]
```

**Response:**
```http
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 42

{"id": 1, "name": "John"}
```
- Start line (request line or status line)
- Headers (key-value pairs)
- Empty line (CRLF)
- Optional message body
</details>

---

### Cookies

<details>
<summary>184. How do HTTP cookies work?</summary>

- Server sets cookie via `Set-Cookie` response header
- Browser stores and sends cookie with subsequent requests
- Used for: session management, personalization, tracking
```http
Set-Cookie: sessionId=abc123; Path=/; HttpOnly; Secure
```
- Browser sends back: `Cookie: sessionId=abc123`
</details>

<details>
<summary>185. What is the difference between Session and Permanent cookies?</summary>

- **Session cookies**: no `Expires`/`Max-Age`, deleted when browser closes
- **Permanent cookies**: have explicit expiration
  ```http
  Set-Cookie: remember=true; Max-Age=2592000
  Set-Cookie: token=xyz; Expires=Wed, 09 Jun 2025 10:18:14 GMT
  ```
- Session cookies for temporary state; permanent for "remember me" features
</details>

<details>
<summary>186. What do Secure and HttpOnly cookie attributes do?</summary>

- **Secure**: cookie only sent over HTTPS connections
  - Prevents transmission over unencrypted HTTP
- **HttpOnly**: cookie not accessible via JavaScript (`document.cookie`)
  - Mitigates XSS attacks from stealing session tokens
- Best practice: always use both for authentication cookies
  ```http
  Set-Cookie: auth=token; Secure; HttpOnly
  ```
</details>

<details>
<summary>187. How does cookie scope work (Domain and Path)?</summary>

- **Domain**: which hosts receive the cookie
  - `Domain=example.com` includes subdomains (`api.example.com`)
  - No domain = exact host only (more restrictive)
- **Path**: URL path prefix for cookie inclusion
  - `Path=/api` means cookie sent for `/api/*` requests only
- **SameSite**: controls cross-site sending
  - `Strict`: never sent cross-site
  - `Lax`: sent on top-level navigation GET requests
  - `None`: always sent (requires `Secure`)
</details>

<details>
<summary>188. How does HTTP Basic Authentication work?</summary>

- Credentials sent in `Authorization` header
- Format: `Basic base64(username:password)`
  ```http
  Authorization: Basic dXNlcm5hbWU6cGFzc3dvcmQ=
  ```
- Server responds with `401 Unauthorized` + `WWW-Authenticate: Basic` if missing
- **Security concerns**: credentials sent with every request, only secure over HTTPS
- Prefer token-based authentication (JWT, OAuth) for modern applications
</details>

---

### CORS (Cross-Origin Resource Sharing)

<details>
<summary>189. What is the Same-Origin Policy?</summary>

- Browser security feature that restricts cross-origin HTTP requests
- Same origin = same scheme, host, AND port
  - `https://example.com` ≠ `http://example.com` (different scheme)
  - `https://example.com` ≠ `https://api.example.com` (different host)
  - `https://example.com` ≠ `https://example.com:8080` (different port)
- Prevents malicious sites from reading data from other origins
- Does NOT prevent requests from being sent, only reading responses
</details>

<details>
<summary>190. What does CORS guarantee? Does it prevent cross-origin requests?</summary>

- **CORS does NOT prevent requests from being sent**
- CORS controls whether the browser allows JavaScript to read the response
- A cross-origin POST request IS sent to the server (and may have side effects)
- CORS headers tell browser whether to expose response to JavaScript
- Server-side validation is still required for security
- Preflight requests can block some requests before they're sent
</details>

<details>
<summary>191. How do CORS headers work?</summary>

- **Request headers** (added by browser):
  - `Origin: https://client.com`
- **Response headers** (set by server):
  - `Access-Control-Allow-Origin: https://client.com` (or `*`)
  - `Access-Control-Allow-Methods: GET, POST, PUT`
  - `Access-Control-Allow-Headers: Content-Type, Authorization`
  - `Access-Control-Allow-Credentials: true`
  - `Access-Control-Max-Age: 86400` (cache preflight)
- If response headers don't match request, browser blocks access
</details>

<details>
<summary>192. What is a preflight request and when is it sent?</summary>

- **Preflight**: `OPTIONS` request sent before actual request
- Browser sends preflight for "non-simple" requests:
  - Methods other than GET, HEAD, POST
  - Custom headers (except `Accept`, `Content-Type` with simple values)
  - `Content-Type` other than `application/x-www-form-urlencoded`, `multipart/form-data`, `text/plain`
- **NOT sent for simple requests** (GET/POST with simple headers)
- Server must respond with appropriate `Access-Control-*` headers
```http
OPTIONS /api/users HTTP/1.1
Origin: https://client.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: Content-Type
```
</details>

---

### HTTP/2

<details>
<summary>193. What are the main improvements in HTTP/2?</summary>

- **Multiplexing**: multiple requests/responses over single connection
- **Binary framing**: efficient parsing (vs text in HTTP/1.1)
- **Header compression**: HPACK algorithm reduces overhead
- **Server push**: server can send resources before client requests
- **Stream prioritization**: important resources loaded first
- Backward compatible: same semantics, different wire format
</details>

<details>
<summary>194. How does HTTP/2 multiplexing work?</summary>

- Single TCP connection carries multiple bidirectional streams
- Each stream has unique ID, can be prioritized
- Requests/responses are split into frames, interleaved on connection
- Eliminates head-of-line blocking at HTTP level
- No need for HTTP/1.1 workarounds (domain sharding, sprite sheets)
```
Connection: [Frame1-StreamA][Frame1-StreamB][Frame2-StreamA][Frame2-StreamB]
```
</details>

<details>
<summary>195. What is HTTP/2 Server Push?</summary>

- Server proactively sends resources before client requests them
- Example: when client requests `index.html`, push `style.css` and `app.js`
- Uses `PUSH_PROMISE` frame to announce pushed resources
- Client can reject pushes with `RST_STREAM`
- Benefits: reduces round trips, improves page load
- Limitations: may waste bandwidth if client has cached resource
</details>

</details>

---

<details>
<summary><strong>ASP.NET Core</strong></summary>

### MVC Pattern

<details>
<summary>196. What is the MVC pattern in ASP.NET Core?</summary>

- **Model**: data and business logic, domain entities
- **View**: UI representation (Razor pages, HTML)
- **Controller**: handles requests, coordinates model and view
- Separation of concerns: each component has distinct responsibility
- Flow: Request → Controller → Model → View → Response
</details>

---

### Application Lifecycle

<details>
<summary>197. Explain the ASP.NET Core application lifecycle and Startup class.</summary>

**Startup class (pre-.NET 6):**
```csharp
public class Startup
{
    public void ConfigureServices(IServiceCollection services)
    {
        // Register DI services
        services.AddControllers();
        services.AddDbContext<AppDbContext>();
    }
    
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        // Configure middleware pipeline
        app.UseRouting();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints => endpoints.MapControllers());
    }
}
```
**.NET 6+ Minimal hosting:**
```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();

var app = builder.Build();
app.UseRouting();
app.MapControllers();
app.Run();
```
</details>

<details>
<summary>198. What is the Host in ASP.NET Core?</summary>

- **Host**: object that encapsulates application resources
- Manages: dependency injection, logging, configuration, hosted services
- **Web Host** (legacy): for web applications only
- **Generic Host** (.NET Core 3.0+): unified hosting model
- Responsibilities:
  - App startup and lifetime management
  - Server configuration (Kestrel)
  - Service configuration
```csharp
var host = Host.CreateDefaultBuilder(args)
    .ConfigureWebHostDefaults(webBuilder =>
    {
        webBuilder.UseStartup<Startup>();
    })
    .Build();
```
</details>

<details>
<summary>199. How do Environments work in ASP.NET Core?</summary>

- Set via `ASPNETCORE_ENVIRONMENT` environment variable
- Common values: `Development`, `Staging`, `Production`
- Access via `IWebHostEnvironment.EnvironmentName`
- Conditional configuration:
```csharp
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}
```
- Environment-specific appsettings: `appsettings.Development.json`
</details>

---

### Middleware

<details>
<summary>200. What is Middleware in ASP.NET Core?</summary>

- Components that handle requests and responses in a pipeline
- Each middleware can:
  - Process the request before passing to next
  - Short-circuit the pipeline (stop processing)
  - Process the response after next middleware returns
- Order matters: first added = first to handle request, last to handle response
- Examples: authentication, routing, exception handling, static files
</details>

<details>
<summary>201. How do you write custom middleware?</summary>

**Convention-based:**
```csharp
public class RequestLoggingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public RequestLoggingMiddleware(RequestDelegate next, ILogger<RequestLoggingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        _logger.LogInformation($"Request: {context.Request.Path}");
        await _next(context);  // Call next middleware
        _logger.LogInformation($"Response: {context.Response.StatusCode}");
    }
}

// Registration
app.UseMiddleware<RequestLoggingMiddleware>();
```

**Inline middleware:**
```csharp
app.Use(async (context, next) =>
{
    // Before
    await next();
    // After
});
```
</details>

---

### Routing

<details>
<summary>202. How does routing work in ASP.NET Core?</summary>

- Maps incoming URLs to endpoints (controllers, Razor pages, etc.)
- **Conventional routing**: defined centrally in Startup
  ```csharp
  app.MapControllerRoute(
      name: "default",
      pattern: "{controller=Home}/{action=Index}/{id?}");
  ```
- **Attribute routing**: defined on controllers/actions
  ```csharp
  [Route("api/[controller]")]
  public class UsersController : ControllerBase
  {
      [HttpGet("{id}")]
      public IActionResult Get(int id) => Ok();
  }
  ```
- Route constraints: `{id:int}`, `{name:alpha}`, `{date:datetime}`
</details>

---

### Filters

<details>
<summary>203. What are Filters in ASP.NET Core and what types exist?</summary>

- Code that runs before/after specific stages in the request pipeline
- Types (in execution order):
  1. **Authorization filters**: run first, check access
  2. **Resource filters**: before/after model binding, caching
  3. **Action filters**: before/after action execution
  4. **Exception filters**: handle unhandled exceptions
  5. **Result filters**: before/after action result execution
```csharp
public class LogActionFilter : IActionFilter
{
    public void OnActionExecuting(ActionExecutingContext context)
    {
        // Before action
    }
    
    public void OnActionExecuted(ActionExecutedContext context)
    {
        // After action
    }
}
```
</details>

---

### Model Binding and Validation

<details>
<summary>204. What is Model Binding in ASP.NET Core?</summary>

- Automatically maps HTTP request data to action parameters
- Sources (in order): Form values, Route values, Query strings, Headers
- Binding sources can be explicit:
  ```csharp
  public IActionResult Create(
      [FromBody] CreateUserDto user,
      [FromRoute] int id,
      [FromQuery] string filter,
      [FromHeader] string authorization)
  ```
- Complex types bound from body by default in APIs
- Supports custom model binders for special types
</details>

<details>
<summary>205. How does Model Validation work?</summary>

- Automatic validation using Data Annotations
```csharp
public class UserDto
{
    [Required]
    [StringLength(100)]
    public string Name { get; set; }
    
    [EmailAddress]
    public string Email { get; set; }
    
    [Range(0, 150)]
    public int Age { get; set; }
}
```
- Check in controller: `ModelState.IsValid`
- API controllers with `[ApiController]` return 400 automatically
- Custom validation: `IValidatableObject` or custom attributes
</details>

---

### Authentication and Authorization

<details>
<summary>206. What is ASP.NET Core Identity?</summary>

- Membership system for user authentication
- Features: user registration, login, password hashing, roles, claims
- Uses Entity Framework for storage (customizable)
- Components:
  - `UserManager<T>`: user operations
  - `SignInManager<T>`: authentication operations
  - `RoleManager<T>`: role management
```csharp
services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();
```
</details>

<details>
<summary>207. How does Authorization work in ASP.NET Core?</summary>

- **Simple authorization**: `[Authorize]` attribute
- **Role-based**: `[Authorize(Roles = "Admin,Manager")]`
- **Policy-based**: custom requirements
```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("MinimumAge", policy =>
        policy.Requirements.Add(new MinimumAgeRequirement(18)));
});

[Authorize(Policy = "MinimumAge")]
public IActionResult AdultContent() => View();
```
- **Resource-based**: for data-specific authorization
- Claims-based: check user claims for fine-grained access
</details>

---

### Static Files and Health Checks

<details>
<summary>208. How do you serve static files in ASP.NET Core?</summary>

```csharp
app.UseStaticFiles(); // Serves from wwwroot

// Custom location
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "MyStaticFiles")),
    RequestPath = "/static"
});
```
- Files in `wwwroot` served by default
- Enable directory browsing: `app.UseDirectoryBrowser()`
- Set cache headers, default documents, MIME type mappings
</details>

<details>
<summary>209. What are Health Checks in ASP.NET Core?</summary>

- Monitor application and dependency health
- Used by orchestrators (Kubernetes, load balancers)
```csharp
services.AddHealthChecks()
    .AddDbContextCheck<AppDbContext>()
    .AddRedis(redisConnectionString)
    .AddCheck<CustomHealthCheck>("custom");

app.MapHealthChecks("/health", new HealthCheckOptions
{
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
```
- Returns: Healthy, Degraded, or Unhealthy
- Can check: databases, external APIs, disk space, memory
</details>

---

### Content Negotiation

<details>
<summary>210. What is Content Negotiation?</summary>

- Server selects response format based on client preferences
- Client specifies via `Accept` header: `Accept: application/json`
- Server responds with appropriate `Content-Type`
- ASP.NET Core supports JSON by default, can add XML:
```csharp
services.AddControllers()
    .AddXmlSerializerFormatters();
```
- Custom formatters for other media types
- Respects quality values: `Accept: application/json;q=0.9, application/xml;q=0.5`
</details>

</details>

---

<details>
<summary><strong>ASP.NET Core Web APIs</strong></summary>

### REST API Design

<details>
<summary>211. What are RESTful API design principles?</summary>

- **Resources**: nouns, not verbs (`/users`, not `/getUsers`)
- **HTTP methods**: GET (read), POST (create), PUT (replace), PATCH (update), DELETE
- **Stateless**: no session state on server
- **Uniform interface**: consistent URL patterns
- **HATEOAS**: include links to related resources
- Best practices:
  - Use plural nouns: `/api/products`
  - Hierarchical relationships: `/api/users/1/orders`
  - Filter, sort, paginate via query strings
</details>

<details>
<summary>212. What is ControllerBase vs Controller?</summary>

- **ControllerBase**: base class for API controllers
  - No view support, lighter weight
  - Contains: `Ok()`, `NotFound()`, `BadRequest()`, `CreatedAtAction()`
- **Controller**: extends ControllerBase
  - Adds view support: `View()`, `PartialView()`, `ViewBag`
  - Use for MVC controllers with Razor views
```csharp
[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase  // For APIs
{
    [HttpGet]
    public ActionResult<IEnumerable<Product>> Get() => Ok(_products);
}
```
</details>

<details>
<summary>213. What action return types are available in Web APIs?</summary>

- **Specific type**: `Product`, strongly typed
- **IActionResult**: flexibility, any status code
- **ActionResult\<T\>**: combines both benefits
```csharp
// Specific type - always 200 OK
public Product Get(int id) => _repo.Get(id);

// IActionResult - any status, loses type info
public IActionResult Get(int id)
{
    var product = _repo.Get(id);
    return product == null ? NotFound() : Ok(product);
}

// ActionResult<T> - best of both
public ActionResult<Product> Get(int id)
{
    var product = _repo.Get(id);
    return product == null ? NotFound() : product;
}
```
- `[ApiController]` attribute enables automatic 400 for invalid models
</details>

---

### API Versioning

<details>
<summary>214. How do you implement API versioning in ASP.NET Core?</summary>

```csharp
services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;
});
```

**Versioning strategies:**
- Query string: `/api/products?api-version=2.0`
- URL path: `/api/v2/products`
- Header: `X-Api-Version: 2.0`
- Media type: `Accept: application/json;v=2.0`

```csharp
[ApiVersion("1.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductsV1Controller : ControllerBase { }

[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductsV2Controller : ControllerBase { }
```
</details>

---

### CORS in ASP.NET Core

<details>
<summary>215. How do you configure CORS in ASP.NET Core?</summary>

```csharp
// In ConfigureServices / Program.cs
services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder.WithOrigins("https://example.com")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials();
    });
    
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// In Configure / app
app.UseCors("AllowSpecificOrigin");

// Or per-controller/action
[EnableCors("AllowSpecificOrigin")]
public class ProductsController : ControllerBase { }
```
</details>

---

### Swagger / OpenAPI

<details>
<summary>216. What is Swagger/OpenAPI and how do you configure it?</summary>

- **OpenAPI**: specification for describing REST APIs
- **Swagger**: tooling around OpenAPI (UI, code generation)
- **Swashbuckle**: ASP.NET Core integration
```csharp
services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "API documentation"
    });
});

app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
});
```
- Auto-generates documentation from controllers
- Provides interactive UI for testing endpoints
- Supports authentication configuration, XML comments
</details>

<details>
<summary>217. How do you document APIs with XML comments and Swagger?</summary>

**Enable XML documentation in .csproj:**
```xml
<PropertyGroup>
  <GenerateDocumentationFile>true</GenerateDocumentationFile>
</PropertyGroup>
```

**Configure Swagger:**
```csharp
services.AddSwaggerGen(c =>
{
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});
```

**Add XML comments to controllers:**
```csharp
/// <summary>
/// Creates a new product.
/// </summary>
/// <param name="product">The product to create</param>
/// <returns>The created product</returns>
/// <response code="201">Returns the newly created product</response>
/// <response code="400">If the product is invalid</response>
[HttpPost]
[ProducesResponseType(StatusCodes.Status201Created)]
[ProducesResponseType(StatusCodes.Status400BadRequest)]
public ActionResult<Product> Create(Product product) { }
```
</details>

</details>

---

<details>
<summary><strong>SOLID Principles</strong></summary>

<details>
<summary>218. What are the SOLID principles?</summary>

- **S**ingle Responsibility Principle: a class should have one reason to change
- **O**pen/Closed Principle: open for extension, closed for modification
- **L**iskov Substitution Principle: subtypes must be substitutable for base types
- **I**nterface Segregation Principle: prefer small, specific interfaces
- **D**ependency Inversion Principle: depend on abstractions, not concretions
- Goal: maintainable, testable, flexible code
</details>

<details>
<summary>219. What is the Dependency Inversion Principle (the "D" in SOLID)?</summary>

- High-level modules should not depend on low-level modules
- Both should depend on abstractions (interfaces)
- Abstractions should not depend on details; details depend on abstractions
```csharp
// Wrong: high-level depends on low-level
public class OrderService
{
    private readonly SqlDatabase _database = new SqlDatabase();
}

// Right: both depend on abstraction
public class OrderService
{
    private readonly IDatabase _database;
    public OrderService(IDatabase database) => _database = database;
}
```
- Enables testability, flexibility, and loose coupling
</details>

<details>
<summary>220. Can you give examples of each SOLID principle violation and fix?</summary>

**Single Responsibility** - violation: class handles both user logic and email sending
```csharp
// Fix: separate EmailService class
```

**Open/Closed** - violation: modifying switch statement for new types
```csharp
// Fix: use polymorphism or strategy pattern
```

**Liskov Substitution** - violation: Square inheriting from Rectangle breaks area calculation
```csharp
// Fix: common interface IShape instead of inheritance
```

**Interface Segregation** - violation: IWorker with Work() and Eat() methods
```csharp
// Fix: separate IWorkable and IFeedable interfaces
```

**Dependency Inversion** - violation: directly instantiating dependencies
```csharp
// Fix: inject abstractions via constructor
```
</details>

</details>

---

<details>
<summary><strong>Monoliths vs Microservices</strong></summary>

<details>
<summary>221. What are the key differences between monolithic and microservice architectures?</summary>

| Aspect | Monolith | Microservices |
|--------|----------|---------------|
| Deployment | Single unit | Independent services |
| Scaling | Scale entire app | Scale individual services |
| Tech stack | Usually uniform | Polyglot possible |
| Data | Shared database | Database per service |
| Team structure | One team, all code | Small teams per service |
| Complexity | Simpler initially | Distributed systems complexity |
| Communication | In-process calls | Network calls (HTTP, messaging) |
</details>

<details>
<summary>222. When should you choose monolith vs microservices?</summary>

**Monolith when:**
- Small team or early-stage startup
- Simple domain, well-understood requirements
- Need quick delivery, low operational overhead
- Tight budget for infrastructure

**Microservices when:**
- Large teams needing autonomy
- Different scaling requirements per component
- High availability requirements
- Need for independent deployments
- Complex, well-bounded domains
</details>

<details>
<summary>223. What problems did you encounter with microservices architecture?</summary>

- **Distributed system complexity**: network failures, latency
- **Data consistency**: eventual consistency, distributed transactions
- **Service discovery**: how services find each other
- **Debugging**: tracing requests across services
- **Deployment complexity**: orchestration, versioning
- **Testing**: integration testing across services
- **Operational overhead**: monitoring, logging aggregation
</details>

</details>

---

<details>
<summary><strong>Dependency Injection</strong></summary>

<details>
<summary>224. What is Dependency Injection and why use it?</summary>

- Design pattern where dependencies are provided ("injected") rather than created
- Benefits:
  - Loose coupling between components
  - Easier unit testing (mock dependencies)
  - Centralized configuration of dependencies
  - Supports SOLID principles (especially D)
- Types: constructor injection, property injection, method injection
- Constructor injection is preferred (explicit, immutable)
</details>

<details>
<summary>225. What are the DI service lifetimes in ASP.NET Core?</summary>

| Lifetime | Behavior | Use Case |
|----------|----------|----------|
| **Transient** | New instance every request | Lightweight, stateless services |
| **Scoped** | One instance per HTTP request | DbContext, unit of work |
| **Singleton** | One instance for app lifetime | Caching, configuration, logging |

```csharp
services.AddTransient<IEmailService, EmailService>();
services.AddScoped<IOrderRepository, OrderRepository>();
services.AddSingleton<ICacheService, CacheService>();
```
</details>

<details>
<summary>226. What are the differences and potential issues with each DI lifetime?</summary>

**Transient:**
- Most flexible, no shared state
- Can be memory intensive if heavy to create

**Scoped:**
- Shared within request boundary
- Cannot inject into Singleton (captive dependency)

**Singleton:**
- Must be thread-safe
- Cannot inject Scoped or Transient services
- State persists for app lifetime (memory leaks possible)

**Captive dependency problem:**
```csharp
// WRONG: Singleton capturing Scoped service
public class SingletonService
{
    public SingletonService(ScopedService scoped) { } // Bug!
}
```
</details>

</details>

---

<details>
<summary><strong>Singleton Pattern</strong></summary>

<details>
<summary>227. What is the Singleton pattern and how do you implement it thread-safely?</summary>

- Ensures only one instance of a class exists
- Provides global access point

**Thread-safe implementations:**
```csharp
// 1. Lazy<T> (recommended)
public sealed class Singleton
{
    private static readonly Lazy<Singleton> _instance = 
        new Lazy<Singleton>(() => new Singleton());
    public static Singleton Instance => _instance.Value;
    private Singleton() { }
}

// 2. Static constructor (also thread-safe)
public sealed class Singleton
{
    public static Singleton Instance { get; } = new Singleton();
    private Singleton() { }
}

// 3. Double-check locking (explicit)
private static volatile Singleton _instance;
private static readonly object _lock = new object();

public static Singleton Instance
{
    get
    {
        if (_instance == null)
        {
            lock (_lock)
            {
                if (_instance == null)
                    _instance = new Singleton();
            }
        }
        return _instance;
    }
}
```
</details>

<details>
<summary>228. What multithreading problems have you encountered with Singleton?</summary>

- **Race conditions**: multiple threads creating instances simultaneously
- **State corruption**: concurrent modifications to singleton state
- **Deadlocks**: if singleton initialization acquires locks

**Solutions:**
- Use thread-safe initialization (Lazy<T>, static constructor)
- Make singleton immutable or stateless if possible
- Use proper synchronization for mutable state
- Consider ConcurrentDictionary for thread-safe collections
- Avoid singleton altogether; prefer DI with managed lifetimes
</details>

</details>

---

<details>
<summary><strong>SQL Performance and Debugging</strong></summary>

<details>
<summary>229. What tools do you use to find SQL-related performance issues?</summary>

**SQL Server:**
- SQL Server Profiler / Extended Events
- Query Store (built-in performance history)
- Execution Plans (SSMS, Azure Data Studio)
- Dynamic Management Views (DMVs)
- Activity Monitor

**Application-level:**
- EF Core logging (`optionsBuilder.LogTo(Console.WriteLine)`)
- MiniProfiler for real-time query timing
- Application Insights / OpenTelemetry
- Third-party APM tools (Datadog, New Relic)

**Metrics to look for:**
- Query duration, CPU time, logical reads
- Missing indexes, index scans vs seeks
- Parameter sniffing issues
</details>

<details>
<summary>230. What are SQL performance best practices?</summary>

- **Indexing**: create indexes on WHERE, JOIN, ORDER BY columns
- **Avoid SELECT ***: retrieve only needed columns
- **Parameterized queries**: prevent SQL injection, enable plan reuse
- **Batch operations**: avoid row-by-row processing
- **Pagination**: use OFFSET/FETCH or keyset pagination
- **Avoid N+1**: use JOINs or eager loading
- **Statistics**: keep statistics updated
- **Query analysis**: review execution plans regularly
- **Connection pooling**: reuse database connections
- **Consider read replicas**: for read-heavy workloads
</details>

</details>

---

<details>
<summary><strong>Async/Await Deep Dive</strong></summary>

<details>
<summary>231. What happens if you forget to write await?</summary>

```csharp
// Forgot await
public async Task ProcessAsync()
{
    SaveToDatabase(); // Returns Task, but we don't wait!
    Console.WriteLine("Done"); // Executes immediately
}
```

**Consequences:**
- Method continues without waiting for completion
- Exceptions are swallowed (not observed)
- Fire-and-forget behavior (usually unintended)
- Data inconsistency possible
- Compiler warning CS4014

**Fix:** Always await, or explicitly handle fire-and-forget:
```csharp
_ = Task.Run(() => FireAndForget()).ContinueWith(t => 
    Log.Error(t.Exception), TaskContinuationOptions.OnlyOnFaulted);
```
</details>

<details>
<summary>232. How does async/await know when an async operation has completed?</summary>

**State machine mechanics:**
1. Compiler transforms async method into state machine class
2. `await` captures current state and registers continuation
3. Awaitable object (Task) has `IsCompleted` property checked
4. If not complete, `OnCompleted` callback is registered
5. When I/O completes, OS signals thread pool
6. Continuation is scheduled on appropriate context
7. State machine resumes from saved state

**Task completion sources:**
- I/O completion ports (Windows)
- epoll/kqueue (Linux/macOS)
- `TaskCompletionSource<T>` for manual control
</details>

<details>
<summary>233. What is the UI thread and SynchronizationContext?</summary>

**UI Thread:**
- Single thread that can modify UI elements
- All UI frameworks (WPF, WinForms, MAUI) are single-threaded
- Blocking UI thread = frozen app

**SynchronizationContext:**
- Abstraction for marshaling work to specific thread/context
- UI frameworks provide custom implementations
- Captured by `await` to continue on original context

```csharp
// UI app example
async void Button_Click(object sender, EventArgs e)
{
    label.Text = "Loading...";          // UI thread
    var data = await FetchDataAsync();   // Background thread
    label.Text = data;                   // Back to UI thread (automatic)
}
```
</details>

<details>
<summary>234. What is ConfigureAwait and when should you use it?</summary>

```csharp
await SomeAsync().ConfigureAwait(false);
```

**ConfigureAwait(true)** (default):
- Continue on captured SynchronizationContext
- Required for UI updates in desktop/mobile apps

**ConfigureAwait(false)**:
- Don't capture context, continue on any thread pool thread
- **Use in library code** to avoid deadlocks
- Improves performance (no context switching)

**Best practice:**
- UI code: use default or `ConfigureAwait(true)`
- Library code: always use `ConfigureAwait(false)`
- ASP.NET Core has no SynchronizationContext, so it doesn't matter (but good habit)
</details>

</details>

---

<details>
<summary><strong>CAP Theorem</strong></summary>

<details>
<summary>235. What is the CAP theorem?</summary>

In a distributed system, you can only guarantee two of three:

- **Consistency**: every read receives the most recent write
- **Availability**: every request receives a response
- **Partition tolerance**: system continues despite network failures

**In practice:**
- Network partitions will happen (P is mandatory)
- Choice is between C and A during partition
- CP systems: favor consistency (refuse requests if unsure)
- AP systems: favor availability (allow stale reads)

**Examples:**
- CP: MongoDB, HBase, Redis Cluster
- AP: Cassandra, DynamoDB, CouchDB
</details>

<details>
<summary>236. How does CAP theorem affect microservice design?</summary>

- **Accept eventual consistency**: not all data needs strong consistency
- **Design for partition tolerance**: network will fail
- **Choose based on use case**:
  - Financial transactions: prefer consistency
  - Social media feed: availability more important
- **Implement compensating transactions**: SAGA pattern
- **Use idempotent operations**: safe to retry
- **Design for graceful degradation**: circuit breakers
</details>

</details>

---

<details>
<summary><strong>SAGA Pattern</strong></summary>

<details>
<summary>237. What is the SAGA pattern?</summary>

- Pattern for managing distributed transactions across microservices
- Alternative to two-phase commit (2PC)
- Sequence of local transactions with compensating actions

**Types:**
- **Choreography**: services publish events, others react
- **Orchestration**: central coordinator manages saga

**Example** (Order processing):
1. Order Service: Create order → CompensatIng: Cancel order
2. Payment Service: Charge payment → Compensating: Refund payment
3. Inventory Service: Reserve stock → Compensating: Release stock
4. Shipping Service: Schedule delivery
</details>

<details>
<summary>238. What are the pros and cons of SAGA choreography vs orchestration?</summary>

**Choreography:**
```
Order Created → Payment Charged → Stock Reserved → Shipping Scheduled
     ↓               ↓                ↓
  (events)       (events)         (events)
```
- **Pros**: decoupled, no single point of failure
- **Cons**: hard to understand flow, difficult debugging

**Orchestration:**
```
Orchestrator → Order Service
            → Payment Service
            → Inventory Service
            → Shipping Service
```
- **Pros**: clear flow, easier testing, centralized logic
- **Cons**: orchestrator is single point of failure, coupling

**Choose based on:**
- Complexity of workflow
- Team structure
- Debugging requirements
</details>

</details>

---

<details>
<summary><strong>HttpClient Best Practices</strong></summary>

<details>
<summary>239. What is socket exhaustion and how do you prevent it?</summary>

**Problem:**
```csharp
// WRONG: creates new socket for each request
using (var client = new HttpClient())
{
    var result = await client.GetAsync(url);
}
// Socket enters TIME_WAIT state (~4 minutes), ports exhausted
```

**Solutions:**

1. **IHttpClientFactory** (recommended):
```csharp
services.AddHttpClient<MyService>(client =>
{
    client.BaseAddress = new Uri("https://api.example.com");
});
```
- Manages HttpMessageHandler lifetime
- Handles DNS changes properly
- Prevents socket exhaustion

2. **Static/Singleton HttpClient**:
```csharp
private static readonly HttpClient _client = new HttpClient();
```
- Simple but doesn't handle DNS changes

3. **SocketsHttpHandler** (.NET Core 2.1+):
```csharp
var handler = new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromMinutes(2)
};
```
</details>

<details>
<summary>240. How do you handle HttpClient failures and resilience?</summary>

**Using Polly with IHttpClientFactory:**
```csharp
services.AddHttpClient<MyService>()
    .AddTransientHttpErrorPolicy(policy => 
        policy.WaitAndRetryAsync(3, retryAttempt => 
            TimeSpan.FromSeconds(Math.Pow(2, retryAttempt))))
    .AddTransientHttpErrorPolicy(policy =>
        policy.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));
```

**Common patterns:**
- **Retry**: retry failed requests with exponential backoff
- **Circuit breaker**: stop calling failing service temporarily
- **Timeout**: don't wait forever
- **Fallback**: return cached/default data on failure

**What to handle:**
- Network timeouts
- 5xx server errors
- Rate limiting (429)
- DNS failures
</details>

<details>
<summary>241. What libraries have you used for HTTP communication?</summary>

- **HttpClient**: built-in, recommended with IHttpClientFactory
- **RestSharp**: popular REST client, simpler API
- **Refit**: type-safe REST client using interfaces
- **Flurl**: fluent URL building and HTTP calls
- **Polly**: resilience and transient fault handling

**Refit example:**
```csharp
public interface IUserApi
{
    [Get("/users/{id}")]
    Task<User> GetUserAsync(int id);
}

services.AddRefitClient<IUserApi>()
    .ConfigureHttpClient(c => c.BaseAddress = new Uri("https://api.com"));
```
</details>

</details>

---

<details>
<summary><strong>Dictionary and HashSet Internals</strong></summary>

<details>
<summary>242. How does Dictionary/HashSet work internally?</summary>

**Structure:**
- Array of buckets (hash table)
- Each bucket contains entries with same hash code (chaining)
- Entry stores: key, value, hash code, next entry index

**Operations:**
1. **Add/Lookup**:
   - Compute `key.GetHashCode()`
   - Calculate bucket index: `hashCode % buckets.Length`
   - Search chain for matching key using `Equals()`

2. **Collision handling**: linked list within bucket

3. **Resize**: when load factor exceeded, double size and rehash

**Time complexity:**
- Average: O(1) for Add, Remove, ContainsKey
- Worst (all collisions): O(n)

**Requirements for keys:**
- Immutable hash code
- Proper `GetHashCode()` and `Equals()` implementation
</details>

<details>
<summary>243. What happens with poor hash code implementation?</summary>

**Problem:**
```csharp
public override int GetHashCode() => 1; // All items in one bucket!
```

**Consequences:**
- All entries in single bucket
- O(n) lookup instead of O(1)
- Performance degrades to linked list

**Good hash code properties:**
- Distributes evenly across integers
- Same for equal objects
- Uses all relevant fields
- Fast to compute

```csharp
public override int GetHashCode() => HashCode.Combine(Name, Age);
```
</details>

</details>

---

<details>
<summary><strong>CQRS Pattern</strong></summary>

<details>
<summary>244. What is CQRS and when would you use it?</summary>

**Command Query Responsibility Segregation:**
- Separate models for read (Query) and write (Command) operations
- Commands: change state, return void or ID
- Queries: return data, no side effects

**Architecture:**
```
Commands → Write Model → Database (normalized)
                              ↓ (sync/async)
Queries  → Read Model  → Database (denormalized/views)
```

**Use when:**
- Complex domain with different read/write patterns
- High read:write ratio (optimize reads separately)
- Event sourcing architecture
- Need different scaling for reads vs writes

**Avoid when:**
- Simple CRUD applications
- Small teams (additional complexity)
</details>

<details>
<summary>245. How do you implement CQRS in practice?</summary>

**Simple CQRS with MediatR:**
```csharp
// Command
public record CreateOrderCommand(string Product, int Quantity) : IRequest<int>;

public class CreateOrderHandler : IRequestHandler<CreateOrderCommand, int>
{
    public async Task<int> Handle(CreateOrderCommand cmd, CancellationToken ct)
    {
        var order = new Order(cmd.Product, cmd.Quantity);
        await _repository.AddAsync(order);
        return order.Id;
    }
}

// Query
public record GetOrderQuery(int Id) : IRequest<OrderDto>;

public class GetOrderHandler : IRequestHandler<GetOrderQuery, OrderDto>
{
    public async Task<OrderDto> Handle(GetOrderQuery query, CancellationToken ct)
    {
        return await _readDb.Orders.FirstOrDefaultAsync(o => o.Id == query.Id);
    }
}
```
</details>

</details>

---

<details>
<summary><strong>Design Patterns</strong></summary>

<details>
<summary>246. What design patterns have you used in your work?</summary>

**Creational:**
- Factory: create objects without exposing creation logic
- Builder: construct complex objects step by step
- Singleton: single instance (prefer DI)

**Structural:**
- Adapter: make incompatible interfaces work together
- Decorator: add behavior dynamically
- Facade: simplify complex subsystem

**Behavioral:**
- Strategy: encapsulate algorithms, make them interchangeable
- Observer: notify dependents of state changes
- Command: encapsulate request as object (CQRS)
- Template Method: define algorithm skeleton, let subclasses override steps
</details>

<details>
<summary>247. Can you explain Strategy pattern with a practical example?</summary>

```csharp
// Strategy interface
public interface IPaymentStrategy
{
    Task<PaymentResult> ProcessAsync(decimal amount);
}

// Concrete strategies
public class CreditCardPayment : IPaymentStrategy
{
    public async Task<PaymentResult> ProcessAsync(decimal amount)
    {
        // Credit card processing logic
    }
}

public class PayPalPayment : IPaymentStrategy
{
    public async Task<PaymentResult> ProcessAsync(decimal amount)
    {
        // PayPal processing logic
    }
}

// Context
public class PaymentService
{
    public async Task<PaymentResult> ProcessPaymentAsync(
        IPaymentStrategy strategy, decimal amount)
    {
        return await strategy.ProcessAsync(amount);
    }
}

// Usage - strategy selected at runtime
var strategy = paymentType switch
{
    "creditcard" => new CreditCardPayment(),
    "paypal" => new PayPalPayment(),
    _ => throw new NotSupportedException()
};
await paymentService.ProcessPaymentAsync(strategy, 100.00m);
```
</details>

<details>
<summary>248. What is the Repository pattern and when should you use it?</summary>

```csharp
public interface IRepository<T> where T : class
{
    Task<T?> GetByIdAsync(int id);
    Task<IEnumerable<T>> GetAllAsync();
    Task AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
}

public class OrderRepository : IRepository<Order>
{
    private readonly AppDbContext _context;
    
    public async Task<Order?> GetByIdAsync(int id)
        => await _context.Orders.FindAsync(id);
    // ... other implementations
}
```

**Benefits:**
- Abstracts data access
- Enables unit testing with mock repositories
- Centralizes query logic

**Debate:**
- EF Core DbContext is already Unit of Work + Repository
- Adding another layer may be unnecessary abstraction
- Consider: Specification pattern for complex queries
</details>

</details>

---

<details>
<summary><strong>Message Queues and Brokers</strong></summary>

<details>
<summary>249. What message queue technologies have you used?</summary>

**Message brokers:**
- **RabbitMQ**: powerful routing, AMQP protocol
- **Azure Service Bus**: managed, enterprise features
- **Amazon SQS/SNS**: AWS managed queues
- **Apache Kafka**: high-throughput, log-based

**.NET libraries:**
- **MassTransit**: abstraction over RabbitMQ, Azure Service Bus, Amazon SQS
- **NServiceBus**: enterprise service bus
- **CAP**: distributed transaction with outbox pattern
- **Wolverine**: next-gen messaging (successor to Jasper)

```csharp
// MassTransit example
services.AddMassTransit(x =>
{
    x.AddConsumer<OrderConsumer>();
    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.ConfigureEndpoints(context);
    });
});
```
</details>

<details>
<summary>250. When should you use message queues vs direct HTTP calls?</summary>

**Use message queues when:**
- Asynchronous processing is acceptable
- Need to handle spikes (load leveling)
- Want guaranteed delivery
- Decoupling services is important
- Long-running operations

**Use HTTP when:**
- Need immediate response
- Simple request/response pattern
- Real-time requirements
- Simpler infrastructure needs

**Patterns:**
- Command messages: tell service to do something
- Event messages: notify something happened
- Request/Reply: synchronous over async transport
</details>

</details>

---

<details>
<summary><strong>Logging Best Practices</strong></summary>

<details>
<summary>251. How do you implement logging in .NET applications?</summary>

**Using Microsoft.Extensions.Logging:**
```csharp
public class OrderService
{
    private readonly ILogger<OrderService> _logger;
    
    public OrderService(ILogger<OrderService> logger)
    {
        _logger = logger;
    }
    
    public void ProcessOrder(Order order)
    {
        _logger.LogInformation("Processing order {OrderId}", order.Id);
        
        try
        {
            // Process
            _logger.LogDebug("Order {OrderId} details: {@Order}", order.Id, order);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to process order {OrderId}", order.Id);
            throw;
        }
    }
}
```

**Best practices:**
- Use structured logging with message templates
- Include correlation IDs for distributed tracing
- Log appropriate levels (Debug, Info, Warning, Error)
- Don't log sensitive data (PII, passwords)
</details>

<details>
<summary>252. What logging providers and tools have you used?</summary>

**Providers:**
- Console (development)
- Serilog (structured logging)
- NLog (flexible configuration)
- Application Insights (Azure)
- Seq (log server)
- ELK Stack (Elasticsearch, Logstash, Kibana)

**Serilog configuration:**
```csharp
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .WriteTo.Console()
    .WriteTo.File("logs/app-.log", rollingInterval: RollingInterval.Day)
    .WriteTo.Seq("http://localhost:5341")
    .Enrich.WithCorrelationId()
    .CreateLogger();

builder.Host.UseSerilog();
```
</details>

</details>

---

<details>
<summary><strong>Multithreading and Asynchrony</strong></summary>

<details>
<summary>253. What is the difference between multithreading and asynchrony?</summary>

**Multithreading:**
- Multiple threads executing code simultaneously
- Uses CPU parallelism
- For CPU-bound work (calculations, processing)
- Thread pool manages worker threads

**Asynchrony:**
- Non-blocking operations
- Single thread can handle many operations
- For I/O-bound work (database, HTTP, file system)
- No thread is blocked waiting

```csharp
// CPU-bound: use Parallel or Task.Run
Parallel.For(0, 1000, i => Calculate(i));

// I/O-bound: use async/await
var data = await httpClient.GetStringAsync(url);
```

**Key insight:** async doesn't create threads; it frees them
</details>

<details>
<summary>254. What synchronization primitives do you use for thread safety?</summary>

| Primitive | Use Case |
|-----------|----------|
| `lock` | Simple mutual exclusion |
| `SemaphoreSlim` | Limit concurrent access, async-compatible |
| `ReaderWriterLockSlim` | Multiple readers, single writer |
| `Interlocked` | Atomic operations on primitives |
| `ConcurrentDictionary` | Thread-safe dictionary |
| `Channel<T>` | Producer-consumer with async |

```csharp
// SemaphoreSlim for async limiting
private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(10);

public async Task ProcessAsync()
{
    await _semaphore.WaitAsync();
    try
    {
        await DoWorkAsync();
    }
    finally
    {
        _semaphore.Release();
    }
}
```
</details>

<details>
<summary>255. Can you describe a concrete performance issue you solved?</summary>

**Example scenario:** API endpoint timing out under load

**Investigation:**
1. Profiled with Application Insights, found slow database queries
2. Analyzed execution plans, discovered missing index
3. Found N+1 query problem (lazy loading in loop)
4. Identified synchronous I/O blocking thread pool

**Solutions applied:**
1. Added appropriate indexes
2. Changed to eager loading with `Include()`
3. Replaced `.Result` calls with proper `await`
4. Implemented caching for frequently accessed data
5. Added pagination to large result sets

**Result:** Response time from 5s to 200ms, 10x throughput improvement
</details>

</details>
