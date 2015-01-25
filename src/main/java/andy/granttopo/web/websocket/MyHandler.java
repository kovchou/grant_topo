package andy.granttopo.web.websocket;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.handler.TextWebSocketHandler;

/**
 * Created by andy on 12/28/14.
 */
public class MyHandler extends TextWebSocketHandler {
    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        System.out.println("receive message.");
        try {
            Thread.sleep(1000);
            String test = "ggg";
            session.sendMessage(new TextMessage(test.getBytes()));
        }catch (Exception e){
            e.printStackTrace();
        }

    }

}
