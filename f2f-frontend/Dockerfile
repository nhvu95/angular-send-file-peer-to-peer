FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
# COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mkdir /etc/nginx/sites-enabled
COPY f2f.nhvu95.com.conf /etc/nginx/sites-available/f2f.nhvu95.com
#COPY E:/Angular/webrtc/f2f-frontend/dist/webrtc /usr/share/nginx/html/f2f.nhvu95.com
RUN ln -s /etc/nginx/sites-available/f2f.nhvu95.com /etc/nginx/sites-enabled/