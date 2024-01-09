FROM node

# used to set the current directory
WORKDIR /myapp

# copy everything from current directory to the image
COPY . .

# expose the required port
EXPOSE 3000

# run this command immediately after a container gets created
CMD node server.js