## Setup

### Frontend

1. **Clone & Install:**
   ```bash
   git clone git@github.com:synntx/gdriveSearch.git
   cd gdriveSearch/frontend
   npm install
   ```
2. **Configure:**
   - Create a `.env` in the `frontend` root:
     ```env
     VITE_API_URL=http://localhost:3001
     ```
3. **Run:**
   ```bash
   npm run dev
   ```
   The app runs at [http://localhost:5173](http://localhost:5173).

### Backend

1. **Navigate & Install:**
   ```bash
   cd ../backend
   npm install
   ```
2. **Migrate Database:**
   ```bash
   npm run dev
   ```
3. **Configure:**
   - Create a `.env` in the `backend` root with:
   ```env
    PORT=3001
    GOOGLE_CLIENT_ID=
    GOOGLE_CLIENT_SECRET=
    REDIRECT_URL=http://localhost:3001/auth/google/callback
    PINECONE_API_KEY=
    PINECONE_INDEX=gdrive-search
    GEMINI_API_KEY=
    FRONTEND_URL=http://localhost:5173
     ```
4. **Run:**
   ```bash
   npm run dev
   ```
   The backend is available at [http://localhost:3001](http://localhost:3001).
