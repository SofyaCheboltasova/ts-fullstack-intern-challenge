# ###################
# # BUILD FOR LOCAL DEVELOPMENT
# ###################

# FROM node:18-alpine As development

# # Create app directory
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
# # Copying this first prevents re-running npm install on every code change.
# COPY --chown=node:node package*.json ./

# # Install app dependencies using the `npm ci` command instead of `npm install`
# RUN npm ci

# # Bundle app source, including the backend
# COPY --chown=node:node . .

# # Use the node user from the image (instead of the root user)
# USER node

# ###################
# # BUILD FOR PRODUCTION
# ###################

# FROM node:18-alpine As build

# WORKDIR /usr/src/app

# COPY --chown=node:node package*.json ./

# # In order to run `npm run build` we need access to the Nest CLI which is a dev dependency. In the previous development stage we ran `npm ci` which installed all dependencies, so we can copy over the node_modules directory from the development image
# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# # Copy backend folder to use in build process
# COPY --chown=node:node ../backend ./backend

# # Copy api source files
# COPY --chown=node:node . .

# # Run the build command which creates the production bundle
# RUN npm run build

# # Set NODE_ENV environment variable
# ENV NODE_ENV production

# # Running `npm ci` removes the existing node_modules directory and passing in --only=production ensures that only the production dependencies are installed. This ensures that the node_modules directory is as optimized as possible
# RUN npm ci --only=production && npm cache clean --force

# USER node

# ###################
# # PRODUCTION
# ###################

# FROM node:18-alpine As production

# # Copy the bundled code from the build stage to the production image
# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# # Copy backend folder for runtime use, if necessary
# COPY --chown=node:node --from=build /usr/src/app/backend ./backend

# # Start the server using the production build
# CMD [ "node", "dist/api/index.js" ]


FROM node:18-alpine AS development

WORKDIR /usr/src/app/backend
COPY --chown=node:node /backend/package*.json /usr/src/app/backend
RUN npm install

WORKDIR /usr/src/app/api
COPY --chown=node:node /api/package*.json /usr/src/app/api
RUN npm install
RUN mkdir -p /usr/src/app/api/dist && chown -R node:node /usr/src/app/api

COPY --chown=node:node /api/ /usr/src/app/api/
COPY --chown=node:node /backend/ /usr/src/app/backend/

RUN npm run build

USER node
CMD [ "node", "dist/api/index.js" ]