FROM node:10.22.0 AS development
RUN mkdir /srv/app && chown node:node /srv/app
USER node
WORKDIR /srv/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install
RUN mkdir -p node_modules

FROM node:10.22.0-slim AS production
USER node
WORKDIR /srv/app
COPY --from=development --chown=root:root /srv/app/node_modules ./node_modules

COPY --chown=node:node . .

CMD [ "yarn", "start" ]