# Technical Interview - Candidate #1

## Test Overview

### Instructions
There are different tasks in this test. You can switch freely between them and solve them in any order.

Each task has the problem description.

You may be able to solve this task in a number of languages. If that's the case, select your preferred programming language from the list of available options.

There are different files you can work on. Select the file you want to edit. The solution file is where you write your solution for the described problem.

The test-input.txt file is where you write test input values to verify your solution is correct.

Your solution should include the function as defined in the task description. It may include other functions, procedures, and methods.

Your solution is always being automatically saved. When you've finished your solution, click submit.

Running your solution will help you avoid simple mistakes. You should run it to check that your solution:
- Compiles,
- Returns a correct result given the example data from the task description,
- Terminates within acceptable time.

You can verify your solution multiple times and the number of run requests will not influence your score.

The example test cases are to help you, but will not contribute to your score. Your score is defined by hidden correctness test cases.

Compilation and verification output is displayed in the output window.

Our coding environment includes a chat-based AI assistant designed to assist you with various tasks. For instance, you can ask questions like "Show me how a Lambda function works in Python?"

Additionally, the AI assistant can provide information from publicly available sources, such as documentation. For example, you can ask, "Show me how a Lambda function works in Python?"

It's important to be aware that the test sponsor has the capability to review the complete transcript of your interaction with the AI.

When you have finished writing and testing your solution, click submit to close the task and send it for final evaluation. Submitting your solution is final and you will not be able to change it afterwards.

You can submit your solution for each task as you complete it, or wait and submit each solution once you're done with all tasks.

This test will end when you submit your solution for all tasks or when you reach the end of your time limit.

Quitting will exit you from this test without submitting any solutions for evaluation. You may re-enter this test again, but the timer will continue to countdown from your initial entry.

---

## Task 1: Angular Component with Pagination

### Description

Your task is to implement an Angular component that renders a table with pagination.

1. The table has class name `table` and contains three columns: `ID`, `First Name` and `Last Name`. It is populated with data that can be fetched from the mocked `https://example.com/api/users` endpoint. The endpoint requires one query parameter: `page` (with zero-based numbering). This is an example of a response formatted using JSON:

```json
{
  "count": 13,
  "results": [
    { "id": 1, "firstName": "David", "lastName": "Wallace" },
    { "id": 2, "firstName": "Sonia", "lastName": "Ross" },
    { "id": 3, "firstName": "Anthony", "lastName": "Thomson" }
  ]
}
```

`count`'s value points to the total number of results, whereas `results` contains items from the given page. The page size equals 10. The last page of data might be smaller. If a request is sent with the query param `page` larger than the total number of pages, then `results` will be empty.

2. Initially, the table tbody should be populated with the first page of data.

3. The pagination section has class name `pagination` and consists of four buttons which are stacked horizontally.

   - Clicking the first button navigates to the first page of data, whereas clicking the second button navigates to the previous page of data. The buttons become disabled either when the current page is the first page or when a page of data is currently being loaded. The buttons have (respectively) `first-page-btn` and `previous-page-btn` class names.

   - Similarly, clicking the third button navigates to the next page of data, whereas clicking the last button navigates to the last page of data. The buttons become disabled either when the current page is the last page or when a page of data is currently being loaded. The buttons have (respectively) `next-page-btn` and `last-page-btn` class names.

   - The content of the buttons should be (respectively) `first`, `previous`, `next` and `last`.

4. While data is being loaded, all buttons should be disabled.

5. The component should be the default export and can be either a function or a class.

6. Use Fetch API or HttpClient for making requests.

7. Please remember to use tbody when rendering data.

### Assumptions

- `https://example.com` is a mocked service - it can be accessed only in the Codility UI.
- Assume that a request to the mocked `https://example.com/api/users` API never fails.
- The "Preview" tab will display your component. You can use it for testing purposes.
- Design/styling is not assessed and will not affect the score. You should focus only on implementing the requirements.
- You can use `console.log` for debugging purposes via your browser's developer tools.
- Only two imports are allowed: `@angular/core` (v10.1.0) and `@angular/common/http` (v10.1.0). `@angular/core` is already imported at the top of the starting code.

