package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q16_LoginService;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Q16_LoginServiceTest {

    static class TestResult {
        String given;
        String when;
        String actual;
        String expected;
        boolean pass;

        TestResult(String given, String when, String actual, String expected, boolean pass) {
            this.given = given;
            this.when = when;
            this.actual = actual;
            this.expected = expected;
            this.pass = pass;
        }
    }

    static List<TestResult> results = new ArrayList<>();

    void recordResult(String given, String when, boolean expected, boolean actual) {
        results.add(new TestResult(given, when, String.valueOf(actual), String.valueOf(expected), expected == actual));
        assertEquals(expected, actual);
    }

    @Test
    void testLoginValidCredentials() {
        recordResult("username=\"user\", password=\"password\"", "login(\"user\", \"password\")", true, Q16_LoginService.login("user", "password"));
    }

    @Test
    void testLoginInvalidUsername() {
        recordResult("username=\"invalidUser\", password=\"password\"", "login(\"invalidUser\", \"password\")", false, Q16_LoginService.login("invalidUser", "password"));
    }

    @Test
    void testLoginWrongPassword() {
        recordResult("username=\"user\", password=\"wrongPassword\"", "login(\"user\", \"wrongPassword\")", false, Q16_LoginService.login("user", "wrongPassword"));
    }

    @Test
    void testLoginGuestCredentials() {
        recordResult("username=\"guest\", password=\"123456\"", "login(\"guest\", \"123456\")", false, Q16_LoginService.login("guest", "123456"));
    }

    @Test
    void testLoginEmptyCredentials() {
        recordResult("username=\"\", password=\"\"", "login(\"\", \"\")", false, Q16_LoginService.login("", ""));
    }

    @Test
    void testLoginEmptyUsername() {
        recordResult("username=\"\", password=\"password\"", "login(\"\", \"password\")", false, Q16_LoginService.login("", "password"));
    }

    @Test
    void testLoginEmptyPassword() {
        recordResult("username=\"user\", password=\"\"", "login(\"user\", \"\")", false, Q16_LoginService.login("user", ""));
    }

    @Test
    void testLoginUsernameWithSpaces() {
        recordResult("username=\" user \", password=\"password\"", "login(\" user \", \"password\")", false, Q16_LoginService.login(" user ", "password"));
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 16</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 16 (Q16_LoginService)</h2>");
        html.append("<table>");
        html.append("<tr><th>Given</th><th>When</th><th>Actual Result</th><th>Expect Result</th><th>Pass/Fail</th></tr>");

        for (TestResult r : results) {
            html.append("<tr>");
            html.append("<td>").append(r.given).append("</td>");
            html.append("<td>").append(r.when).append("</td>");
            html.append("<td>").append(r.actual).append("</td>");
            html.append("<td>").append(r.expected).append("</td>");
            html.append("<td class=\"").append(r.pass ? "pass" : "fail").append("\">")
                .append(r.pass ? "Pass" : "Fail").append("</td>");
            html.append("</tr>");
        }

        html.append("</table></body></html>");

        File outputDir = new File("reports");
        if (!outputDir.exists()) {
            outputDir.mkdirs();
        }

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q16.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
