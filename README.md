# FAQ Management System

This is an **Express.js** application for managing **FAQs** (Frequently Asked Questions). It includes features like FAQ management, translation into multiple languages, admin authentication, and pagination.

---

## **Features**
1. **FAQ Management**:
   - Admins can add FAQs.
   - Users can fetch FAQs with optional translation into different languages.
2. **Translation**:
   - FAQs can be translated into different languages (e.g., Hindi) using an external translation API.
3. **Admin Authentication**:
   - Admins can log in using a username and password.
   - JWT (JSON Web Tokens) are used for authentication.
4. **Pagination**:
   - The `getFAQs` endpoint supports pagination for fetching FAQs in chunks.

---

## **Technologies Used**
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Translation**: External Translation API
- **Environment Management**: `dotenv`

---
## **Folder Structure**
```
faq-app/
├── config/
│ └── db.js # Database configuration
├── controllers/
│ ├── adminController.js # Admin-related logic
│ └── faqController.js # FAQ-related logic
├── middleware/
│ └── authMiddleware.js # Authentication middleware
├── models/
│ ├── FAQ.js # FAQ model
│ └── Admin.js # Admin model
├── routes/
│ ├── adminRoutes.js # Admin routes
│ └── faqRoutes.js # FAQ routes
├── services/
│ └── translateService.js # Translation service
├── utils/
│ └── constants.js # Constants like API keys
├── .env # Environment variables
├── index.js
---
```

---

## **Setup Instructions**

### **1. Prerequisites**
- Node.js and npm installed.
- MongoDB installed and running.
- A Mymemory API url.

### **2. Clone the Repository**
```bash
git clone faq-backend
cd faq-app


---

### **How to Use**
1. Copy the above code into a file named `README.md` in the root directory of your project.
2. Replace placeholders like `<repository-url>`, `your_jwt_secret`, and `your.email@example.com` with actual values.
3. Commit the file to your repository:
   ```bash
   git add README.md
   git commit -m "Add README file"
   git push origin main
