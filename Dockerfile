### STAGE 1: BUILDER ###
FROM alpine:3.14 as builder

RUN apk --no-cache --virtual build-dependencies add nodejs
RUN apk --no-cache --virtual build-dependencies add yarn

RUN mkdir -p /ng-app/dist/frontend

WORKDIR /ng-app

COPY package.json package-lock.json ./

RUN yarn install

RUN yarn global add @angular/cli@15

COPY . .

RUN yarn run build

### STAGE 2: SETUP ###

FROM nginx:1.14.1-alpine

COPY --from=builder /ng-app/dist/frontend /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]




