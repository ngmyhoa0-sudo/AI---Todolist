package NguyenThiMyHoa;

import java.time.LocalDate;
import java.time.Period;

public class Q12_Advance6 {
    public int tinhTuoi(int ngay, int thang, int nam) {
        if (nam < 0 || thang < 1 || thang > 12 || ngay < 1) return -1;
        try {
            LocalDate ngaySinh = LocalDate.of(nam, thang, ngay);
            LocalDate ngayHienTai = LocalDate.now();
            if (ngaySinh.isAfter(ngayHienTai)) return -1;
            return Period.between(ngaySinh, ngayHienTai).getYears();
        } catch (Exception e) {
            return -1;
        }
    }
}