### Example 1

As mentioned in the requirements, the first page of data should be displayed initially. That means that while the component is mounting, a request to `https://example.com/api/users?page=0` should be made.

### Example 2

Let's assume the third page of data is currently displayed. Clicking the `next` button (assuming it is not disabled) triggers a request to `https://example.com/api/users?page=3`, whereas clicking the `previous` button results in a request being sent to `https://example.com/api/users?page=1`.

### Example 3

Let's assume the `count` value from the `https://example.com/api/users?page=0` response equals 41.

Clicking the last button navigates to the fifth page of data and a request to `https://example.com/api/users?page=4` should be made.

### Example 4

Use the animation below as a reference for your solution.

| ID  | First Name | Last Name  |
|-----|------------|------------|
| 365 | Maisha     | Rawlings   |
| 613 | Lettie     | Epps       |
| 433 | Rocco      | Gant       |
| 856 | Tova       | Coyle      |
| 896 | Tari       | Mancuso    |
| 79  | Kylie      | Prince     |
| 59  | Lashon     | Dunaway    |
| 378 | Corey      | Schaffer   |
| 33  | Nanci      | Middleton  |
| 390 | Carmon     | Lavender   |

[first] [previous] [next] [last]

---

## Task 2: Entity Framework Core - Blog/Post Implementation

### Description

You work for a software company that develops a SaaS solution that allows users to have their own blogs. To store the list of blogs and posts you use Entity Framework Core. Your colleague has started the implementation but it doesn't work. Your task is to fix the bugs and finish the implementation so that all the requirements are met.

Currently, blogs are modelled in the following way:

```csharp
public class BlogEntity
{
    public int BlogId { get; set; }
    public string Name { get; set; }
    public bool IsActive { get; set; }
    public List<PostEntity> Articles { get; set; }
}
```

Posts are modelled in the following way:

```csharp
public class PostEntity
{
    public int PostId { get; set; }
    public int ParentId { get; set; }
    public string Name { get; set; }
    public string Content { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Updated { get; set; }
}
```

A database context looks like this:

```csharp
public class BlogsContext : DbContext
{
    public DbSet<BlogEntity> BlogsEntities { get; set; }
    public DbSet<PostEntity> PostsEntities { get; set; }

    public BlogsContext(DbContextOptions<BlogsContext> options)
        : base(options)
    {
    }
}
```

### BlogEntity Requirements:

- Blogs should be stored in a table with the name **blogs**.
- All fields are mandatory.
- The column that stores `BlogEntity.BlogId` should be called `blog_id`.
- It should validate that `Name` is not longer than 50 or shorter than 10 characters.
- `Articles` should be a navigation property and should provide access to all posts for a given blog.
- `BlogEntity.IsActive`:
  - If the `BlogEntity.IsActive` property (which is a boolean value) is set to `true`, then in a database it should be saved/stored as the string "Blog is active"; otherwise it should be stored as "Blog is not active".
  - Conversion in the opposite direction should be possible, i.e. if a value in a database is "Blog is active" then the `BlogEntity.IsActive` property should `true`; otherwise `false`.

### PostEntity Requirements:

- Posts should be stored in a table with the name **articles**.
- It should not be possible to define a post without a blog.
- All fields, except `Updated`, are mandatory.
- The column that stores `PostEntity.PostId` should be called `post_id`.
- It should validate that `Name` is not longer than 50 or shorter than 10 characters.
- It should validate the `Content` is not longer than 1000 characters.
- `ParentId`:
  - `ParentId` should be a navigation property and should point to the identifier of the blog for which the given post was written.
  - The column that stores `PostEntity.ParentId` should be called `blog_id`.

### General Requirements:

- Do not change names of properties.
- If you try to use `BlogsContext` you will get "The entity type 'XXX' requires a primary key to be defined. Fix this."
- If possible, all the validations should be forced on the application level and not on the database level.
- For example, if a property is mandatory then a `ValidationException` should be thrown when the `DbContext.SaveChanges` method is executed and a column in a database should not be nullable.
- If a property must be of a given length then it can be validated only on the application level.

### Hints:

