using ADHDHelper.BlazorDemo.Models;

namespace ADHDHelper.BlazorDemo.Services;

public class MockTaskService : ITaskService
{
    private readonly List<TaskItem> _tasks;

    public event EventHandler<TaskItem>? TaskCreated;
    public event EventHandler<TaskItem>? TaskUpdated;
    public event EventHandler<Guid>? TaskDeleted;

    public MockTaskService()
    {
        _tasks = GenerateSampleTasks();
    }

    public Task<List<TaskItem>> GetAllTasksAsync()
    {
        return Task.FromResult(_tasks.OrderBy(t => t.SortOrder).ToList());
    }

    public Task<TaskItem?> GetTaskByIdAsync(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        return Task.FromResult(task);
    }

    public Task<TaskItem> CreateTaskAsync(TaskItem task)
    {
        task.Id = Guid.NewGuid();
        task.CreatedAt = DateTime.Now;
        task.SortOrder = _tasks.Count;
        _tasks.Add(task);

        TaskCreated?.Invoke(this, task);
        return Task.FromResult(task);
    }

    public Task<TaskItem> UpdateTaskAsync(TaskItem task)
    {
        var existingTask = _tasks.FirstOrDefault(t => t.Id == task.Id);
        if (existingTask != null)
        {
            var index = _tasks.IndexOf(existingTask);
            _tasks[index] = task;
            TaskUpdated?.Invoke(this, task);
        }
        return Task.FromResult(task);
    }

    public Task<bool> DeleteTaskAsync(Guid id)
    {
        var task = _tasks.FirstOrDefault(t => t.Id == id);
        if (task != null)
        {
            _tasks.Remove(task);
            TaskDeleted?.Invoke(this, id);
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }

    public Task<List<TaskItem>> GetTasksByDateAsync(DateTime date)
    {
        var tasks = _tasks.Where(t => t.ScheduledDate?.Date == date.Date).ToList();
        return Task.FromResult(tasks);
    }

    public Task<List<TaskItem>> GetTasksByPriorityAsync(TaskPriority priority)
    {
        var tasks = _tasks.Where(t => t.Priority == priority).ToList();
        return Task.FromResult(tasks);
    }

    public Task<List<TaskItem>> GetTasksByStatusAsync(Models.TaskStatus status)
    {
        var tasks = _tasks.Where(t => t.Status == status).ToList();
        return Task.FromResult(tasks);
    }

    public Task<bool> ReorderTasksAsync(List<Guid> taskIds)
    {
        for (int i = 0; i < taskIds.Count; i++)
        {
            var task = _tasks.FirstOrDefault(t => t.Id == taskIds[i]);
            if (task != null)
            {
                task.SortOrder = i;
            }
        }
        return Task.FromResult(true);
    }

    public Task<List<TaskItem>> SearchTasksAsync(string searchTerm)
    {
        var tasks = _tasks.Where(t =>
            t.Title.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
            t.Description.Contains(searchTerm, StringComparison.OrdinalIgnoreCase) ||
            t.Tags.Any(tag => tag.Contains(searchTerm, StringComparison.OrdinalIgnoreCase))
        ).ToList();
        return Task.FromResult(tasks);
    }

    private List<TaskItem> GenerateSampleTasks()
    {
        return new List<TaskItem>
        {
            new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Complete Math Assignment",
                Description = "Solve problems 1-20 from Chapter 5",
                Priority = TaskPriority.High,
                Status = TaskStatus.Pending,
                DueDate = DateTime.Today.AddDays(2),
                ScheduledDate = DateTime.Today.AddDays(1),
                EstimatedDuration = TimeSpan.FromHours(2),
                Category = "Education",
                Tags = new List<string> { "Math", "Homework", "Urgent" },
                IsFromTeams = true,
                TeamsAssignmentId = "teams_123",
                SortOrder = 0
            },
            new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Read Science Chapter",
                Description = "Read Chapter 8: Photosynthesis and take notes",
                Priority = TaskPriority.Medium,
                Status = TaskStatus.InProgress,
                DueDate = DateTime.Today.AddDays(3),
                ScheduledDate = DateTime.Today,
                EstimatedDuration = TimeSpan.FromHours(1),
                Category = "Education",
                Tags = new List<string> { "Science", "Reading" },
                IsFromTeams = true,
                TeamsAssignmentId = "teams_124",
                SortOrder = 1
            },
            new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Grocery Shopping",
                Description = "Buy milk, bread, eggs, and vegetables",
                Priority = TaskPriority.Low,
                Status = TaskStatus.Pending,
                ScheduledDate = DateTime.Today,
                EstimatedDuration = TimeSpan.FromMinutes(45),
                Category = "Personal",
                Tags = new List<string> { "Shopping", "Errands" },
                SortOrder = 2
            },
            new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Call Doctor",
                Description = "Schedule annual checkup appointment",
                Priority = TaskPriority.Medium,
                Status = TaskStatus.Pending,
                EstimatedDuration = TimeSpan.FromMinutes(15),
                Category = "Health",
                Tags = new List<string> { "Health", "Phone Call" },
                SortOrder = 3
            },
            new TaskItem
            {
                Id = Guid.NewGuid(),
                Title = "Project Presentation",
                Description = "Prepare slides for quarterly project review",
                Priority = TaskPriority.High,
                Status = TaskStatus.Pending,
                DueDate = DateTime.Today.AddDays(5),
                ScheduledDate = DateTime.Today.AddDays(3),
                EstimatedDuration = TimeSpan.FromHours(3),
                Category = "Work",
                Tags = new List<string> { "Presentation", "Important" },
                SortOrder = 4
            }
        };
    }
}