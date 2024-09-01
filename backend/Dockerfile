#
# 🚀 local
#
FROM node:18-alpine as local

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV local

# Re-create non-root user for Docker
RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node

# Copy only the necessary files
COPY --chown=node:node ./dist /app/dist
COPY --chown=node:node ./public /app/public

# Set Docker as non-root user
USER node

EXPOSE 8181

CMD ["node", "dist/main.js"]

#
# 🚀 Production
#
FROM node:18-alpine as prod

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV production

# Re-create non-root user for Docker
RUN addgroup --system --gid 1001 node
RUN adduser --system --uid 1001 node

# Copy only the necessary files
COPY --chown=node:node --from=build /app/dist dist
COPY --chown=node:node --from=build /app/node_modules node_modules

# Set Docker as non-root user
USER node

EXPOSE 8181

CMD ["node", "dist/main.js"]