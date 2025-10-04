using ADHDHelper.MAUI.Models;

namespace ADHDHelper.MAUI.Services;

public interface ICalendarService
{
    Task<List<CalendarEvent>> GetEventsForDateAsync(DateTime date);
    Task<List<CalendarEvent>> GetEventsForRangeAsync(DateTime startDate, DateTime endDate);
    Task<CalendarEvent> CreateEventAsync(CalendarEvent calendarEvent);
    Task<CalendarEvent> UpdateEventAsync(CalendarEvent calendarEvent);
    Task<bool> DeleteEventAsync(Guid id);
    Task<bool> MoveTaskToDateAsync(Guid taskId, DateTime newDate);
}

public class CalendarEvent
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public CalendarEventType Type { get; set; }
    public Guid? TaskId { get; set; }
    public string Color { get; set; } = "#007ACC";
}

public enum CalendarEventType
{
    Task,
    Meeting,
    Reminder,
    Break,
    Focus
}