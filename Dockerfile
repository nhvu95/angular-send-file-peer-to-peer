## STAGE1: BUILD
FROM node:14.15.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build && echo f2f.nhvu96.com > ./CNAME

# STAGE2: Run
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/sites-enabled
COPY nhvu96.com.conf /etc/nginx/sites-available/nhvu96.com
COPY f2f.nhvu96.com.conf /etc/nginx/sites-available/f2f.nhvu96.com
COPY --from=build /usr/src/app/dist/webrtc /usr/share/nginx/html/f2f.nhvu96.com
COPY --from=build /usr/src/app/dist/webrtc /usr/share/nginx/html/nhvu96.com
RUN ln -s /etc/nginx/sites-available/nhvu96.com /etc/nginx/sites-enabled/
RUN ln -s /etc/nginx/sites-available/f2f.nhvu96.com /etc/nginx/sites-enabled/