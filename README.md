Blog Website.

![image](https://github.com/user-attachments/assets/f1da26e1-7e50-4929-9667-bd18e5565bf1)


  This is an example blog website assignment from the Odin Project, with the goal being to use a single RESTful API to power two different front end interfaces. I really learned a lot from this project as I had always wondered how to connect a front-end interface and a backend server, and now I understand it pretty well. I also found that there is a lot more under the surface going on behind the scenes in websites than I initially thought.

Despite its appearance, this website does not utilize hard-coded data for the articles. The site linked above is for the user viewing ONLY, the interface for writing, editing and publishing articles that are displayed for the viewer is the second front-end interface from this project. Both of these share the same database of posts, users and comments and access them via the api server.


Features

  - A clean, reactive user interface made with ReactJS and Tailwind CSS.
  - RESTful API server made using express.
  - PostgreSQL database made easier to use with Prisma ORM.
  - JWT (json web token) authentication, which I personally think is a much better method for authenticating since I don't have to store the session in my database.
  - Sign-up/Login pages with fully working requirements for username length, password length, etc.
  - Fully working comments system which displays when the comment was posted, and allows you to edit and delete your own comments only.
  - Uses bycryptjs to hash passwords for account security.



Writer Website

![image](https://github.com/user-attachments/assets/c7d0b3e3-e81f-471e-87ad-ea190b399776)

This is the second front-end that powers the viewer portion of this project. This website allows you to write, edit, publish and unpublish articles. Unfortunately, I'm not willing to just let anyone have full access to the site and publish whatever they want, so I have it set to only where I can do that. I just want it to be family friendly for interviewers if they ever show interest in this project when I'm getting a job in the future.


Overall

I don't have a lot of free time as I am on deployment right now, but I have been slowly building on this everyday for the past couple of weeks now. While I definitely feel like it could be better and have more features, I feel I learned enough from this project and I wish to move onto other things that will continue to build my skill set. 
