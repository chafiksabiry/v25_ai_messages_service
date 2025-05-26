# Use official Node.js image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy app files
COPY . .

# Expose port
EXPOSE 3005

ENV MONGODB_URI="mongodb://harx:gcZ62rl8hoME@38.242.208.242:27018/V25_CompanySearchWizard"
ENV PORT=3005

# Start the app
CMD ["npm", "start"]
