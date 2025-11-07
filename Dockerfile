FROM amazoncorretto:8
WORKDIR /app

COPY backend/src/ ./src/
COPY frontend/ ./frontend/

RUN javac -d . src/com/csgomarket/model/*.java src/Main.java

EXPOSE 8080
CMD ["java", "Main"]
