# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an ASP.NET Core 9.0 Blazor Server application called "ADHDHelper" that uses modern caching with Microsoft's Hybrid Cache system and SQL Server for distributed caching.

## Technology Stack

- **Framework**: ASP.NET Core 9.0 (Blazor Server)
- **Language**: C# with nullable reference types enabled
- **Caching**: Microsoft.Extensions.Caching.Hybrid with SQL Server distributed cache
- **UI**: Blazor Server components with Bootstrap 5
- **Database**: SQL Server LocalDB (development)

## Development Commands

### Build and Run
```bash
# Build the solution
dotnet build

# Run the application (development)
dotnet run --project ADHDHelper

# Run with specific launch profile
dotnet run --project ADHDHelper --launch-profile https
```

### Package Management
```bash
# Add a NuGet package
dotnet add ADHDHelper package <PackageName>

# Restore packages
dotnet restore
```

## Project Structure

### Key Directories
- `ADHDHelper/` - Main application project
  - `Components/` - Blazor components
    - `Layout/` - Layout components (MainLayout, NavMenu)
    - `Pages/` - Page components (Home, Counter, Weather, Error)
  - `Properties/` - Launch settings
  - `wwwroot/` - Static web assets including Bootstrap

### Configuration Files
- `Aut.sln` - Visual Studio solution file
- `ADHDHelper/ADHDHelper.csproj` - Project file with .NET 9.0 target
- `ADHDHelper/appsettings.json` - Production configuration with SQL Server connection string
- `ADHDHelper/appsettings.Development.json` - Development-specific settings

## Architecture Notes

### Caching Strategy
The application implements a two-tier caching strategy:
- **L1 Cache**: In-memory cache with 1-minute expiration
- **L2 Cache**: SQL Server distributed cache with 5-minute expiration
- **Configuration**: 1MB max payload, 1KB max key length

### Database Configuration
- Uses SQL Server LocalDB for development
- Connection string: `Server=(localdb)\\mssqllocaldb;Database=ADHDHelperDb;Trusted_Connection=true;MultipleActiveResultSets=true`
- Cache table: `dbo.Cache`

### Blazor Configuration
- Interactive Server Components enabled
- Uses `AddInteractiveServerRenderMode()`
- Antiforgery protection enabled
- Static asset mapping configured

## Development URLs
- HTTP: http://localhost:5202
- HTTPS: https://localhost:7024

## Important Notes
- No existing tests found - consider adding unit/integration tests when implementing new features
- Uses implicit usings and nullable reference types
- Bootstrap 5 is included for UI styling
- Application follows standard ASP.NET Core conventions