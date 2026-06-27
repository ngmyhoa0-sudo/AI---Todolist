package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q15_StringReversal;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Q15_StringReversalTest {

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

    void recordResult(String given, String when, String expected, String actual) {
        results.add(new TestResult(given, when, actual, expected, expected.equals(actual)));
        assertEquals(expected, actual);
    }

    @Test
    void testReverseHello() {
        recordResult("input=\"hello\"", "reverseString(\"hello\")", "olleh", Q15_StringReversal.reverseString("hello"));
    }

    @Test
    void testReverseWorld() {
        recordResult("input=\"world\"", "reverseString(\"world\")", "dlrow", Q15_StringReversal.reverseString("world"));
    }

    @Test
    void testReverseEmptyString() {
        recordResult("input=\"\"", "reverseString(\"\")", "", Q15_StringReversal.reverseString(""));
    }

    @Test
    void testReverseSingleChar() {
        recordResult("input=\"a\"", "reverseString(\"a\")", "a", Q15_StringReversal.reverseString("a"));
    }

    @Test
    void testReverseHelloWorld() {
        recordResult("input=\"hello world\"", "reverseString(\"hello world\")", "dlrow olleh", Q15_StringReversal.reverseString("hello world"));
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 15</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 15 (Q15_StringReversal)</h2>");
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

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q15.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
