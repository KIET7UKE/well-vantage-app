# WellVantage - Gym Management & Personal Training

WellVantage is a full-stack mobile application designed for personal trainers and gym enthusiasts. It streamlines workout planning, availability management, and client scheduling.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [React Native](https://reactnative.dev/) (TypeScript)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Navigation**: [React Navigation](https://reactnavigation.org/)
- **Authentication**: [@react-native-google-signin/google-signin](https://github.com/react-native-google-signin/google-signin)
- **Icons**: [Lucide React Native](https://lucide.dev/guide/react-native)

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Dockerized)
- **Security**: [Passport.js](https://www.passportjs.org/) (JWT & Google OAuth2)
- **Validation**: [class-validator](https://github.com/typestack/class-validator)

---

## 🛠️ Project Setup

### Prerequisites
- [Node.js](https://nodejs.org/) (LTS)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for Database)
- [Android Studio](https://developer.android.com/studio) / [Xcode](https://developer.apple.com/xcode/) (for Mobile Development)

---

### 1. Backend Setup (Server)

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the example template and fill in your credentials (Google Client ID, JWT Secret, etc.):
   ```bash
   cp .env.example .env
   ```

4. **Start the Database**:
   Launch the PostgreSQL container using Docker Compose:
   ```bash
   docker-compose up -d
   ```

5. **Start the Server**:
   ```bash
   npm run start:dev
   ```
   The backend will be available at `http://localhost:3000`.

---

### 2. Frontend Setup (Mobile App)

1. **Install root dependencies**:
   ```bash
   npm install
   ```

2. **Install iOS Native Modules** (macOS only):
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Run the Application**:
   - **Android**:
     ```bash
     npm run android
     ```
   - **iOS**:
     ```bash
     npm run ios
     ```

---

## 📁 Project Structure

```text
wellvantageapp/
├── backend/                # NestJS Server
│   ├── src/
│   │   ├── auth/           # Authentication logic (JWT/Google)
│   │   ├── availability/   # Slot management
│   │   ├── users/          # User profiles
│   │   └── workouts/       # Workout planning
│   └── docker-compose.yml  # Database configuration
├── src/                    # React Native App
│   ├── apis/               # API integration (Axios)
│   ├── components/         # Reusable UI components
│   ├── pages/              # Screen components
│   └── store/              # Redux state management
└── App.tsx                 # App Entry Point
```

---

## ✨ Features

- **Google Authentication**: Secure sign-in for both Android and iOS.
- **Workout Planner**: Create and manage detailed workout plans with exercise lists and notes.
- **Availability Booking**: Personal trainers can set their available slots.
- **Client Scheduling**: Real-time slot booking and management.
- **Robust Validation**: Backend-wide strict type checking and input verification.

---

## 📄 License
This project is UNLICENSED.
