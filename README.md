# Course Management Dashboard

A modern, responsive dashboard for managing programming courses at Tech Academy of Programming.

## Features

- Course Management (CRUD)
- Responsive design (mobile-first)
- Search & sort functionality
- Dark/Light mode
- Accessible components
- Session persistence
- Form validation
- Toast notifications

## Tech Stack

- Next.js
- Tailwind CSS
- ShadCN UI
- TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
bun install
```

3. Run the development server:
```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and login with:
- Username: admin
- Password: admin

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   └── page.tsx        # Main dashboard page
├── components/
│   ├── ui/            # UI components
│   ├── course-form.tsx    # Course add/edit form
│   ├── course-table.tsx   # Course listing table
│   ├── dashboard.tsx      # Dashboard block
│   ├── login-form.tsx     # Login form
│   └── logout-button.tsx  # Logout button
├── lib/
│   ├── context/       # Context providers
│       ├── course-context.tsx    # Course context provider
│       └── theme-provider.tsx    # theme context provider
│   ├── mock-data.ts   # Mock course data
│   ├── types.ts       # TypeScript types
│   ├── api.ts         # API functions ("Mock API")
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## Development

- Built with TypeScript and modern React patterns
- Uses ShadCN for consistent UI components
- Mobile-first responsive design
- Context API for state management
- Proper form validation and error handling
- Accessible following WCAG guidelines

## Future Improvements

1. API Integration:
   - Implement real API endpoints
   - Add proper error handling
   - Implement optimistic updates

2. Features:
   - Add course categories
   - Implement course enrollment
   - Add user authentication
   - Add course ratings and reviews

3. Testing:
   - Add unit tests
   - Add integration tests
   - Add end-to-end tests