- Start by fixing a problem with primary keys.
- To score points for validations (e.g. `Content` cannot be longer than 1000), start by overriding the `SaveChanges` method.
- `System.ComponentModel.DataAnnotations.Validator` can be useful.

---

## Task 3: SQL Questions

### Question 1

You have the following table:

```sql
CREATE TABLE [dbo].[Table1](
    [Id] [int] NULL,
    [Name] [varchar](100) NULL
)
```

You want to write a query that will return all data in this table as a single (1 record) XML document with the following format:

```xml
<row Id="1" Name="xxx"/>
<row Id="2" Name="aaa"/>
```

How would you do that?

**Options:**
- [ ] A: select * from dbo.Table1 FOR XML RAW
- [ ] B: select * from dbo.Table1 FOR XML AUTO;
- [ ] C: SELECT <row Id=" + CAST(Id AS VARCHAR(100)) + " Name=" + Name + "/> FROM dbo.Table1
- [ ] D: select * from dbo.Table1 FOR XML PATH;

**Selected Answer:** A ✓

---

### Question 2

You have two tables, `dbo.Orders` and `dbo.OrderDetails`. The `OrderId` column is a primary key in the `dbo.Orders` table and it is referenced by a foreign key in the `dbo.OrderDetails` table. Which of the following queries will return the same results?

**Options:**

A:
```sql
SELECT COUNT(1)
FROM dbo.Orders o LEFT JOIN dbo.OrderDetails od ON o.OrderID = od.OrderID
```

B:
```sql
SELECT COUNT(1)
FROM dbo.Orders o
CROSS APPLY (SELECT * FROM dbo.OrderDetails od WHERE o.OrderId = od.OrderId) T
```

C:
```sql
SELECT COUNT(1)
FROM dbo.Orders o
OUTER APPLY (SELECT * FROM dbo.OrderDetails od WHERE o.OrderId = od.OrderId) T
```

D:
```sql
SELECT COUNT(1)
FROM dbo.Orders o
OUTER APPLY dbo.OrderDetails od ON o.OrderId = od.OrderId
```

**Selected Answers:** A ✓, C ✓

---

### Question 3

You used the following code to copy data from one table into another:

```sql
SELECT *
INTO dbo.Employees2
FROM dbo.Employees
```

Which of the following about `dbo.Employees2` are true?

**Options:**
- [x] A: `dbo.Employees2` has the same number of columns as the original table.
- [ ] B: `dbo.Employees2` has the same indexes as the original table.
- [x] C: The columns in `dbo.Employees2` have the same types as in the original table.
- [ ] D: `dbo.Employees2` has the same primary key as the original table.
- [ ] E: If the original table has an identity column, then `dbo.Employees2` also has it.

**Selected Answers:** A ✓, C ✓

---

### Question 4

The following script creates a view:

```sql
CREATE VIEW dbo.EmployeesFromLondon AS
SELECT * FROM dbo.Employees WHERE City = 'London'
```

Now consider the next script:

```sql
SELECT COUNT(1) FROM dbo.EmployeesFromLondon
UPDATE dbo.EmployeesFromLondon SET City = 'Warsaw' WHERE EmployeeID = 5
SELECT COUNT(1) FROM dbo.EmployeesFromLondon
```

The first query returns 10 and the second query returns 9. If possible, you need to modify the view so that, after modification through the view, no data "disappears". In other words, the second query above should return 10.

**Options:**

A: CREATE VIEW dbo.EmployeesFromLondon
```sql
AS
SELECT * FROM dbo.Employees WHERE City = 'London'
WITH CHECK OPTION
```

B: CREATE VIEW dbo.EmployeesFromLondon
```sql
WITH CHECK OPTION AS
SELECT * FROM dbo.Employees WHERE City = 'London'
```

C: CREATE VIEW dbo.EmployeesFromLondon
```sql
WITH VIEW_METADATA AS
SELECT * FROM dbo.Employees WHERE City = 'London'
WITH CHECK OPTION
```

D: CREATE VIEW dbo.EmployeesFromLondon
```sql
WITH VIEW_METADATA AS
SELECT * FROM dbo.Employees WHERE City = 'London'
```

