# Course Management Dashboard

A modern, responsive dashboard for managing programming courses at Tech Academy of Programming.

## Features

- 📚 Course Management (CRUD operations)
- 🔍 Search and filter courses
- 📱 Fully responsive design
- 🌓 Dark/Light mode support
- ♿ Accessible UI components
- 🔄 Real-time updates
- ⚡ Fast and performant

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **UI Components**: ShadCN UI
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide Icons
- **Theme**: next-themes

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── layout.tsx      # Root layout with theme provider
│   └── page.tsx        # Main dashboard page
├── components/
│   ├── ui/            # ShadCN UI components
│   ├── course-form.tsx    # Course add/edit form
│   ├── course-table.tsx   # Course listing table
│   └── theme-toggle.tsx   # Theme switcher
├── lib/
│   ├── context/       # Context providers
│   ├── types/         # TypeScript types
│   └── utils.ts       # Utility functions
└── public/            # Static assets
```

## Design Choices

1. **Component Architecture**:
   - Used a modular approach with separate components for forms, tables, and UI elements
   - Implemented reusable UI components using ShadCN UI

2. **State Management**:
   - Chose Context API over Redux for simpler state management
   - Implemented a custom course context for global state

3. **Styling**:
   - Used Tailwind CSS for utility-first styling
   - Implemented responsive design using Tailwind's breakpoint classes
   - Added dark mode support using next-themes

4. **Accessibility**:
   - Used semantic HTML elements
   - Added ARIA labels and roles
   - Ensured keyboard navigation support
   - Implemented proper focus management

5. **Performance**:
   - Used Next.js App Router for better performance
   - Implemented client-side state management for instant updates
   - Added loading states for better UX

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

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
