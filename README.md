## R2-D2 Exercise

I've decided to go with the R2-D2 Exercise. Here I would like to outline instructions on how to run my app as well as the biggest challenges I've encountered.

## Launch Instructions:

- Navigate into 'app' folder and run 'npm install', then 'npm start'. The App should open in localhost:8080 or next available port.

## Greatest Challenges

1) Solutions Optimization Challenge: One of the more difficult aspects of this assignment was balancing optimizing solutions for LEFT,RIGHT, and MOVE commands with redundancy and complexity. I wanted to make sure that the solution to each of those commands is written in an optimal amount of lines (avoiding long if statements, etc.), yet didn't require unneccessary complex data structures and algorithms. 

2) Create-React-App Redundancy Optimization: Instead of starting out with create-react-app cli package that offers simple scaffolding, I've decided to build my own webpack and babel config with only the essential features and script compilers that will be crucial to my application functionality. This way, I know exactly what's in my bundlers and I am able to reduce the size of the app as much as I can. As such I was able to reduce the size of the fully installed app from typical 185mb to only 80mb - less than half of the original size. 

3) Lastly, since JavaScript didn't have a built-in method for comparing arrays, I had to write my own. 
