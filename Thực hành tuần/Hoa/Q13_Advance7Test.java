package Hoa;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.AfterAll;
import static org.junit.jupiter.api.Assertions.*;
import NguyenThiMyHoa.Q13_Advance7;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

class Q13_Advance7Test {

    Q13_Advance7 advance7 = new Q13_Advance7();

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

    @Test
    void testTinhThuChuNhat() {
        recordResult("ngay=5, thang=4, nam=2020", "tinhThu(5, 4, 2020)", 1, advance7.tinhThu(5, 4, 2020));
    }

    @Test
    void testTinhThuThuHai() {
        recordResult("ngay=6, thang=4, nam=2020", "tinhThu(6, 4, 2020)", 2, advance7.tinhThu(6, 4, 2020));
    }

    @Test
    void testTinhThuNgayKhongHopLe() {
        recordResult("ngay=35, thang=6, nam=2019", "tinhThu(35, 6, 2019)", 0, advance7.tinhThu(35, 6, 2019));
    }

    @Test
    void testTinhThuThangKhongHopLe() {
        recordResult("ngay=19, thang=35, nam=2020", "tinhThu(19, 35, 2020)", 0, advance7.tinhThu(19, 35, 2020));
    }

    @Test
    void testTinhThuNgayAm() {
        recordResult("ngay=-19, thang=35, nam=2020", "tinhThu(-19, 35, 2020)", 0, advance7.tinhThu(-19, 35, 2020));
    }

    @Test
    void testTinhThuThangAm() {
        recordResult("ngay=19, thang=-9, nam=2020", "tinhThu(19, -9, 2020)", 0, advance7.tinhThu(19, -9, 2020));
    }

    @Test
    void testTinhThuNamAm() {
        recordResult("ngay=19, thang=9, nam=-2020", "tinhThu(19, 9, -2020)", 0, advance7.tinhThu(19, 9, -2020));
    }

    @AfterAll
    static void generateReport() {
        StringBuilder html = new StringBuilder();
        html.append("<html><head><meta charset=\"UTF-8\"><title>Test Report - Question 13</title>");
        html.append("<style>");
        html.append("table{border-collapse:collapse;width:100%;font-family:Arial,sans-serif;}");
        html.append("th,td{border:1px solid #999;padding:8px;text-align:left;}");
        html.append("th{background-color:#4CAF50;color:white;}");
        html.append(".pass{color:green;font-weight:bold;}");
        html.append(".fail{color:red;font-weight:bold;}");
        html.append("</style></head><body>");
        html.append("<h2>Test Report - Question 13 (Q13_Advance7)</h2>");
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

        try (FileWriter writer = new FileWriter(new File(outputDir, "test-report-q13.html"))) {
            writer.write(html.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
