# BopStop

BopStop is a full stack partial clone of the e-commerce website Bandcamp. This platform serves as a hub for music creators and fans, enabling artists to share and sell their music while fostering a community of listeners who can explore, purchase, and support their favorite sounds and merchandise.

## Tech Stack

### Frameworks and Libraries
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://img.shields.io/badge/-Python-3776ab?logo=python&logoColor=FFFF66&logoWidth=20" alt="Python" height="25">
  <img src="https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white&logoWidth=20" alt="Flask" height="25">
  <img src="https://img.shields.io/badge/-Javascript-41454A?logo=javascript&logoColor=F7DF1E&logoWidth=20" alt="Javascript" height="25">
  <img src="https://img.shields.io/badge/-React-263238?logo=react&logoColor=61DAFB&logoWidth=20" alt="React" height="25">
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&logoWidth=20" alt="Redux" height="25">
  <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&logoWidth=20" alt="CSS3" height="25">
  <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&logoWidth=20" alt="HTML5" height="25">
</div>

### Database:

<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&logoWidth=20" alt="PostgreSQL" height="25">

### Hosting:

<img src="https://img.shields.io/badge/-Render-23c43e?logo=render&logoColor=white&logoWidth=20" alt="Render" height="25">

### Index

[Feature List](https://github.com/Savsou/BopStop/blob/main/api_docs/feature_list.md)|[Database Schema](https://github.com/Savsou/BopStop/blob/main/api_docs/database_schema.md)|[User Stories](https://github.com/Savsou/BopStop/blob/main/api_docs/user_stories.md)

### Landing Page

![Demo Animation](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXUyZDNwb2kwYmxhYmR1NXUzdGs4MWF6cm0ybnEycGw4aXA3dXdnaiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/e1GYvVtKPPbRCF3A8D/giphy.gif)

### Product Page

![Demo Animation](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExbGExcGlzbGpja3E0OTJtNmFxazN3Nm0wbjY0bWQzcGR3d3p2azJ6biZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Y5iGXr36XEWLgBjaaJ/giphy.gif)

### Wishlist

![Demo Animation](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcDI3c3J6MmpvNXc1emJkN3VyOXRlaXZmdWJyaWh0MHFvb3EyamgybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/0is7DrMSkXPxZEH3vy/giphy.gif)

### Cart

![Demo Animation](https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeGhxbnU2dHNndmppY3RpdzI2cHk4Y29vaTRjMmdyd3p4cWl5eWNrOSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/UmhJWC3rs3C4WHi7FL/giphy.gif)

### Connect With Team BopStop:

#### Savannah Sou:

[<img align="left" alt="SavonnaSou | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][savannah-linkedin]

[savannah-linkedin]: https://www.linkedin.com/in/savannah-sou/

[<img align="left" alt="SavonnaSou | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][savannah-email]<br>

[savannah-email]: mailto:savonna.sou@gmail.com


#### Zechariah Dominguez:

[<img align="left" alt="ZechariahDominguez | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][zechariah-linkedin]

[zechariah-linkedin]: https://www.linkedin.com/in/zechariah-dominguez/

[<img align="left" alt="ZechariahDominguez | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][zechariah-email]<br>

[zechariah-email]: mailto:zechariahd@gmail.com


#### Pristine Shin:

[<img align="left" alt="PristineShin | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][pristine-linkedin]

[pristine-linkedin]: https://www.linkedin.com/in/pristine-shin/

[<img align="left" alt="ZechariahDominguez | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][pristine-email]<br>

[pristine-email]: mailto:shin.pristine@gmail.com


#### Tiffany Tseng:

[<img align="left" alt="TiffanyTseng | LinkedIn" width="22px" src="./logos/linkedin-logo.png" style="margin: 5px;" />][tiffany-linkedin]

[tiffany-linkedin]: https://www.linkedin.com/in/ittseng/

[<img align="left" alt="TiffanyTseng | Gmail" width="22px" src="./logos/email.png" style="margin: 5px;" />][tiffany-email]<br>

[tiffany-email]: mailto:tifny7574@gmail.com


<br></br>

# Flask React Project

This is the starter for the Flask React project.

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. The React frontend has no styling applied. Copy the __.css__ files from your
   Authenticate Me project into the corresponding locations in the
   __react-vite__ folder to give your project a unique look.

8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

## Deployment through Render.com

First, recall that Vite is a development dependency, so it will not be used in
production. This means that you must already have the __dist__ folder located in
the root of your __react-vite__ folder when you push to GitHub. This __dist__
folder contains your React code and all necessary dependencies minified and
bundled into a smaller footprint, ready to be served from your Python API.

Begin deployment by running `npm run build` in your __react-vite__ folder and
pushing any changes to GitHub.

Refer to your Render.com deployment articles for more detailed instructions
about getting started with [Render.com], creating a production database, and
deployment debugging tips.

From the Render [Dashboard], click on the "New +" button in the navigation bar,
and click on "Web Service" to create the application that will be deployed.

Select that you want to "Build and deploy from a Git repository" and click
"Next". On the next page, find the name of the application repo you want to
deploy and click the "Connect" button to the right of the name.

Now you need to fill out the form to configure your app. Most of the setup will
be handled by the __Dockerfile__, but you do need to fill in a few fields.

Start by giving your application a name.

Make sure the Region is set to the location closest to you, the Branch is set to
"main", and Runtime is set to "Docker". You can leave the Root Directory field
blank. (By default, Render will run commands from the root directory.)

Select "Free" as your Instance Type.

### Add environment variables

In the development environment, you have been securing your environment
variables in a __.env__ file, which has been removed from source control (i.e.,
the file is gitignored). In this step, you will need to input the keys and
values for the environment variables you need for production into the Render
GUI.

Add the following keys and values in the Render GUI form:

- SECRET_KEY (click "Generate" to generate a secure secret for production)
- FLASK_ENV production
- FLASK_APP app
- SCHEMA (your unique schema name, in snake_case)

In a new tab, navigate to your dashboard and click on your Postgres database
instance.

Add the following keys and values:

- DATABASE_URL (copy value from the **External Database URL** field)

**Note:** Add any other keys and values that may be present in your local
__.env__ file. As you work to further develop your project, you may need to add
more environment variables to your local __.env__ file. Make sure you add these
environment variables to the Render GUI as well for the next deployment.

### Deploy

Now you are finally ready to deploy! Click "Create Web Service" to deploy your
project. The deployment process will likely take about 10-15 minutes if
everything works as expected. You can monitor the logs to see your Dockerfile
commands being executed and any errors that occur.

When deployment is complete, open your deployed site and check to see that you
have successfully deployed your Flask application to Render! You can find the
URL for your site just below the name of the Web Service at the top of the page.

**Note:** By default, Render will set Auto-Deploy for your project to true. This
setting will cause Render to re-deploy your application every time you push to
main, always keeping it up to date.

[Render.com]: https://render.com/
[Dashboard]: https://dashboard.render.com/
