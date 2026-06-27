package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.function.Executable;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q7_Advance1;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

class Q7_Advance1Test {

    Q7_Advance1 advance1 = new Q7_Advance1();

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

    void recordResult(String given, String when, int expected, int actual) {
        results.add(new TestResult(given, when, String.valueOf(actual), String.valueOf(expected), expected == actual));
        assertEquals(expected, actual);
    }

    void recordExpectException(String given, String when, Executable code) {
        boolean threw;
        String actual;
        try {
            assertTimeoutPreemptively(Duration.ofMillis(300), code);
            threw = false;
            actual = "Completed normally (no exception)";
        } catch (Throwable t) {
            threw = true;
            actual = "Exception / Timeout (infinite loop detected)";
        }
        results.add(new TestResult(given, when, actual, "Exception / Infinite loop", threw));
        assertTrue(threw, "Mong đợi xảy ra exception hoặc vòng lặp vô hạn (timeout)");
    }

    @Test
    void testUSCLN12And8() {
        recordResult("a=12, b=8", "USCLN(12, 8)", 4, advance1.USCLN(12, 8));
    }

    @Test
    void testBSCNN4And6() {
        recordResult("a=4, b=6", "BSCNN(4, 6)", 12, advance1.BSCNN(4, 6));
    }

    @Test
    void testUSCLNWithZero() {
        recordExpectException("a=0, b=4", "USCLN(0, 4)", () -> advance1.USCLN(0, 4));
    }

    @Test
    void testBSCNNWithZero() {
        recordExpectException("a=4, b=0", "BSCNN(4, 0)", () -> advance1.BSCNN(4, 0));
    }

    @Test
    void testUSCLNWithNegative() {
        recordExpectException("a=-4, b=8", "USCLN(-4, 8)", () -> advance1.USCLN(-4, 8));
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 7</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 7 (Q7_Advance1)</h2>");
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

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q7.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
