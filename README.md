# 🚀 Realtime Chat App

A modern, real-time chat application built with React, Firebase, and Chakra UI. Connect with friends and family through instant messaging with a beautiful, responsive interface.

## ✨ Features

### 🔐 Authentication
- **Firebase Authentication** with email/password
- **User profile management** with custom usernames and profile pictures
- **Protected routes** for secure access
- **Persistent login sessions**

### 💬 Chat Interface
- **Real-time messaging** powered by Firebase
- **Modern sidebar** with user search and recent contacts
- **Responsive chat window** with message history
- **Clean, intuitive UI** built with Chakra UI

### 🎨 User Experience
- **Beautiful, responsive design** that works on all devices
- **Smooth animations** with Framer Motion
- **Customizable themes** and styling
- **Professional-grade UI components**

## 🛠️ Tech Stack

- **Frontend**: React 19 + Vite
- **UI Framework**: Chakra UI + Emotion
- **State Management**: Zustand
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Styling**: CSS + Chakra UI
- **Animations**: Framer Motion
- **Routing**: React Router DOM

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Firebase project setup

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Realtime-Chat-App
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication and Firestore
   - Copy your Firebase config to `src/configs/Firebase.js`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── authForm/       # Authentication forms
│   ├── chatBar/        # Main chat interface
│   ├── protectedRoute/ # Route protection
│   └── sideBar/        # User sidebar with contacts
├── configs/            # Configuration files
│   └── Firebase.js     # Firebase configuration
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── auth/           # Authentication page
│   └── home/           # Main chat page
├── stores/             # State management
│   └── useAuthStore.js # Authentication state
└── assets/             # Static assets
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌟 Key Components

### SideBar
- **User search** functionality
- **Recent contacts** display
- **Navigation** and user controls

### ChatBar
- **Message display** area
- **Chat navigation** header
- **Message input** and sending

### Authentication
- **Login/Register** forms
- **User profile** creation
- **Secure route** protection

## 🚧 Development Status

This project is currently in active development with the following completed features:

✅ **Core Architecture** - React + Vite setup  
✅ **Authentication System** - Firebase Auth integration  
✅ **Basic UI Components** - Chakra UI implementation  
✅ **Routing** - Protected routes and navigation  
✅ **State Management** - Zustand store setup  
✅ **Database Integration** - Firestore connection  

## 🎯 Roadmap

### Phase 1: Core Chat Features
- [ ] Real-time messaging implementation
- [ ] User-to-user chat connections
- [ ] Message persistence and history

### Phase 2: Enhanced Features
- [ ] File and image sharing
- [ ] Group chat functionality
- [ ] Typing indicators and online status

### Phase 3: Advanced Features
- [ ] Voice and video calls
- [ ] End-to-end encryption
- [ ] Mobile app development

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Built By

**Mohammad** - Full-stack developer passionate about creating amazing user experiences.

---

⭐ **Star this repository if you found it helpful!**
