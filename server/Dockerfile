FROM openjdk:11.0.6-slim as build

RUN mkdir -p app
WORKDIR /app

COPY mvnw ./
COPY .mvn .mvn

COPY pom.xml ./

RUN chmod +x mvnw
RUN ./mvnw dependency:go-offline -B

COPY src src

RUN chmod +x mvnw
RUN ./mvnw package -DskipTests

RUN ls /app/target

ENTRYPOINT java -jar /app/target/*.jar