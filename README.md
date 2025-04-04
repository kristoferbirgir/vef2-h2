# KRAB Project

KRAB is a full-stack web application designed to provide a unique interactive experience where users can sign up, log in, view images with ratings, and rate images. The project uses Next.js for the frontend, Hono for the backend API, and Prisma with PostgreSQL for data management.

## Concepts & Architecture

- **User Authentication & Role Management:**  
  Users register and log in with a username and password. Two roles exist:
  - **PLAYER:** Regular users who can view and rate images.
  - **ADMIN:** Users with elevated privileges who can upload images and manage content.
  
  Pre-created test accounts:
  - **Admin:** Username: `admin` | Password: `Test123!`
  - **Player:** Username: `player` | Password: `Test123!`

- **Image Feed & Rating System:**  
  The application fetches a random image along with its rating information from the backend. Users can vote (like/dislike) on images, and the system calculates the median rating.

- **Optimized Frontend Rendering:**  
  The frontend is built with Next.js and utilizes the `<Image />` component for image optimization, improving performance and user experience.

- **Backend API with Hono:**  
  The backend API is built using Hono. It handles user authentication, image uploads, rating submissions, and returns aggregated rating data (like the median rating). CORS is configured to allow requests from the Netlify-hosted frontend.

- **Data Management with Prisma & PostgreSQL:**  
  Prisma ORM manages the database schema and migrations. The PostgreSQL database connection is configured through environment variables. Prisma Studio is available for manual data inspection or updates.

- **Team & Collaboration:**  
  The project is a collaborative effort with contributions from:
  - **Kristófer Birgir** - [GitHub](https://github.com/kristoferbirgir)
  - **Benjamin Reynir** - [GitHub](https://github.com/Reynirjr)
  - **Ari Gunnar** - [GitHub](https://github.com/forriddAri)
  - **Róbert Orri** - [GitHub](https://github.com/Robertorri)

## Prerequisites

- Node.js 
- npm
- PostgreSQL database

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kristoferbirgir/vef2-h2.git
   cd vef2-h2