**Selected Answer:** C ✓

---

### Question 5

You have two tables, `dbo.Orders` and `dbo.OrderDetails`. The `OrderId` column is a primary key in the `dbo.Orders` table and it is referenced by a foreign key in the `dbo.OrderDetails` table. The column with the foreign key is called `OrderId`. Some orders may have no order details.

You need to write a script that will set the `Discount` column in the `dbo.OrderDetails` table to 0 for every order handled by an employee with `EmployeeId` = 10.

**Options:**

A: UPDATE dbo.OrderDetails SET Discount = 0
```sql
FROM dbo.Orders o JOIN dbo.OrderDetails od ON o.OrderId = od.OrderId
WHERE o.EmployeeId = 10
```

B: UPDATE dbo.OrderDetails SET Discount = 0
```sql
FROM dbo.OrderDetails od JOIN dbo.Orders o ON o.OrderId = od.OrderId
WHERE o.EmployeeId = 10
```

C: UPDATE od SET Discount = 0
```sql
FROM dbo.OrderDetails od JOIN dbo.Orders o ON o.OrderId = od.OrderId
WHERE o.EmployeeId = 10
```

D: UPDATE od SET Discount = 0
```sql
FROM dbo.OrderDetails od
WHERE EXISTS (
    SELECT 1 FROM dbo.Orders o
    WHERE o.OrderId = od.OrderId AND o.EmployeeId = 10
)
```

**Selected Answers:** C ✓, D ✓

---

### Question 6

The following MERGE statement updates the `dbo.Employees2` table based on the `dbo.Employees` table.

```sql
MERGE dbo.Employees2 AS target
USING (SELECT EmployeeID, LastName, FirstName, dbo.Employees)
    AS source (EmployeeID, LastName, FirstName)
ON (source.EmployeeID = target.EmployeeID)
WHEN MATCHED
    THEN UPDATE SET
    target.LastName = source.LastName,
    target.FirstName = source.FirstName
WHEN NOT MATCHED
    THEN INSERT (EmployeeID, LastName, FirstName)
    VALUES(source.EmployeeID, source.LastName, source.FirstName);
```

How you would like to track what changes have actually been performed by the `dbo.Employees2` table, in order to then (for example) create a temporary table.

```sql
CREATE TABLE #Temp(
    ActionTaken nvarchar(10),
    EmployeeId int,
    NewLastName nvarchar(20),
    NewFirstName nvarchar(20),
    OldLastName nvarchar(20),
    OldFirstName nvarchar(20)
);
```

`ActionTaken` should be populated with the text INSERT or UPDATE, depending on the action executed by whose names begin with "Old" should contain values before the MERGE was executed for a given `EmployeeId`, whereas columns whose names begin with "New" should contain values after the MERGE was executed, and similarly the columns whose names begin with "Old" should contain values before the MERGE was executed. If there was no value before the MERGE was executed, then values in the columns whose names begin with "Old" should contain values before the MERGE was executed for a given `EmployeeId`.

How could you change the MERGE statement to populate the #Temp table?

**Options:**

A: It is not possible only by changing the MERGE statement; instead a trigger should be used.

B: Add the following code at the end of the MERGE statement:
```sql
OUTPUT $action,
Inserted.EmployeeID, Inserted.LastName, Inserted.FirstName,
Deleted.LastName, Deleted.FirstName INTO #Temp;
```

C: Add the following code at the end of the MERGE statement:
```sql
OUTPUT $action,
Updated.EmployeeID, Updated.LastName, Updated.FirstName,
Deleted.LastName, Deleted.FirstName INTO #Temp;
```

D: Add the following code at the end of the MERGE statement:
```sql
OUTPUT CASE WHEN Deleted.EmployeeId IS NULL THEN 'INSERT' ELSE 'UPDATE' END,
Inserted.EmployeeID, Inserted.LastName, Inserted.FirstName,
Deleted.LastName, Deleted.FirstName INTO #Temp;
```

**Selected Answer:** D ✓

---

### Question 7

You have written a query that is very fast when you test it locally but that works very slowly in the production environment. Your colleague has suggested updating statistics. Is this a good idea?

**Options:**

