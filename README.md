# Katalyst Meetings - AI-Powered Meeting Summary System

**Candidate:** Om Sushil Narkar  
**Contact:** 7972755279 | omnaarkar43@gmail.com  
**Live Application:** https://katalyst-takehome-groq.vercel.app  
**GitHub Repository:** https://github.com/OmNarkar777/katalyst-takehome-groq

---

## Project Overview

This is a full-stack meeting management application developed for the Katalyst Founding Engineer position. The system demonstrates integration with calendar systems through Model Context Protocol (MCP), AI-powered meeting summarization using Groq LLM, and persistent data storage with Supabase.

The application displays both upcoming and past meetings, allows users to generate intelligent summaries of meeting content, and maintains a comprehensive logging system for all operations. The project was completed within a 5-8 hour timeframe while maintaining production-quality code standards.

---

## Core Features

### Meeting Management System

The application provides a complete view of calendar meetings with full details including titles, dates, attendee lists, and descriptions. Users can easily browse through upcoming meetings and review past meeting history in an intuitive interface.

### AI-Powered Summarization

Each meeting can be summarized using an AI language model. The system supports two modes of operation:

**Mock Mode:** Generates summaries without requiring API credentials, useful for development and testing.

**Production Mode:** Integrates with Groq's Llama model for real AI-powered summaries when an API key is provided.

The summarization process works as follows:

First, the system builds a transcript from the meeting description. If no description exists, it generates a mock transcript containing the meeting title, duration, and attendee information. This transcript is then sent to the summarization endpoint, which returns an intelligent summary. The summary is persisted to the database and displayed to the user in real-time.

### Supabase Database Integration

All summaries and system operations are logged to a Supabase PostgreSQL database. The database schema includes a logs table that stores:

- Unique identifiers for each log entry
- Summary message content
- Associated meeting IDs
- Timestamp information for tracking

The database runs locally during development using Supabase CLI and Docker, ensuring a consistent development environment.

### Complete API Layer

The backend provides several RESTful endpoints:

**GET /api/meetings** returns the list of upcoming and past meetings with complete details.

**POST /api/summarize** accepts a meeting ID and transcript, then returns an AI-generated summary.

**POST /api/log** stores summary and operation logs in the database.

**GET /api/logs** retrieves all stored logs for the system dashboard.

All endpoints include proper error handling and return structured JSON responses.

### User Interface Design

The interface is built with modern web technologies and focuses on usability. Key UI features include:

Loading states with skeleton screens during data fetching, optimistic UI updates that show "Generating summary..." messages before server responses arrive, comprehensive error messages with retry capabilities, and a responsive layout that works across different screen sizes.

The design prioritizes clarity over complexity, ensuring users can quickly understand and use the system.

---

## Bonus Features

### System Logs Dashboard

A dedicated logs page is available at the /logs route. This dashboard displays all system operations including:

- Generated summaries with their full content
- Meeting IDs associated with each operation
- Precise timestamps for audit trails
- Automatic sorting from newest to oldest entries

This feature provides transparency into system operations and helps with debugging and monitoring.

### Robust Error Handling

Every API endpoint includes comprehensive error handling. When operations fail, the system returns structured error messages that help identify the issue. The UI displays these errors clearly and provides retry options when appropriate.

Even if logging operations fail, the main functionality continues to work. The system uses optimistic UI updates to ensure a responsive user experience regardless of backend state.

### End-to-End Testing

The project includes testing infrastructure using PowerShell scripts and cURL commands. These tests verify that all API endpoints work correctly and that the database operations succeed.

---

## Technical Architecture

### Frontend Stack

The frontend is built with Next.js 14 and React 18, taking advantage of server-side rendering and modern React features. Tailwind CSS provides utility-first styling that keeps the CSS bundle small and maintainable.

### Backend Infrastructure

Next.js Route Handlers serve as the API layer, providing serverless functions that handle requests efficiently. Supabase provides PostgreSQL database functionality with a simple JavaScript client. The Groq LLM integration offers fast AI summarization when needed.

The architecture is designed to be MCP-ready, with endpoints structured to easily integrate with Model Context Protocol specifications.

### Local Development Environment

Development uses Docker Desktop to run Supabase locally, ensuring consistency between development and production environments. The Supabase CLI manages database migrations and provides development tools. On Windows systems, WSL2 provides the Linux compatibility layer needed for these tools.

---

## Project Structure

The codebase is organized as follows:

```
Project Root
├── pages/
│   ├── index.tsx          (Main meetings interface)
│   ├── logs.tsx           (System logs dashboard)
│   └── api/
│       ├── meetings.ts    (Meeting data endpoint)
│       ├── summarize.ts   (AI summarization endpoint)
│       ├── log.ts         (Database logging endpoint)
│       └── logs.ts        (Log retrieval endpoint)
├── supabase/
│   ├── migrations/        (Database schema changes)
│   ├── config.toml        (Supabase configuration)
│   └── seed.sql          (Initial data)
└── README.md
```

This structure keeps concerns separated and makes the codebase easy to navigate.

---

## Getting Started

### Prerequisites

Before running the application, ensure you have installed:

- Node.js version 16 or higher
- npm or yarn package manager
- Docker Desktop for running Supabase
- Supabase CLI for database management
- Git for version control

On Windows, you will also need WSL2 enabled.

### Installation Steps

First, clone the repository to your local machine:

```bash
git clone https://github.com/OmNarkar777/katalyst-takehome-groq
cd katalyst-takehome-groq
```

Install all project dependencies:

```bash
npm install
```

Start the Supabase local development environment:

```bash
supabase start
```

This command will output the local database URL and anonymous key. Keep these values for the next step.

Create a file named `.env.local` in the project root with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_from_supabase_start

GROQ_API_KEY=your_groq_key_here
```

The Supabase URL and anonymous key come from the `supabase start` command output. The Groq API key is optional - the application will use mock summaries if no key is provided.

Start the Next.js development server:

```bash
npm run dev
```

Open your browser to http://localhost:3000 to see the application running.

---

## API Documentation

### Meeting Retrieval

**Endpoint:** GET /api/meetings

**Description:** Returns all meetings, separated into upcoming and past categories.

**Response Format:**
```json
{
  "upcoming": [...],
  "past": [...]
}
```

Each meeting object includes id, title, start time, end time, attendees array, and optional description.

### Summary Generation

**Endpoint:** POST /api/summarize

**Request Body:**
```json
{
  "meetingId": "meeting_123",
  "transcript": "meeting content to summarize"
}
```

**Response:** Returns a summary string generated by the AI model.

The transcript parameter should contain the meeting description or a generated mock transcript if no description exists.

### Log Storage

**Endpoint:** POST /api/log

**Request Body:**
```json
{
  "message": "summary content or log message",
  "meetingId": "meeting_123"
}
```

**Response:** Confirms successful storage in the database.

This endpoint is called after summary generation to persist the results.

### Log Retrieval

**Endpoint:** GET /api/logs

**Description:** Returns all logged operations from the database.

**Response:** Array of log objects with id, message, meeting_id, and created_at fields.

Logs are automatically sorted by creation time with newest entries first.

---

## Implementation Details

### Transcript Building

When a user requests a summary, the system first needs to create a transcript. If the meeting has a description field, that description is used as the transcript. For meetings without descriptions, the system generates a mock transcript using this format:

"Mock transcript for [Meeting Title] — duration: X minutes. Attendees: [attendee list]."

This ensures that every meeting can be summarized regardless of available data.

### Summarization Pipeline

The complete summarization flow works like this:

1. User clicks the Generate Summary button on a meeting card
2. Frontend builds a transcript from available meeting data
3. A POST request is sent to /api/summarize with meeting ID and transcript
4. The API endpoint calls either the mock summarizer or real Groq API
5. Summary is returned and displayed in the UI
6. A second request to /api/log saves the summary to the database
7. The logs dashboard is updated with the new entry

This pipeline ensures that summaries are generated quickly while maintaining a persistent record of all operations.

### Database Schema

The Supabase database includes a single logs table with the following schema:

- id: UUID primary key generated automatically
- message: Text field storing the summary or log content
- meeting_id: String field linking to the meeting
- created_at: Timestamp with timezone, defaults to current time

This simple schema is intentionally minimal to keep the evaluation focused while still demonstrating database integration.

---

## Design Decisions and Tradeoffs

### Time Constraints

The project was developed within a 5-8 hour timeframe as specified in the requirements. This constraint influenced several decisions to prioritize core functionality over extensive features.

### Simplified LLM Integration

The summarization prompt is intentionally straightforward to ensure fast processing and reliable results. A production system would use more sophisticated prompting strategies, but for this demonstration, clarity and speed were prioritized.

### MCP Integration Strategy

The Model Context Protocol integration is scaffolded with proper API structure in place. The current implementation uses mock meeting data, but the architecture is ready for real MCP connections when calendar access is configured.

### Single Table Database Design

The logging system uses a single database table rather than a complex schema. This decision keeps the codebase simple and evaluation focused while still demonstrating database operations, migrations, and data persistence.

### Mock vs Real Summarization

The application supports both mock and real AI summarization. Mock mode allows the application to run without any external API dependencies, making it easier to evaluate. Real mode demonstrates actual LLM integration when credentials are available.

### UI Complexity

The interface avoids unnecessary complexity and focuses on clear information presentation. This reflects the understanding that for a technical assessment, demonstrating solid functionality and code quality is more important than extensive UI polish.

---

## Testing and Verification

The application has been tested using several methods:

Manual testing across different browsers verified that the UI works correctly and displays information properly. API endpoints were tested using PowerShell scripts and cURL commands to ensure they return correct data and handle errors appropriately.

Database operations were verified by checking that logs are stored correctly and can be retrieved. The Supabase dashboard provides a convenient interface for inspecting database contents during development.

Error conditions were simulated to verify that the error handling works correctly. This included testing network failures, invalid inputs, and database connection issues.

---

## Deployment

The application is deployed on Vercel and accessible at the URL provided at the top of this document. The deployment process is straightforward:

Vercel automatically detects Next.js projects and configures the build process. Environment variables are set in the Vercel dashboard to provide production API keys and database credentials. The deployment is connected to the main Git branch for continuous deployment.

---

## Future Enhancements

While the current implementation meets all requirements, several enhancements could be added in the future:

Real Google Calendar integration through OAuth authentication would replace the mock meeting data with actual calendar events. More sophisticated summarization prompts could extract action items, key decisions, and follow-up tasks from meetings.

User authentication would allow multiple users to manage their own meetings and summaries. Analytics and reporting features could provide insights into meeting patterns and time usage.

The MCP integration could be expanded to support additional calendar systems and scheduling tools beyond Google Calendar.

---

## Contact Information

For questions about this implementation or to discuss the technical approach, please contact:

Om Sushil Narkar  
Email: omnaarkar43@gmail.com  
Phone: 7972755279

Thank you for reviewing this submission. I welcome the opportunity to discuss the implementation in detail and answer any questions about the architecture, design decisions, or code quality.
