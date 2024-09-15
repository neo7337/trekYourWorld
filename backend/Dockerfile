#
# 🚀 local
#
FROM node:18-alpine AS local

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV=local

# Re-create non-root user for Docker
RUN addgroup -S appuser \
    && adduser -S appuser -G appuser

RUN chown -R appuser /app

# Copy only the necessary files
COPY ./dist /app/dist
COPY ./public /app/public
COPY ./node_modules /app/node_modules

# Set Docker as non-root user
USER appuser

EXPOSE 8181

CMD ["node", "dist/backend/src/main.js"]

#
# 🚀 Production
#
FROM node:18-alpine AS production

WORKDIR /app
RUN apk add --no-cache libc6-compat

# Set to production environment
ENV NODE_ENV=production

# Re-create non-root user for Docker
RUN addgroup -S appuser \
    && adduser -S appuser -G appuser

RUN chown -R appuser /app

# Copy only the necessary files
COPY ./dist /app/dist
COPY ./public /app/public
COPY ./node_modules /app/node_modules

# Set Docker as non-root user
USER appuser

EXPOSE 8181

CMD ["node", "dist/backend/src/main.js"]