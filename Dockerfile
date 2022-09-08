FROM node:16.10-alpine AS build

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:1.17.1-alpine AS prod_stage

COPY --from=build /app/dist/bank-system /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
