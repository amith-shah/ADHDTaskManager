using ADHDHelper.BlazorDemo.Models;

namespace ADHDHelper.BlazorDemo.Services;

public interface ITaskService
{
    Task<List<TaskItem>> GetAllTasksAsync();
    Task<TaskItem?> GetTaskByIdAsync(Guid id);
    Task<TaskItem> CreateTaskAsync(TaskItem task);
    Task<TaskItem> UpdateTaskAsync(TaskItem task);
    Task<bool> DeleteTaskAsync(Guid id);
    Task<List<TaskItem>> GetTasksByDateAsync(DateTime date);
    Task<List<TaskItem>> GetTasksByPriorityAsync(TaskPriority priority);
    Task<List<TaskItem>> GetTasksByStatusAsync(Models.TaskStatus status);
    Task<bool> ReorderTasksAsync(List<Guid> taskIds);
    Task<List<TaskItem>> SearchTasksAsync(string searchTerm);

    // Events for real-time updates
    event EventHandler<TaskItem>? TaskCreated;
    event EventHandler<TaskItem>? TaskUpdated;
    event EventHandler<Guid>? TaskDeleted;
}