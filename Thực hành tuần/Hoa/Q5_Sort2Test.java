package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q5_Sort2;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Q5_Sort2Test {

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
    void testNumber1GreaterThanNumber2() {
        Q5_Sort2.number1 = 10;
        Q5_Sort2.number2 = 5;
        Q5_Sort2.sortDesc();
        String actual = "number1=" + Q5_Sort2.number1 + ", number2=" + Q5_Sort2.number2;
        recordResult("number1=10, number2=5", "sortDesc()", "number1=10, number2=5", actual);
    }

    @Test
    void testNumber1LessThanNumber2() {
        Q5_Sort2.number1 = 5;
        Q5_Sort2.number2 = 10;
        Q5_Sort2.sortDesc();
        String actual = "number1=" + Q5_Sort2.number1 + ", number2=" + Q5_Sort2.number2;
        recordResult("number1=5, number2=10", "sortDesc()", "number1=10, number2=5", actual);
    }

    @Test
    void testNumbersEqual() {
        Q5_Sort2.number1 = 7;
        Q5_Sort2.number2 = 7;
        Q5_Sort2.sortDesc();
        String actual = "number1=" + Q5_Sort2.number1 + ", number2=" + Q5_Sort2.number2;
        recordResult("number1=7, number2=7", "sortDesc()", "number1=7, number2=7", actual);
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 5</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 5 (Q5_Sort2)</h2>");
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

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q5.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
