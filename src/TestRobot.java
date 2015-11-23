import java.awt.*;
import java.awt.event.InputEvent;
import java.awt.event.KeyEvent;

public class TestRobot {
    public static void main(String[] args) {

        try {

            Robot robot = new Robot();

            // Creates the delay of 5 sec so that you can open notepad before

            // Robot start writting

            robot.delay(2000);

            robot.mousePress(InputEvent.BUTTON1_DOWN_MASK);
            for (int i = 0; i <50 ; i++) {
                robot.setAutoDelay(100);
                robot.mouseMove(700 + i, 500);
            }
            robot.mouseRelease(InputEvent.BUTTON1_DOWN_MASK);
            robot.setAutoDelay(1000);
            robot.mouseMove(640, 480);

            robot.mouseMove(0, 0);

            robot.keyPress(KeyEvent.VK_H);

            robot.keyPress(KeyEvent.VK_I);

            robot.keyPress(KeyEvent.VK_SPACE);

            robot.keyPress(KeyEvent.VK_B);

            robot.keyPress(KeyEvent.VK_U);

            robot.keyPress(KeyEvent.VK_D);

            robot.keyPress(KeyEvent.VK_Y);



        } catch (AWTException e) {

            e.printStackTrace();

        }

    }

}
