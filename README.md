
# AI Mock Interview 




## API Reference


#### Generate Dashboard

```http
GET /generate
```

#### Create or Edit Interview

```http
GET /generate/{interviewId}
```

| Parameter      | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `interviewId` | `string` | **Required**. ID of the interview |

#### Start Mock Interview

```http
GET /generate/{interviewId}/start
```

| Parameter      | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `interviewId` | `string` | **Required**. ID of the interview |

#### Interview Page

```http
GET /generate/interview/{interviewId}
```

| Parameter      | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `interviewId` | `string` | **Required**. ID of the interview |

#### Feedback Page

```http
GET /generate/feedback/{interviewId}
```

| Parameter      | Type     | Description                          |
| :------------ | :------- | :----------------------------------- |
| `interviewId` | `string` | **Required**. ID of the interview |


## Appendix

### AI Mock Interview System

#### Features
- **AI-Powered Questions:** Generates questions based on the candidate's skills and job role.
- **Real-Time Feedback:** Provides instant evaluation of responses.
- **Performance Analytics:** Analyzes responses and gives insights.
- **Customizable Interviews:** Allows users to set difficulty levels and topics.
## Authors

- [@Dante-eraa](https://github.com/Dante-eraa)


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Demo

Insert gif or link to demo


# Hi, I'm Hariharan! 👋


## 🚀 About Me
- 🌱 I’m currently learning **MERN Stack**

- 👨‍💻 All of my projects are available at [https://hacktechno.ccbp.tech/](https://hacktechno.ccbp.tech/)

- 📫 How to reach me **hariharansundarrajan123@gmail.com**


## 🔗 Links
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://hacktechno.ccbp.tech/)
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/hacktechno)



- Live previews
- Fullscreen mode
- Cross platform


## Tech Stack

**Client:** React, Redux, TailwindCSS, ShadeCN

**Server:** Firebase, Cleark

## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Run Locally

Clone the project

```bash
  git clone https://github.com/Dante-eraa/Mock-Interview.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Roadmap

- Additional browser support

- Add more integrations


## 🛠 Skills
Javascript, HTML, CSS, Python, React, MongoDB, SQL...


## Feedback

If you have any feedback, please reach out to us at fake@fake.com

## 🔐 Environment Variables

Before running the project, make sure to configure the following environment variables in a `.env` file.

```plaintext
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=

# 🔥 Firebase Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=  
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGE_SENDER_ID=
VITE_FIREBASE_APP_ID=

# 🤖 Gemini AI API
VITE_GEMINI_API=
```

### 🚀 Setup Instructions  
1️⃣ **Create a `.env` file** in the root directory of your project.  
2️⃣ **Copy & paste** the above variables into your `.env` file.  
3️⃣ **Fill in the values** with your actual API keys and project credentials.  
4️⃣ **Secure it!** 🔒 Add `.env` to `.gitignore` to keep it out of version control.  

### 🛠️ Accessing Environment Variables  
📌 **In Vite (Frontend)**:  
```js
import.meta.env.VITE_FIREBASE_API_KEY;
```
📌 **In Node.js (Backend)**:  
```js
process.env.VITE_FIREBASE_API_KEY;
```

⚡ **Make sure all variables are correctly set before running the project!** 🚀  
