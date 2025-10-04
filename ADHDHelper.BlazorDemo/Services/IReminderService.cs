using ADHDHelper.BlazorDemo.Models;

namespace ADHDHelper.BlazorDemo.Services;

public interface IReminderService
{
    Task<bool> ScheduleReminderAsync(TaskReminder reminder);
    Task<bool> CancelReminderAsync(Guid reminderId);
    Task<List<TaskReminder>> GetUpcomingRemindersAsync();
    Task<bool> MarkReminderCompleteAsync(Guid reminderId);
}

public class MockReminderService : IReminderService
{
    private readonly List<TaskReminder> _reminders = new();

    public Task<bool> ScheduleReminderAsync(TaskReminder reminder)
    {
        _reminders.Add(reminder);
        return Task.FromResult(true);
    }

    public Task<bool> CancelReminderAsync(Guid reminderId)
    {
        var reminder = _reminders.FirstOrDefault(r => r.Id == reminderId);
        if (reminder != null)
        {
            _reminders.Remove(reminder);
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }

    public Task<List<TaskReminder>> GetUpcomingRemindersAsync()
    {
        var upcoming = _reminders
            .Where(r => r.ReminderTime > DateTime.Now && !r.IsCompleted)
            .OrderBy(r => r.ReminderTime)
            .ToList();
        return Task.FromResult(upcoming);
    }

    public Task<bool> MarkReminderCompleteAsync(Guid reminderId)
    {
        var reminder = _reminders.FirstOrDefault(r => r.Id == reminderId);
        if (reminder != null)
        {
            reminder.IsCompleted = true;
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }
}