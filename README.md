![Foody](https://socialify.git.ci/aayushker/Foody/image?description=1&font=Raleway&name=1&owner=1&pattern=Plus&theme=Auto)
<div align="center" style="display: flex; flex-direction: column; align-items: center;">

*(under development)*

[![wakatime](https://wakatime.com/badge/user/018dccea-572d-4bff-b35f-74753ebb999c/project/fb23589a-a7d5-4332-8863-66398e69e6cd.svg)]()
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/letsfoody)](https://letsfoody.vercel.app)

</div>
Welcome to Foody, your go-to recipe website where you can explore, cook, and share your favorite dishes. This README provides detailed instructions on setting up, using, and understanding the features and technologies behind the Foody project.
The project is built using the Django REST Framework for the backend API and Next.js for the frontend application. The application allows users to register, login, and manage recipes, with an admin panel for site management.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- **User Authentication:** Secure login and registration using JWT tokens.
- **Dashboard:** Personalized user dashboard to manage profiles and recipes.
- **Recipe Management:** Add, edit and delete recipes with detailed information.
- **Responsive Design:** Optimized for both desktop and mobile devices.
- **Dark Mode:** Toggle between light and dark themes. 
- **SMTP Integration:** Send emails to users for notifications and updates.
- **Admin Panel:** Manage users, recipes, and other site content from the admin dashboard.
- **Deployment:** Dockerized application for easy deployment and scaling.

## Technologies Used
- **Frontend:**
  - Next.js
  - NextUI
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Tabler Icons
  - Jodit Editor
  - Axios
  - JWT-decode

- **Backend:**
  - Django
  - Django REST Framework
  - Simple JWT
  - Django CORS Headers
  - Pipenv
  - Render

- **Database**
  - PostgreSQL
  - Aiven
  - Firebase 

- **DevOps:**
  - Docker
  - Docker Compose

## Installation

### Prerequisites
- Node.js
- npm
- Python
- Docker

### Backend Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/aayushker/Foody 
   cd Foody/backend
2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate
3. **Install dependencies:**
   ```bash
    pip install -r requirements.txt
4. **Run the development server:**
    ```bash
    python manage.py runserver
### Frontend Setup
1. **Navigate to the frontend directory:**
   ```bash
   cd ../frontend
2. **Install dependencies:**
   ```bash
    npm install
3. **Run the development server:**
    ```bash
    npm run dev
### Docker Setup
1. **Build and run the Docker containers:**
   ```bash
   docker-compose up --build
## Usage
1. **Running the application:**
   - Open your browser and go to `http://localhost:3000` to access the frontend.
   - The backend API is available at `http://localhost:8000/api`.

2. **User Authentication:**
   - Register a new account or login with your account:

3. **Managing Recipes:**
   - Add, edit, or delete recipes from the dashboard.
   - Explore recipes from the homepage and view detailed information.

## Project Structure
The project is divided into two main directories: `frontend` and `backend`. The frontend directory contains the Next.js application, while the backend directory contains the Django REST API.

<pre>
Foody
├── backend
│   ├── backend/
│   ├── recipes/
│   ├── userAuth/
│   ├── SMTP/
│   ├── media/
│   ├── Dockerfile
│   ├── manage.py
│   ├── Pipfile
│   ├── requirements.txt
├── frontend
│   ├── app/
│   │   ├── components/
│   │   │   ├── AddRecipe/
│   │   │   │   ├── sections/
│   │   │   │   └── ui/
│   │   │   ├── context/
│   │   │   ├── ui
│   │   │   │   ├── auth/
│   │   │   ├── UserPanel/
│   │   │   │   ├── sections/
│   │   │   │   ├── ui/
│   │   ├── layout.tsx
│   ├── package.json
│   ├── pages
│   │   ├── addRecipe/ index.tsx
│   │   ├── explore/ index.tsx
│   │   ├── user/ index.tsx
│   │   └── index.tsx
└── README.md
</pre>

## API Endpoints
1. **Authentication:**
   - Register: `POST /api/register/`
   - Login: `POST /api/token/`

2. **Recipes:**
    - List Recipes: `GET /api/recipes/`
    - Create Recipe: `POST /api/addRecipe/`
    - Retrieve Recipe: `GET /api/user/recipe/:id/`
    - Update Recipe: `PUT /api/user/recipe/:id/`
    - Delete Recipe: `DELETE /api/user/recipe/:id/`

3. **Users:**
    - User Details: `GET /api/user/`
    - User Profile: `GET /api/user/profile/`
    - Update Profile: `PUT /api/users/profile/`
    - Update Credentials: `PUT /api/user/credentials/`
    - Refresh Token: `POST /api/token/refresh/`

4. **SMTP:**
    - Send Email: `POST /api/smtp/`

5. **Admin:**
    - Admin Panel: `/admin/`

## Contributing
This is a private project for learning purposes, and contributions are not accepted at this time. Suggestions and feedback are always welcome!

## License
This project is licensed under the [GNU GENERAL PUBLIC LICENSE](LICENSE).

Happy cooking with Foody! If you have any questions, feel free to reach me at singhaayushker@gmail.com.
