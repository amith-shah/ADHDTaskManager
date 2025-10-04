# ADHD Helper - .NET MAUI Blazor Hybrid

An advanced task management and scheduling application designed specifically for people with ADHD. Built with .NET MAUI Blazor Hybrid for cross-platform deployment.

## 🎯 Features

### ✅ Interactive Task Management
- **Visual Task Lists**: Color-coded priorities with ADHD-friendly design
- **Drag & Drop Reordering**: Intuitive task organization
- **Real-time Validation**: Instant feedback on task creation/editing
- **Smart Completion**: Animated task completion with celebration effects
- **Priority System**: Urgent, High, Medium, Low with visual indicators

### 📅 Smart Calendar Integration
- **Multiple Views**: Month, Week, and Day views
- **Drag & Drop Scheduling**: Move tasks between calendar dates
- **Visual Timeline**: Hour-by-hour day planning
- **Conflict Detection**: Avoid double-booking
- **Quick Actions**: Fast task creation for specific times

### 🎯 ADHD-Friendly Features
- **Focus Mode**: Distraction-free environment with timer
- **Progress Visualization**: Animated progress rings and charts
- **Motivational Feedback**: Celebration animations and encouraging messages
- **Break Reminders**: Pomodoro timer integration
- **Visual Hierarchy**: Clear information structure with minimal cognitive load

### 🔄 Microsoft Teams Integration (Planned)
- Sync with Teams for Education assignments
- Automatic task import from course announcements
- Two-way completion status updates
- Smart scheduling suggestions for assignment work

### 📱 Cross-Platform
- **Windows**: Native Windows app
- **macOS**: Native macOS app with menu bar integration
- **Android**: Touch-optimized mobile experience
- **Consistent UX**: Unified experience across all platforms

## 🛠️ Technology Stack

- **Framework**: .NET MAUI 9.0 with Blazor Hybrid
- **UI Components**: Bootstrap 5 + Custom ADHD-friendly CSS
- **Data Storage**: SQLite with Entity Framework Core (planned)
- **Caching**: Microsoft Hybrid Cache for performance
- **Authentication**: Microsoft Graph API for Teams integration
- **Animations**: CSS animations + JavaScript interop

## 🚀 Getting Started

### Prerequisites

- .NET 9.0 SDK
- Visual Studio 2022 17.8+ or Visual Studio Code
- Platform-specific requirements:
  - **Windows**: Windows 10 version 1809 or higher
  - **macOS**: macOS 13.1 or higher
  - **Android**: Android API 24 or higher

### Building and Running

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ADHDHelper.MAUI
   ```

2. **Restore dependencies**
   ```bash
   dotnet restore
   ```

3. **Run on different platforms**

   **Windows**
   ```bash
   dotnet build -f net9.0-windows10.0.19041.0
   dotnet run --framework net9.0-windows10.0.19041.0
   ```

   **macOS**
   ```bash
   dotnet build -f net9.0-maccatalyst
   dotnet run --framework net9.0-maccatalyst
   ```

   **Android** (requires Android SDK)
   ```bash
   dotnet build -f net9.0-android
   dotnet run --framework net9.0-android
   ```

### Development Setup

1. **Install MAUI workloads**
   ```bash
   dotnet workload install maui
   ```

2. **For Android development**
   ```bash
   dotnet workload install android
   ```

3. **For iOS/macOS development** (macOS only)
   ```bash
   dotnet workload install ios maccatalyst
   ```

## 📁 Project Structure

```
ADHDHelper.MAUI/
├── Components/
│   ├── Layout/           # Main layout components
│   ├── Pages/            # Blazor pages (Dashboard, Tasks, Calendar)
│   └── Shared/           # Reusable components
├── Models/               # Data models (TaskItem, CalendarEvent, etc.)
├── Services/             # Business logic and mock services
├── Resources/            # Fonts, images, styles
├── wwwroot/             # Static web assets
│   ├── css/             # Stylesheets
│   ├── js/              # JavaScript interop
│   └── lib/             # Third-party libraries
└── Platforms/           # Platform-specific code
    ├── Android/
    ├── iOS/
    ├── MacCatalyst/
    └── Windows/
```

## 🎨 Design Philosophy

This application is specifically designed for people with ADHD, incorporating:

- **Reduced Cognitive Load**: Clear visual hierarchy and minimal distractions
- **Immediate Feedback**: Instant visual responses to user actions
- **Gamification**: Progress tracking and celebration of achievements
- **Flexibility**: Multiple ways to organize and view tasks
- **Focus Support**: Built-in tools to maintain concentration

## 🧪 Current Status (Phase 1 - Interactive UI)

### ✅ Completed Features
- ✅ .NET MAUI Blazor Hybrid project setup
- ✅ Cross-platform configuration (Windows, macOS, Android)
- ✅ Interactive Dashboard with real-time stats
- ✅ Advanced task management with drag & drop
- ✅ Calendar views (Month, Week, Day)
- ✅ ADHD-friendly animations and feedback
- ✅ Focus mode with Pomodoro timer
- ✅ Responsive design for all screen sizes
- ✅ Accessibility features

### 🚧 In Development
- Task creation and editing modals
- Local data persistence
- Notification system
- Settings and preferences

### 📋 Planned Features
- Microsoft Teams for Education integration
- Cloud synchronization
- Advanced reminder system
- Analytics and progress tracking
- Widget support
- Voice commands (where supported)

## 🤝 Contributing

This project is designed to help people with ADHD manage their tasks more effectively. Contributions that improve accessibility, usability, or add ADHD-friendly features are especially welcome.

## 📄 License

[License information to be added]

## 💡 Feedback

Since this is designed specifically for ADHD users, feedback from the ADHD community is invaluable. Please share your experience and suggestions!