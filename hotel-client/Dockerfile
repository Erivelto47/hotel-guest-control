FROM node:14.17.0 AS compile-image

RUN npm --force install -g yarn

WORKDIR /opt/ng
COPY package.json yarn.lock ./
RUN yarn install

ENV PATH="./node_modules/.bin:$PATH"

COPY . ./
RUN ng build --prod

FROM nginx
COPY --from=compile-image /opt/ng/dist/hotel-client /usr/share/nginx/html
