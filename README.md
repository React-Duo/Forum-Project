
# Forum Website

This is a forum website built with React and Firebase database.

## Setup

To run the project locally, follow these steps:

1. Clone the repository: [GitHub Repository](https://github.com/React-Duo/Forum-Project)
2. Install dependencies by running the following command in the project directory:
    ```
    npm install
    ```
3. Start the development server:
    ```
    npm run dev
    ```

## Features

- User Registration: Users can create accounts to access the forum.
- Post Creation: Users can create new posts and share their thoughts.
- Like and Comment: Users can interact with other users' posts by liking and commenting.
- Users can modify there profiles.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## Scheme of the database
```
{
  "comments": {
    "23": {
      "commentAuthor": "PetkoZlatilov1",
      "commentContent": "I don'n know",
      "commentLikedBy": {
        "PetkoZlatilov1": true,
        "todor123": true
      },
      "date": "5/12/2024",
      "id": 23,
      "relatedPost": 8
    }
  },
  "posts": {
    "0": {
      "Id": 0,
      "date": "5/8/2024",
      "postAuthor": "PetkoZlatilov1",
      "postContent": "With react-router I can use the Link element to createlinks which are native...",
      "postLikedBy": {
        "BilGates1": true
      },
      "postTitle": "How to programmatically navigate using React Router?"
    }
  },
  "users": {
    "BilGates1": {
      "emailAddress": "bil@abv.bg",
      "firstName": "Bill",
      "isBlocked": false,
      "lastName": "Gates",
      "photo": "https://firebasestorage.googleapis.com/v0/b/reatect.appspot.com",
      "role": "author",
      "username": "BilGates1"
    }
  }
}
```