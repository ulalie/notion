# Notion

## Description

This application allows users to create, edit, and delete their notes. It is built using React and styled with Tailwind CSS, utilizing the Typography plugin for enhanced typography.

## Features

- User Registration: 
  - Input for email, password, and password confirmation.
  - Additional fields (name, nickname, etc.) for user information collection.
  - Data validation using the Zod library.
  
- Authentication:
  - Log in with data verification.
  - Redirect to the home page upon successful login.

- Home Page:
  - Displays registration date and a link to notes.
  
- Note Management:
  - Create, edit, and delete notes.
  - Notes are sorted by creation date.
  - Support for pagination and note filtering.
  
- View Note:
  - Ability to view note details and edit or delete it.

- 404 Page:
  - Friendly error message when an invalid URL is entered.

## Technologies

- React: for building the user interface.
- Tailwind CSS: for styling.
- Zod: for data validation.
- Json-Server: for simulating the backend and storing data.

## Installation

1. Clone the repository:
      git clone https://github.com/ulalie/notion.git
   cd notion
   

2. Install dependencies:
      npm install
   

3. Run the application:
      npm run dev
   

4. Start the Json-Server:
      npm run dev:db
   

## Additional Resources

- Tailwind CSS
- Zod
- Json-Server
