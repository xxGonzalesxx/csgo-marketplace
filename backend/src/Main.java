import com.csgomarket.model.Item;
import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpServer;

import java.io.*;
import java.net.InetSocketAddress;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;

public class Main {
    private static List<Item> items = new ArrayList<>();

    public static void main(String[] args) throws IOException {
        initializeItems();

        HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);

        server.createContext("/", new StaticHandler());
        server.createContext("/api/items", new ItemsHandler());

        System.out.println("🚀 CS:GO Marketplace запущен: http://localhost:8080");
        server.start();
    }

    static class StaticHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            String path = exchange.getRequestURI().getPath();

            if (path.equals("/")) {
                path = "/index.html";
            }

            String basePath = "./frontend";
            File file = new File(basePath + path);

            if (file.exists()) {
                byte[] bytes = Files.readAllBytes(file.toPath());

                String contentType = "text/html";
                if (path.endsWith(".css")) contentType = "text/css";
                if (path.endsWith(".js")) contentType = "application/javascript";
                if (path.endsWith(".png")) contentType = "image/png";

                exchange.getResponseHeaders().set("Content-Type", contentType);
                exchange.sendResponseHeaders(200, bytes.length);

                OutputStream os = exchange.getResponseBody();
                os.write(bytes);
                os.close();
            } else {
                String response = "404 - File not found";
                exchange.sendResponseHeaders(404, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        }
    }

    static class ItemsHandler implements HttpHandler {
        @Override
        public void handle(HttpExchange exchange) throws IOException {
            StringBuilder response = new StringBuilder("[\n");
            for (Item item : items) {
                response.append(String.format(
                        "  {\"id\": %d, \"name\": \"%s\", \"category\": \"%s\", \"price\": %.2f},\n",
                        item.getId(), item.getName(), item.getCategory(), item.getPrice()
                ));
            }
            if (!items.isEmpty()) {
                response.setLength(response.length() - 2);
            }
            response.append("\n]");

            exchange.getResponseHeaders().set("Content-Type", "application/json");
            exchange.getResponseHeaders().set("Access-Control-Allow-Origin", "*");
            exchange.sendResponseHeaders(200, response.length());

            OutputStream os = exchange.getResponseBody();
            os.write(response.toString().getBytes());
            os.close();
        }
    }

    private static void initializeItems() {
        items.add(new Item(1L, "Нож | Стилет", "knife", "covert", 2500.0));
        items.add(new Item(2L, "AK-47 | Красная линия", "rifle", "classified", 1800.0));
        items.add(new Item(3L, "Перчатки | Кровавая паутина", "gloves", "covert", 3200.0));
    }
}