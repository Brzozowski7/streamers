# Streamers

Features:
- Add streamers: The application allows you to add new streamers to the app. You can provide details such as the streamer's name, platform, description and image.
- Vote for streamers: Users can vote for their favorite streamers by giving them a thumbs up or thumbs down.


This application was created for the recruitment process. It utilizes the following technologies:

- React
- NestJS
- Socket.IO
- React Query
- Material-UI



To run the application, follow these steps:

1. Create .env files: In both the client and server folders, create .env files. You can use the provided .env.sample file as a template.
2. Copy the contents of .env.sample: Open the .env.sample file and copy its contents. Paste the contents into the newly created .env files in both the client and server folders.
3. Navigate to the server folder: Open your terminal or command prompt and navigate to the server folder of the application.
4. Run the Docker container: Execute the command docker-compose up -d to start the Docker container. This command will launch the server and any necessary dependencies. If you want to connect to a public database instead of using the local MongoDB instance, you should replace the value of NEST_MONGO_URI in the server's .env file with mongodb+srv://Shared:Oj1Ml153TgsV4Atm@streamers-instance.2esjujg.mongodb.net/.
5. Install server-side dependencies: While still in the server folder, run the command npm install to install the server-side dependencies required by the application.
6. Install client-side dependencies: Navigate to the client folder using the terminal or command prompt. Inside the client folder, run the command npm install to install the client-side dependencies.
7. Start the client application: Run the command npm start while inside the client folder. This command will start the client-side application.
8. Start the server application: Switch back to the server folder in the terminal or command prompt. Run the command npm start to start the server-side application.


Make sure to fill in the required environment variables in the `.env` files with appropriate values.




Feel free to explore the code and adapt it to suit your needs.
