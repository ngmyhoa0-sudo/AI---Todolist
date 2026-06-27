package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q10_Advance4;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Q10_Advance4Test {

    Q10_Advance4 advance4 = new Q10_Advance4();

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
    void testIsPrimeNumber7() {
        recordResult("n=7", "isPrimeNumber(7)", true, advance4.isPrimeNumber(7));
    }

    @Test
    void testIsPrimeNumber6() {
        recordResult("n=6", "isPrimeNumber(6)", false, advance4.isPrimeNumber(6));
    }

    @Test
    void testIsPrimeNumberNegative3() {
        recordResult("n=-3", "isPrimeNumber(-3)", false, advance4.isPrimeNumber(-3));
    }

    @Test
    void testIsPrimeNumber2() {
        recordResult("n=2", "isPrimeNumber(2)", true, advance4.isPrimeNumber(2));
    }

    @Test
    void testIsPrimeNumber1() {
        recordResult("n=1", "isPrimeNumber(1)", false, advance4.isPrimeNumber(1));
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 10</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 10 (Q10_Advance4)</h2>");
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

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q10.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
