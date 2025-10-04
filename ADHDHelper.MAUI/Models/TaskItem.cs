namespace ADHDHelper.MAUI.Models;

public class TaskItem
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;
    public TaskStatus Status { get; set; } = TaskStatus.Pending;
    public DateTime CreatedAt { get; set; } = DateTime.Now;
    public DateTime? DueDate { get; set; }
    public DateTime? ScheduledDate { get; set; }
    public DateTime? CompletedAt { get; set; }
    public TimeSpan? EstimatedDuration { get; set; }
    public List<string> Tags { get; set; } = new();
    public string Category { get; set; } = string.Empty;
    public bool IsFromTeams { get; set; } = false;
    public string? TeamsAssignmentId { get; set; }
    public List<TaskReminder> Reminders { get; set; } = new();
    public int SortOrder { get; set; }
}

public enum TaskPriority
{
    Low = 1,
    Medium = 2,
    High = 3,
    Urgent = 4
}

public enum TaskStatus
{
    Pending,
    InProgress,
    Completed,
    Cancelled,
    OnHold
}

public class TaskReminder
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public DateTime ReminderTime { get; set; }
    public ReminderType Type { get; set; }
    public string Message { get; set; } = string.Empty;
    public bool IsCompleted { get; set; }
}

public enum ReminderType
{
    Notification,
    Email,
    SMS
}