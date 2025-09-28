# Question Papers Management System

## Project Structure
```
question-papers-admin/
├── src/
│   ├── app/
│   │   ├── subjects/
│   │   │   └── page.tsx
│   │   ├── questions/
│   │   │   └── [subjectId]/
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   ├── subjects/
│   │   │   │   └── route.ts
│   │   │   └── questions/
│   │   │       ├── route.ts
│   │   │       └── [id]/
│   │   │           └── route.ts
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── SubjectForm.tsx
│   │   ├── QuestionForm.tsx
│   │   ├── QuestionList.tsx
│   │   └── Navigation.tsx
│   ├── lib/
│   │   ├── mongodb.ts
│   │   └── cloudinary.ts
│   ├── models/
│   │   ├── Subject.ts
│   │   └── Question.ts
│   └── types/
│       └── index.ts
├── package.json
├── tailwind.config.js
├── next.config.js
└── .env.local
```

## Package.json
```json

```

## Environment Variables (.env.local)
```env

```

## Configuration Files

### next.config.js
```javascript
/** @type {import('next').NextConfig} */

```

### tailwind.config.js
```javascript
/** @type {import('tailwindcss').Config} */

```

## Database Models

### src/models/Subject.ts
```typescript

```

### src/models/Question.ts
```typescript

```

## Database Connection

### src/lib/mongodb.ts
```typescript

```

### src/lib/cloudinary.ts
```typescript

```

## Types

### src/types/index.ts
```typescript

```

## API Routes

### src/app/api/subjects/route.ts
```typescript

```

### src/app/api/questions/route.ts
```typescript

```

### src/app/api/questions/[id]/route.ts
```typescript

```

## Components

### src/components/Navigation.tsx
```typescript

```

### src/components/SubjectForm.tsx
```typescript

```

### src/components/QuestionForm.tsx
```typescript

```

### src/components/QuestionList.tsx
```typescript

```

## Pages

### src/app/layout.tsx
```typescript

```

### src/app/globals.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: system-ui, -apple-system, sans-serif;
}
```

### src/app/page.tsx
```typescript

```

### src/app/subjects/page.tsx
```typescript

```

### src/app/questions/[subjectId]/page.tsx
```typescript

```

## Setup Instructions

1. **Install Dependencies:**
```bash
npm install
```

2. **Environment Setup:**
Create `.env.local` with your MongoDB and Cloudinary credentials

3. **Run Development Server:**
```bash
npm run dev
```

4. **Features:**
- ✅ Subject management (add, list)
- ✅ Question paper upload with file handling
- ✅ File storage in Cloudinary
- ✅ Question paper listing and deletion
- ✅ Responsive design with TailwindCSS
- ✅ TypeScript support
- ✅ Error handling and loading states
- ✅ Toast notifications

The application is ready to use with all requested features implemented!