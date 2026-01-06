# NEOGOV Interview Questions

## .NET / C# / Backend

### Core C# Concepts
1. What is the difference between `Expression<Func<T>>` and `Func<T>`?
2. What is the difference between abstract class and interface?
3. What is Dependency Injection? What are its pros and cons?
4. What is DI and IoC?
5. What is Reflection? When do we use it?
6. What is the difference between using a static class for a service and a service registered in DI as Singleton?
7. What is the difference between `string` and `StringBuilder`? How do you work with them?
8. What is async/await?
9. How do asynchronous requests work?
10. What are interfaces and abstract classes?
11. How would you make a method asynchronous? (adding async/await pattern and Task)
12. What is object deep copying?
13. Operations with large strings (e.g., reading a large CSV file into a string)

### ASP.NET Core & Web APIs
14. What is Entity Framework and what is it used for?
15. What are the features of EF? (ChangeTracker, LINQ to SQL, etc.)
16. Is DbContext thread-safe? Is HttpClient thread-safe?
17. How would you get data about an authorized user and use it on the backend? (Claims, Middleware)
18. What are the DI scopes? Which parts of the application use which scopes?
19. How would you implement authorization and authentication for an application with many requests?
20. How would you pass information between different applications? (HTTP, gRPC, AMQP, etc.)
21. Implement a Web API controller
22. What is important to you when it comes to developing/deploying quality software?
23. How do you design the system for resilience?
24. What would you put from an architecture point of view?
25. How would you write fault-tolerant, scalable, and performant code?
26. How would you ensure quality, resilience, and performance of an application?

### Testing
27. Have you written tests? What kinds?
28. What testing tools have you used?
29. Implement Unit Tests for given code

### Message Queues & Background Jobs
30. How does RabbitMQ work?
31. How are messages stored in RabbitMQ?
32. How are messages sent? In what order?
33. What happens if we send messages to multiple consumers at once?
34. What do you do if messages fail to send or are sent with an error?
35. How does Hangfire work? What is it used for?

### Database with EF
36. How would you store the complete history of operations performed on objects? (audit of changed fields)

### Performance & Optimization
37. A complaint came about a slow query - how would you approach finding the problem from a technical perspective?
38. You have C# code with an Entity Framework query to SQL Server that is slow. How would you go about optimizing it?
39. How would you optimize a query if it runs slowly?
40. Analyze and optimize the stored procedure code

### Algorithms
41. Given a string of alphabetic characters, return the length of the longest possible palindrome
42. Write a task to find the maximum palindrome from a string
43. Compare algorithm speeds (e.g., bubble sort vs quicksort)
44. What is the speed of finding an element by key in a Dictionary?

---

## SQL / Databases

1. What is a primary key?
2. What is a foreign key?
3. What are indexes in SQL? What are their pros and cons?
4. What is a Fragmented Index?
5. How are indexes stored?
6. What is a View and what is it used for?
7. What are JOINs? Which JOIN would you use and why?
8. How would you optimize queries in EF?
9. How would you add two tables (entities with their statuses) to an existing system? How would you do it?
10. Find duplicate values in a table (using GROUP BY and HAVING)
11. Live coding: Join 3 tables correctly and return {ID, table1.price * table2.quantity + table3.discount}
12. Write SQL query: 3 tables - Select Users who spent more than a certain amount in the store
13. Look at the stored procedure and optimize/speed it up

---

## JavaScript / TypeScript

1. What is the difference between `let` and `const`?
2. What is the difference between `filter` and `map`?
3. What is the difference between a regular function and an arrow function?
4. How do you add a custom event handler?
5. What are Promises?
6. How many threads are in JavaScript?
7. How do you work on long-running tasks without blocking?

### Coding Tasks
8. Merge two arrays of objects
9. Get objects with unique field value from merged array of objects
10. Filter objects with invalid values for id

---

## Angular

### Core Concepts
1. What are Signals?
2. How did you work before Signals were introduced?
3. What is Dependency Injection in Angular?
4. What is the difference between root and component scope in DI?
5. What are the component lifecycle methods?
6. Which lifecycle hooks are there?
7. In what order do lifecycle hooks run?
8. How many times do lifecycle hooks trigger?
9. In which lifecycle hook do you release resources?
10. What is Change Detection?
11. What is the difference with OnPush strategy?
12. How do you share data between components? (up, down, horizontal)
13. What are Template Forms?
14. What are Reactive Forms?
15. What is a Promise?
16. What are Directives?
17. What is a Service in Angular?
18. What is the scope of a Service?
19. What is the difference between a Service and a Component?
20. How do you work with Observables and RxJS?
21. How do you share data among services?
22. What is data binding in Angular?
23. How do you intercept external HTTP requests and handle 401 errors when there are many requests? (Interceptors)

### Coding Tasks
24. Add a button to save a person
25. Add a component that will show the count of saved persons and current "live" value of First and Last Name in the form, show that component on the screen
26. Add a component that will show the names of all saved persons in it, route === list
27. Create a form with 2 inputs - output data after validation below
28. Form with 2 fields and submit button - disable button while fields are empty/invalid, log form data on submit

---

## Practical Coding Tasks (.NET)

### Student/Teacher Classes Tasks
1. Given a List<Student> - write a function that returns students with GPA greater than 3
2. Write a function that returns the names of students with GPA >= 3
3. Get only Student.Name (ex. Alice Jackson) from the list
4. Write a function that returns the first name of students
5. Write a function that returns the initials (Alex Black -> AB)
6. Get only Student.Name initials
7. Having classes Teacher and Student with both having Name field and GetInitials method - remove code duplication of GetInitials method
8. Having additional class Principal with additional Title field - make the field be prepended to initials in GetInitials
9. Write a method that returns a string with title and initials

### Supervisor Hierarchy Task
10. Given Employees (A, B, C, D, E, X, Y) and EmployeeManager relationships (A->B, B->C, C->D, X->E, E->Y, Y->X) - find the root supervisor (can be solved via SQL with CTE or any language)
11. Note: The last elements have a cycle (Y->X). How would you handle that?

---

## General / Behavioral Questions

1. Tell me about yourself and your experience
2. Tell me about your technology stack
3. Tell me what you did on your projects (briefly)
4. Tell more about your last project
5. Tell about the project with Angular - what did you build, where did you start, how did you improve performance?
6. How do you prioritize tasks for a sprint?
7. What would you do if a client comes with an urgent bug unexpectedly?
8. Do you perform code reviews? What do you pay attention to when reviewing others' code?
9. Which questions do you have for us?
