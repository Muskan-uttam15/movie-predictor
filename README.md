# Movie Recommender System

A full-stack movie recommendation system with a modern web interface, featuring both content-based and collaborative filtering approaches.

## Features

- **Content-Based Filtering**: Recommends movies based on genre similarity using TF-IDF vectorization and cosine similarity
- **Collaborative Filtering**: Uses SVD (Singular Value Decomposition) algorithm to predict user ratings and recommend movies
- **Modern Web UI**: React-based frontend with TailwindCSS for a beautiful, responsive interface
- **REST API**: Flask backend with comprehensive API endpoints
- **Docker Support**: Containerized deployment for easy setup and scaling

## Project Structure

```
movie-recommender/
├── backend/
│   └── app.py              # Flask API server
├── frontend/
│   ├── src/
│   │   ├── pages/          # React page components
│   │   ├── App.jsx         # Main React app
│   │   └── main.jsx        # React entry point
│   ├── package.json        # Frontend dependencies
│   └── Dockerfile          # Frontend Docker config
├── recommender/
│   ├── __init__.py
│   ├── content_based.py    # Content-based recommendation logic
│   └── collaborative.py    # Collaborative filtering logic
├── app/
│   └── main.py              # CLI version (legacy)
├── data/
│   ├── movies.csv          # Movie metadata (movieId, title, genres)
│   ├── ratings.csv         # User ratings (userId, movieId, rating, timestamp)
│   ├── bollywood.csv       # Bollywood movie dataset
│   └── hollywood.csv       # Hollywood movie dataset (placeholder)
├── notebooks/              # Jupyter notebooks for analysis
├── requirements.txt         # Python dependencies
├── docker-compose.yml      # Docker orchestration
├── Dockerfile.backend      # Backend Docker config
└── README.md              # This file
```

## Quick Start with Docker

The easiest way to run the application is using Docker:

```bash
docker-compose up --build
```

This will start both the backend (port 5000) and frontend (port 3000) services.

Access the application at: http://localhost:3000

## Manual Installation & Deployment

### Step 1: Backend Setup

1. **Navigate to project root:**
```bash
cd movie-recommender
```

2. **Create a virtual environment:**
```bash
python -m venv .venv
```

3. **Activate the virtual environment:**
- Windows: `.venv\Scripts\activate`
- Linux/macOS: `source .venv/bin/activate`

4. **Install Python dependencies:**
```bash
pip install -r requirements.txt
```

5. **Run the Flask backend:**
```bash
python backend/app.py
```

The API will be available at: http://localhost:5000

**Verify backend is running:**
- Open http://localhost:5000/api/health in your browser
- You should see: `{"status": "healthy", "message": "Movie Recommender API is running"}`

### Step 2: Frontend Setup

1. **Navigate to the frontend directory:**
```bash
cd frontend
```

2. **Install Node.js dependencies:**
```bash
npm install
```

3. **Configure API connection:**
   The frontend is already configured to connect to the backend via the Vite proxy in `vite.config.js`:
   ```javascript
   server: {
     port: 3000,
     proxy: {
       '/api': {
         target: 'http://localhost:5000',
         changeOrigin: true
       }
     }
   }
   ```

4. **Run the development server:**
```bash
npm run dev
```

The frontend will be available at: http://localhost:3000

### Step 3: Connecting Frontend and Backend

The frontend and backend are automatically connected through the Vite proxy configuration:

**How it works:**
- Frontend runs on port 3000
- Backend runs on port 5000
- Vite proxy forwards all `/api` requests from frontend to backend
- CORS is enabled on the backend to allow cross-origin requests

**Manual connection (if needed):**
If you need to change the backend URL, modify `frontend/src/pages/` files to use the full API URL:
```javascript
// Change from:
axios.post('/api/recommend/content-based', ...)

// To (for different backend):
axios.post('http://your-backend-url:5000/api/recommend/content-based', ...)
```

**Testing the connection:**
1. Ensure both backend and frontend are running
2. Open http://localhost:3000 in your browser
3. Navigate to "Content-Based" page
4. Enter a movie title (e.g., "Toy Story (1995)")
5. Click "Get Recommendations"
6. If successful, you'll see similar movie recommendations

### Step 4: Production Deployment

#### Backend Production Setup

1. **Install production WSGI server:**
```bash
pip install gunicorn
```

2. **Run with Gunicorn:**
```bash
gunicorn -w 4 -b 0.0.0.0:5000 backend.app:app
```

3. **Or use Docker:**
```bash
docker build -f Dockerfile.backend -t movie-recommender-backend .
docker run -p 5000:5000 movie-recommender-backend
```

#### Frontend Production Setup

1. **Build the frontend:**
```bash
cd frontend
npm run build
```

2. **The build output will be in `dist/` directory**

3. **Serve with a production web server (nginx example):**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /path/to/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

4. **Or use Docker:**
```bash
cd frontend
docker build -t movie-recommender-frontend .
docker run -p 3000:80 movie-recommender-frontend
```

#### Full Docker Deployment

Use Docker Compose for the easiest production deployment:

```bash
# Build and start all services
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Movies
- `GET /api/movies` - Get all movies with pagination
- `GET /api/movies/:id` - Get a specific movie by ID
- `GET /api/genres` - Get all unique genres
- `GET /api/movies/genre/:genre` - Get movies by genre

### Recommendations
- `POST /api/recommend/content-based` - Get content-based recommendations
  ```json
  {
    "movie_title": "Toy Story (1995)",
    "top_n": 5
  }
  ```
- `POST /api/recommend/collaborative` - Get collaborative filtering recommendations
  ```json
  {
    "user_id": 1,
    "top_n": 5
  }
  ```

## Usage

### Web Interface

1. Open http://localhost:3000 in your browser
2. Navigate to different sections:
   - **Home**: Overview and features
   - **Content-Based**: Enter a movie title to get similar recommendations
   - **Collaborative**: Enter a user ID to get personalized recommendations
   - **Browse Movies**: Search and explore the movie database

### CLI Version (Legacy)

You can still run the original CLI version:
```bash
python app/main.py
```

## Datasets

- **movies.csv**: Contains 10,329 movies with genres
- **ratings.csv**: Contains 105,339 user ratings
- **bollywood.csv**: Bollywood movie dataset with additional metadata

## Technologies Used

### Backend
- **Flask**: Web framework for REST API
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical computing
- **scikit-learn**: Machine learning algorithms (TF-IDF, cosine similarity)
- **surprise**: Collaborative filtering library
- **flask-cors**: CORS support for API

### Frontend
- **React**: UI library
- **Vite**: Build tool and dev server
- **TailwindCSS**: Utility-first CSS framework
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **Lucide React**: Icon library

### Deployment
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy (production)

## Deployment

### Docker Deployment

Build and run with Docker Compose:
```bash
docker-compose up -d
```

### Production Deployment

For production deployment:
1. Set environment variables in `docker-compose.yml`
2. Use a production WSGI server like Gunicorn
3. Configure proper CORS settings
4. Set up a proper database for user data
5. Implement authentication and rate limiting

## Future Enhancements

- Add user authentication and profiles
- Implement hybrid recommendation system
- Add movie posters and metadata from TMDB API
- Include rating and review system
- Add watchlist and favorites functionality
- Implement real-time recommendations
- Add more recommendation algorithms
- Deploy to cloud platforms (AWS, GCP, Azure)