A: The query may be slow due to outdated statistics. If so, they should be updated. However, be careful as this operation can take time.

B: Analyze the execution plan to order to find bottlenecks, e.g. table scans. Based on that, rewrite the query and/or add additional indexes.

C: MSSQL is not very good when it comes to optimization, so the author of a query should help the database engine by adding as many query hints as possible.

D: Check sys.dm_db_missing_index_details for missing indexes.

---

### Question 8

There is a `dbo.Employees` table which has an auto-incremented/identity column called `EmployeeId` (and no other identity columns). The following statement:

```sql
select IDENT_CURRENT('Employees')
```

...returns 10. If you execute the following script:

```sql
SET IDENTITY_INSERT dbo.Employees ON
INSERT INTO dbo.Employees (EmployeeID, FirstName, LastName)
VALUES(1000, 'John', 'Smith')
SET IDENTITY_INSERT dbo.Employees OFF

INSERT INTO dbo.Employees (FirstName, LastName) VALUES('Ben','Affleck')
```

...what is the value in the `EmployeeId` column for Ben Affleck?

**Options:**
- [ ] A: This script will not work, as it is not possible to turn off IDENTITY_INSERT after it has been enabled.
- [x] B: 11
- [ ] C: 1001
- [ ] D: The second INSERT statement will fail because there is a gap between the last auto-generated value for `EmployeeId` (10) and the value inserted manually into `EmployeeId` (1000).

**Selected Answer:** B ✓

---

### Question 9

You have the following two scripts:

**Script 1:**
```sql
BEGIN TRANSACTION

UPDATE dbo.Table1 SET Name = 'xxx' WHERE Id = 2

WAITFOR DELAY '00:00:05';

UPDATE dbo.Table2 SET Name = 'yyy' WHERE Id = 1

COMMIT
```

**Script 2:**
```sql
BEGIN TRANSACTION

UPDATE dbo.Table2 SET Name = 'yyy' WHERE Id = 1

WAITFOR DELAY '00:00:05';

UPDATE dbo.Table1 SET Name = 'xxx' WHERE Id = 2

COMMIT
```

When both scripts are executed at the same time they deadlock, and after some time the following error message is reported:

*Transaction (Process ID 56) was deadlocked on lock resources with another process and has been chosen as the deadlock victim. Rerun the transaction*

How can you modify these scripts to avoid deadlock?

**Options:**

A: Both scripts should access resources in the same order, for example, Table1 and then Table2 or the other way round.

B: Use a hint WITH (ROWLOCK) with all UPDATE statements.

C: Change isolation level to READ UNCOMMITTED before executing each of the scripts.

D: Use a hint WITH (NOLOCK) with all UPDATE statements.

**Selected Answer:** A ✓

---

### Question 10

There is a table called `dbo.Orders`. Each order has a unique ID, i.e. `OrderId`. The value of each order is stored in the `Value` column. The identifier of a customer who has placed an order is stored in the `CustomerId` column. Additionally, there is an `OrderDate` column which states when an order was created.

You need to write a report that will calculate the running total of the `Value` column for each customer. In order to make your calculations sort customer orders by `OrderDate`, which of the following queries is correct?

**Options:**

A: SELECT CustomerId, OrderDate,
```sql
SUM(Value) OVER(PARTITION BY CustomerId) AS RunningTotal
FROM dbo.Orders
```

B: SELECT CustomerId, OrderDate,
```sql
SUM(Value) OVER(PARTITION BY CustomerId ORDER BY OrderDate) AS RunningTotal
FROM dbo.Orders
```

C: SELECT CustomerId, OrderDate,
```sql
SUM(Value) OVER(PARTITION BY CustomerId
ORDER BY OrderDate
ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS RunningTotal
FROM dbo.Orders
```

D: SELECT CustomerId, OrderDate,
```sql
SUM(Value) OVER(PARTITION BY CustomerId
ORDER BY OrderDate
ROWS BETWEEN 5 PRECEDING AND CURRENT ROW) AS RunningTotal
FROM dbo.Orders
```

**Selected Answers:** A ✓, B ✓

**Note:** Please review your answers. After submitting you won't be able to change them.

