package NguyenThiMyHoa;

public class Q1_SolveEquation {
    public String linearEquation(int number1, int number2) {
        if (number1 == 0)
            if (number2 == 0)
                return "Multi roots";
            else
                return "No root";
        else
            return "One root";
    }
}
