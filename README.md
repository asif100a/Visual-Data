## Project Title

# Visual Data

This is a student related web project. I have implemented full stack work for this project. In this project, the client side is built by Next.js and server side connected to Supabase. Also, I have implemented its authentication using Supabase. Any logged user can create student, update student, and delete student and it will be shown in the dashboard home page as a radial progress and in the Charts page as three types charts(Bar Chart, Line Chart, Pie Chart).

Live Link: https://visual-data-amber.vercel.app/

## To Run The Project Locally

First, install the npm package:

```bash
npm install
#or
yarn install
```

Second, create a environment variable file like .env.local and include these variables:
```bash
NEXT_PUBLIC_IMAGE_UPLOAD_API=e5a7f3eae707c4cb41c993609fff52c2
NEXT_PUBLIC_SUPABASE_URL=https://tkdrsdjwrtiysnkwbkxi.supabase.co
NEXT_PUBLIC_SUPABASE_API_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRrZHJzZGp3cnRpeXNua3dia3hpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjg1Mzk2MzgsImV4cCI6MjA0NDExNTYzOH0.UpcctXEISUEjB9b0xmfi6e7BiJ8wOE8oWkoUBf3OrmI
```

Finally, run the project:
```bash
npm run dev
#or
yarn dev
```

## Front-end:
- Next.js
- Recharts
- React-icons
- Other technologies

## Back-end:
- Supabase

## Authentication:
- Supabase