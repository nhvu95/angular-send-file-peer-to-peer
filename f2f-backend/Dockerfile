FROM openjdk:11-jre-slim
ARG JAR_FILE=./build/libs/f2f-backend.jar
COPY ${JAR_FILE} f2f-backend.jar
ENTRYPOINT ["java","-jar","/f2f-backend.jar"]