# Course Management Dashboard

A modern, responsive course management dashboard built with Next.js, ShadCN, and Tailwind CSS. This application allows administrators to manage course information with a clean and intuitive interface.

## Features

- 📚 Course listing with detailed information
- ➕ Add new courses
- ✏️ Edit existing courses
- 🗑️ Delete courses with confirmation
- 🔍 Search courses by title or instructor
- 📱 Fully responsive design
- 🎨 Modern UI with ShadCN components

## Tech Stack

- **Framework:** Next.js 14
- **UI Components:** ShadCN
- **Styling:** Tailwind CSS
- **State Management:** React Context API
- **Type Safety:** TypeScript

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   └── page.tsx              # Main dashboard page
├── components/
│   ├── course-form.tsx       # Course form component
│   └── course-table.tsx      # Course table component
├── lib/
│   ├── context/
│   │   └── course-context.tsx # Course state management
│   ├── types.ts             # TypeScript interfaces
│   └── mock-data.ts         # Mock course data
└── public/                  # Static assets
```

## Features in Detail

### Course Management
- View all courses in a clean, tabular format
- Add new courses with title, description, instructor name, and duration
- Edit existing course information
- Delete courses with a confirmation dialog

### Search Functionality
- Real-time search across course titles and instructor names
- Instant filtering of course list

### User Interface
- Modern, clean design using ShadCN components
- Responsive layout that works on all devices
- Intuitive modals for adding and editing courses
- Confirmation dialogs for destructive actions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
