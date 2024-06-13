```markdown
# CHAT BOT CARREFOUR 


## Folder Structure
Here is an overview of the folder structure of this project:

```
.
├── controllers    # Contains the controllers for handling incoming requests
├── database       # Database configuration and connection
├── middlewares    # Custom middlewares for the application
├── node_modules   # Node.js modules
├── prisma         # Prisma schema and related files
├── public         # Public assets like images, CSS, and JavaScript files
├── router         # Defines the routes for the application
├── services       # Services for business logic
├── types          # TypeScript type definitions
├── .env           # Environment variables
├── .gitignore     # Files and directories to be ignored by Git
├── app.ts         # Main application file
├── package-lock.json  # Lockfile for npm dependencies
├── package.json   # Project dependencies and scripts
├── readme.md      # Project documentation
└── tsconfig.json  # TypeScript configuration
```

## Setup

### Prerequisites
- Node.js
- npm

### Installation
1. Clone the repository:

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the root directory of the project and add the following variables:

```
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
ACCESS_TOKEN=your_access_token
```

### Prisma Setup
1. Initialize Prisma:
   ```bash
   npx prisma init
   ```

2. Generate Prisma Client:
   ```bash
   npx prisma generate
   ```

3. Apply the migrations:
   ```bash
   npx prisma migrate dev
   ```

### Running the Application
Start the application in development mode:
```bash
npm run dev


### Running the Migration 
Start the seed 
```bash
npm run seed
