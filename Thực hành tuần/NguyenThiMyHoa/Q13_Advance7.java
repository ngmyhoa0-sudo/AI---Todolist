package NguyenThiMyHoa;

import java.time.YearMonth;
import java.util.Calendar;

public class Q13_Advance7 {
    public int tinhThu(int ngay, int thang, int nam) {
        try {
            if (nam < 0 || thang < 1 || thang > 12 || ngay < 1) return 0;
            int maxDay = YearMonth.of(nam, thang).lengthOfMonth();
            if (ngay > maxDay) return 0;
            Calendar cal = Calendar.getInstance();
            cal.setLenient(false);
            cal.set(nam, thang - 1, ngay);
            cal.getTime();
            return cal.get(Calendar.DAY_OF_WEEK);
        } catch (Exception e) {
            return 0;
        }
    }
}
