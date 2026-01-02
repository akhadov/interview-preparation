# Interview Questions and Answers Collection

## Task 1: AWS Multiple Choice Questions

**1. Which of the following correctly describes the benefits of using EC2 Spot Instances over EC2 On-Demand instances?**
- A: Spot Instances come at a reduced cost.
- B: Spot Instances have an increased availability.
- C: It is guaranteed that a Spot Instance will never be restarted.
- D: Only Spot Instances can be used with auto-scaling.
- **Answer: A**

**2. Three of the following services are available at no additional cost except for the cost of the AWS resources they help to manage. The fourth one is a paid service. Which is the paid service?**
- A: Auto Scaling
- B: CloudFormation
- C: Batch
- D: Lambda
- **Answer: D**

**3. How are CPU Credits used in EC2 T2 Instances?**
- A: When the instance operates in burst mode, the CPU Credits are counted and are later added to the monthly bill.
- B: CPU Credits are collected when the instance is idle, and they can later be returned to AWS in exchange for AWS Credits.
- C: When the instance is below its baseline capacity, CPU Credits are received and can later be utilized when increased CPU usage is required.
- D: A set of CPU Credits is received each day and the credits are exchangeable for an increased allocation of operating memory.
- **Answer: C**

**4. Which resources can be specified in the AWS Serverless Application Model (AWS SAM) template?**
- A: Lambda Functions, API Gateways, DynamoDB tables.
- B: EC2 instances, RDS instances, S3 buckets.
- C: Docker images.
- D: SQS queues, Kinesis delivery streams.
- **Answer: A**

**5. What is the relationship between Regions and Availability Zones in Amazon EC2?**
- A: Each physical AWS data center constitutes an Availability Zone and is further divided into Regions.
- B: Each Region is a separate physical location and is further divided into Availability Zones.
- C: Availability Zones are created by merging multiple Regions by AWS users.
- D: Regions are used to host EC2 instances and Availability Zones are used to host monitoring services.
- **Answer: B**

**6. Which AWS service provides the most cost-optimal way to store large files that are infrequently accessed when the access time is not a priority?**
- A: S3
- B: Glacier
- C: EFS
- D: RDS
- **Answer: B**

**7. Which of the following is a correct ARN value indicating a user with username John under account with id 123456789012?**
- A: 123456789012/user/John
- B: arn://iam/123456789012/user/John
- C: iam:123456789012:user:John
- D: arn:aws:iam::123456789012:user/John
- **Answer: D**

**8. What AWS service provides a history of actions taken by users via the AWS Management Console?**
- A: Cloudwatch
- B: Cloudtrail
- C: Cognito
- D: Inspector
- **Answer: B**

**9. Which of the following use cases cannot be realised with AWS Cloudfront?**
- A: Optimizing delivery of content stored in S3.
- B: Optimizing delivery of content served by an HTTP server.
- C: Streaming media using Adobe Media Server.
- D: Optimizing performance of write and read operations against AWS RDS.
- **Answer: D**

**10. What is the role of a bastion host instance?**
- A: Spinning out new EC2 instances according to auto-scaling policies.
- B: Recording all of the administrators' activities performed within AWS cloud.
- C: Providing secure access to a private network from an external network.
- D: Load-balancing incoming HTTP traffic from a public network into EC2 instances.
- **Answer: C**

---

## Task 2: C# Fluent URL Builder

### Task Description
Develop a `UrlBuilder` class to create a URL in a more fluent way.
- `Https()` - changes default `http` to `https`
- `Host(string)` - sets host
- `Port(int)` - sets port
- `Path(string)` - sets path
- `QueryParams(Dictionary<string, string>)` - sets query parameters
- `Build()` - returns a URL built by the previously called methods

### Implementation

```csharp
using System;
using System.Collections.Generic;
using System.Text;

public class UrlBuilder
{
    private string _scheme { get; set; } = "http";
    private string _host { get; set; } = "";
    private int? _port { get; set; }
    private string _path { get; set; } = "";
    private Dictionary<string, string>? _queryParams { get; set; }

    public UrlBuilder Https()
    {
        _scheme = "https";
        return this;
    }

    public UrlBuilder Host(string host)
    {
        _host = host;
        return this;
    }

    public UrlBuilder Port(int port)
    {
        _port = port;
        return this;
    }

    public UrlBuilder Path(string path)
    {
        _path = path;
        return this;
    }

    public UrlBuilder QueryParams(Dictionary<string, string> queryParams)
    {
        _queryParams = queryParams;
        return this;
    }

    public string Build()
    {
        var url = new StringBuilder();
        url.Append($"{_scheme}://{_host}");

        if (_port is not null)
        {
            url.Append($":{_port}");
        }

        url.Append(_path);

        if (_queryParams is not null && _queryParams.Count > 0)
        {
            url.Append("?");
            bool first = true;
            foreach (var p in _queryParams)
            {
                if (!first) url.Append("&");
                url.Append($"{p.Key}={p.Value}");
                first = false;
            }
        }

        return url.ToString();
    }
}
```

---

## Task 4: SQL Query for Employee Salaries

### Task Description
You are given two tables: `department` and `employee`.
Write a SQL query that returns a table comprising all the departments (`dept_id`) in the table `department` that hire at least one employee, the number of people they employ (`count`), and the sum of salaries in each department (`sum_of_salary`). The table should be ordered by `dept_id` in increasing order.

### Implementation (PostgreSQL)

```sql
SELECT
    d.dept_id,
    COUNT(e.emp_id) as count,
    SUM(e.salary) as sum_of_salary
FROM department d
JOIN employee e
    ON e.dept_id = d.dept_id
GROUP BY d.dept_id
ORDER BY d.dept_id;
```
