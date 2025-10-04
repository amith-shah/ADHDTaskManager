using ADHDHelper.BlazorDemo.Models;

namespace ADHDHelper.BlazorDemo.Services;

public class MockCalendarService : ICalendarService
{
    private readonly List<CalendarEvent> _events;

    public MockCalendarService()
    {
        _events = GenerateSampleEvents();
    }

    public Task<List<CalendarEvent>> GetEventsForDateAsync(DateTime date)
    {
        var events = _events.Where(e => e.StartTime.Date == date.Date).ToList();
        return Task.FromResult(events);
    }

    public Task<List<CalendarEvent>> GetEventsForRangeAsync(DateTime startDate, DateTime endDate)
    {
        var events = _events.Where(e => e.StartTime.Date >= startDate.Date && e.StartTime.Date <= endDate.Date).ToList();
        return Task.FromResult(events);
    }

    public Task<CalendarEvent> CreateEventAsync(CalendarEvent calendarEvent)
    {
        calendarEvent.Id = Guid.NewGuid();
        _events.Add(calendarEvent);
        return Task.FromResult(calendarEvent);
    }

    public Task<CalendarEvent> UpdateEventAsync(CalendarEvent calendarEvent)
    {
        var existingEvent = _events.FirstOrDefault(e => e.Id == calendarEvent.Id);
        if (existingEvent != null)
        {
            var index = _events.IndexOf(existingEvent);
            _events[index] = calendarEvent;
        }
        return Task.FromResult(calendarEvent);
    }

    public Task<bool> DeleteEventAsync(Guid id)
    {
        var calendarEvent = _events.FirstOrDefault(e => e.Id == id);
        if (calendarEvent != null)
        {
            _events.Remove(calendarEvent);
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }

    public Task<bool> MoveTaskToDateAsync(Guid taskId, DateTime newDate)
    {
        var taskEvent = _events.FirstOrDefault(e => e.TaskId == taskId);
        if (taskEvent != null)
        {
            var duration = taskEvent.EndTime - taskEvent.StartTime;
            taskEvent.StartTime = newDate;
            taskEvent.EndTime = newDate.Add(duration);
            return Task.FromResult(true);
        }
        return Task.FromResult(false);
    }

    private List<CalendarEvent> GenerateSampleEvents()
    {
        return new List<CalendarEvent>
        {
            new CalendarEvent
            {
                Id = Guid.NewGuid(),
                Title = "Math Study Session",
                Description = "Focus time for math assignment",
                StartTime = DateTime.Today.AddHours(14),
                EndTime = DateTime.Today.AddHours(16),
                Type = CalendarEventType.Focus,
                Color = "#FF6B6B"
            },
            new CalendarEvent
            {
                Id = Guid.NewGuid(),
                Title = "Science Reading",
                Description = "Read Chapter 8",
                StartTime = DateTime.Today.AddHours(10),
                EndTime = DateTime.Today.AddHours(11),
                Type = CalendarEventType.Task,
                Color = "#4ECDC4"
            },
            new CalendarEvent
            {
                Id = Guid.NewGuid(),
                Title = "Break Time",
                Description = "Take a relaxing break",
                StartTime = DateTime.Today.AddHours(12),
                EndTime = DateTime.Today.AddHours(12.5),
                Type = CalendarEventType.Break,
                Color = "#45B7D1"
            },
            new CalendarEvent
            {
                Id = Guid.NewGuid(),
                Title = "Project Meeting",
                Description = "Team sync for quarterly review",
                StartTime = DateTime.Today.AddDays(1).AddHours(15),
                EndTime = DateTime.Today.AddDays(1).AddHours(16),
                Type = CalendarEventType.Meeting,
                Color = "#FFB347"
            }
        };
    }
}