using Microsoft.Extensions.Logging;
using CommunityToolkit.Maui;
using ADHDHelper.MAUI.Components;
using ADHDHelper.MAUI.Services;

namespace ADHDHelper.MAUI;

public static class MauiProgram
{
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .UseMauiCommunityToolkit()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
            });

        // Add device-specific services used by the Components project
        builder.Services.AddMauiBlazorWebView();

        // Add services
        builder.Services.AddSingleton<ITaskService, MockTaskService>();
        builder.Services.AddSingleton<ICalendarService, MockCalendarService>();
        builder.Services.AddSingleton<IReminderService, MockReminderService>();

#if DEBUG
        builder.Services.AddBlazorWebViewDeveloperTools();
        builder.Logging.AddDebug();
#endif

        return builder.Build();
    }
}