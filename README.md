# Task Explorer App

## 📌 Overview
Task Explorer is a React Native application that allows users to view, filter, and manage tasks. The app fetches tasks from an API, caches them for offline access, and provides interactive UI elements to improve user experience.

## 🚀 Features
- 📋 **Task Listing** – Displays a list of tasks fetched from an API.
- 🔄 **Task Filtering** – Filter tasks by "All", "Completed", or "Incomplete".
- ⚡ **Interactive UI** – Smooth transitions, shadows, and better spacing for a clean layout.
- 💾 **Local Storage** – Caches tasks for offline access using AsyncStorage.
- 🌐 **API Integration** – Fetches tasks from JSONPlaceholder API.
- 🏃 **Loader & Error Handling** – Displays a loading spinner and retry button when needed.

## 🛠️ Tech Stack
- React Native
- React Navigation
- AsyncStorage

## 📦 Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-explorer.git
   cd task-explorer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

## 📁 Project Structure
```
TaskExplorer/
│-- screens/
│   │-- HomeScreen.js   # Displays task list with filtering
│   │-- DetailScreen.js  # Shows task details & status toggle
│-- App.js              # Main app navigation
│-- package.json        # Project dependencies
│-- README.md           # Project documentation
```

## 📜 API Used
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/todos) – Fake task API for demonstration.

## 🖼️ Screenshots
| Home Screen | Task Details |
|------------|--------------|
| ![Home](https://via.placeholder.com/300) | ![Details](https://via.placeholder.com/300) |

## 🏗️ Future Enhancements
- ✅ Add task creation & deletion.
- 📅 Implement due date & reminders.
- 📱 Improve UI with animations.

## 🤝 Contributing
Feel free to fork this repo and contribute! Pull requests are welcome.

## 📜 License
This project is licensed under the MIT License.
