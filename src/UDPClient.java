import java.io.IOException;
import java.net.*;

public class UDPClient {

    private final static int PACKETSIZE = 100;

    public static void main(String[] args) throws IOException {
        int port = args.length == 0 ? 57 : Integer.parseInt(args[0]);
        new UDPClient().run(port);
    }

    public void run(int port) {
        try {
            DatagramSocket serverSocket = new DatagramSocket(port);
            byte[] receiveData = new byte[8];

            System.out.printf("Listening on udp:%s:%d%n",
                    InetAddress.getLocalHost().getHostAddress(), port);
            DatagramPacket receivePacket = new DatagramPacket(receiveData,
                    receiveData.length);

            while(true)
            {
                serverSocket.receive(receivePacket);
                int offset = receivePacket.getOffset();
                String sentence = new String( receivePacket.getData(), offset,
                        receivePacket.getLength() );

                System.out.println("RECEIVED: " + sentence);
                // now send acknowledgement packet back to sender
                InetAddress IPAddress = receivePacket.getAddress();
                String sendString = "polo";
                byte[] sendData = sendString.getBytes("UTF-8");
                DatagramPacket sendPacket = new DatagramPacket(sendData, sendData.length,
                        IPAddress, receivePacket.getPort());
                serverSocket.send(sendPacket);
            }
        } catch (IOException e) {
            System.out.println(e);
        }
        // should close serverSocket in finally block
    }

}
