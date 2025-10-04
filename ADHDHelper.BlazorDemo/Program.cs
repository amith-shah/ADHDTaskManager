using ADHDHelper.BlazorDemo.Components;
using ADHDHelper.BlazorDemo.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorComponents()
    .AddInteractiveServerComponents();

// Add our services
builder.Services.AddSingleton<ITaskService, MockTaskService>();
builder.Services.AddSingleton<ICalendarService, MockCalendarService>();
builder.Services.AddSingleton<IReminderService, MockReminderService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error", createScopeForErrors: true);
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();
app.UseAntiforgery();

app.MapRazorComponents<App>()
    .AddInteractiveServerRenderMode();

app.Run();