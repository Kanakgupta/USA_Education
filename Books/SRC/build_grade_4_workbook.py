from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.graphics.shapes import Circle, Drawing, Line, Rect, String
from reportlab.platypus import PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


OUTPUT_FILE = "grade_4_math_expressions_visual_practice.pdf"

CHAPTERS = [
    ("Place Value and Multi-Digit Addition and Subtraction", [
        ("Reading, writing, and rounding large numbers", "<b>What it means:</b> Every digit has a place value. Moving one place left makes its value 10 times greater. <b>Example:</b> In 582,641, the 8 is worth 80,000. To round 582,641 to the nearest ten thousand, look at the thousands digit, 2. Since 2 is less than 5, the answer is 580,000. <b>Remember:</b> Find the target place, look one digit to the right, and then round.", "place"),
        ("Adding multi-digit numbers", "<b>What it means:</b> Put digits with the same place value in vertical columns. Regroup when a column adds to 10 or more. <b>Example:</b> In 4,786 + 2,549, add ones first. When the ones total 15, write 5 ones and regroup 1 ten. <b>Remember:</b> Begin on the right and move left one place at a time.", "add"),
        ("Subtracting multi-digit numbers", "<b>What it means:</b> Subtraction compares or takes away amounts. Regroup when the top digit is smaller than the bottom digit. <b>Example:</b> In 6,203 - 1,478, trade 1 hundred for 10 tens, then continue as needed. <b>Remember:</b> Check by adding your difference to the number you subtracted.", "subtract"),
    ]),
    ("Multiplication with Whole Numbers", [
        ("Arrays and area models", "<b>What it means:</b> An array has equal rows and columns. An area model splits a larger factor into tens, hundreds, and ones. <b>Example:</b> For 23 x 4, split 23 into 20 + 3. Then 20 x 4 = 80 and 3 x 4 = 12, so the product is 92. <b>Remember:</b> Add every partial product.", "array"),
        ("Multiplying a 1-digit number by a 4-digit number", "<b>What it means:</b> Multiply each place value by the one-digit factor, regrouping when needed. <b>Example:</b> For 3 x 1,426, multiply 3 by ones, tens, hundreds, and thousands in order. <b>Remember:</b> Estimate first. Since 3 x 1,400 is about 4,200, a product near 4,278 is reasonable.", "multiply"),
        ("Multiplying two 2-digit numbers", "<b>What it means:</b> Break one factor into tens and ones. <b>Example:</b> For 24 x 13, calculate 24 x 10 = 240 and 24 x 3 = 72; then add 240 + 72 = 312. <b>Remember:</b> The tens partial product represents tens, not ones.", "two_digit"),
    ]),
    ("Division with Whole Numbers", [
        ("Division vocabulary and equal groups", "<b>What it means:</b> The dividend is the amount being shared, the divisor tells how many equal groups, and the quotient is the amount in each group. <b>Example:</b> In 84 divided by 6 = 14, 84 is the dividend, 6 is the divisor, and 14 is the quotient. <b>Remember:</b> Multiply divisor x quotient to check.", "division"),
        ("Long division with a 1-digit divisor", "<b>What it means:</b> Long division repeats four steps: divide, multiply, subtract, and bring down. <b>Example:</b> To divide 864 by 4, work from the hundreds place to the ones place. <b>Remember:</b> A quotient digit belongs directly above the place you divided.", "long_division"),
        ("Interpreting remainders", "<b>What it means:</b> A remainder is what is left after making equal groups. The story decides what to do with it. <b>Example:</b> If 29 students ride vans that hold 6 students, 29 divided by 6 is 4 remainder 5. You need 5 vans, because the 5 students still need a ride. <b>Remember:</b> A remainder is always smaller than the divisor.", "remainder"),
    ]),
    ("Equations and Word Problems", [
        ("Solving multi-step word problems", "<b>What it means:</b> Multi-step problems need more than one operation. Read carefully, organize the facts, solve one step, and use that result in the next step. <b>Example:</b> If 6 boxes hold 24 pencils each and 17 pencils are given away, first multiply, then subtract. <b>Remember:</b> Write an equation for each step and label the answer.", "word_problem"),
        ("Variables and equations", "<b>What it means:</b> A variable is a letter that stands for an unknown number. An equation says two amounts are equal. <b>Example:</b> In n + 36 = 91, subtract 36 from both sides to find n = 55. <b>Remember:</b> Use the inverse operation to undo what happened to the variable.", "equation"),
        ("Factors, multiples, prime, and composite numbers", "<b>What it means:</b> Factors multiply to make a number. Multiples are the numbers made by multiplying. A prime number has exactly two factors; a composite number has more than two. <b>Example:</b> 18 has factors 1, 2, 3, 6, 9, and 18, so it is composite. <b>Remember:</b> 1 is neither prime nor composite.", "factors"),
    ]),
    ("Measurement", [
        ("Converting measurement units", "<b>What it means:</b> A conversion changes the unit name but not the amount. <b>Example:</b> Since 1 foot equals 12 inches, 4 feet equals 4 x 12 = 48 inches. <b>Remember:</b> When changing from a larger unit to a smaller unit, the number gets larger.", "convert"),
        ("Time, metric weight, and liquid volume", "<b>What it means:</b> Use conversion facts to solve with time, grams and kilograms, or cups, pints, quarts, and gallons. <b>Example:</b> Since 1 kilogram is 1,000 grams, 3 kilograms is 3,000 grams. <b>Remember:</b> Write the conversion fact before you calculate.", "units"),
        ("Perimeter and area in real life", "<b>What it means:</b> Perimeter measures the distance around an object. Area measures the space inside a flat shape. <b>Example:</b> A 7-meter by 4-meter garden has perimeter 22 meters and area 28 square meters. <b>Remember:</b> Perimeter uses units; area uses square units.", "perimeter"),
    ]),
    ("Fraction Concepts and Operations", [
        ("Equivalent fractions and simplest form", "<b>What it means:</b> Equivalent fractions name the same amount. A fraction is in simplest form when the numerator and denominator have no common factor except 1. <b>Example:</b> 2/4 = 1/2 because both numerator and denominator can be divided by 2. <b>Remember:</b> Whatever you do to the top, do to the bottom.", "fraction_bar"),
        ("Adding fractions with like denominators", "<b>What it means:</b> Fractions with the same denominator have equal-size pieces. Add the numerators and keep the denominator. <b>Example:</b> 3/8 + 2/8 = 5/8. <b>Remember:</b> Do not add the denominators when they already match.", "fraction_add"),
        ("Subtracting fractions and mixed numbers", "<b>What it means:</b> Subtract fractions with like denominators by subtracting the numerators. <b>Example:</b> 7/10 - 3/10 = 4/10 = 2/5. <b>Remember:</b> When subtracting mixed numbers, regroup one whole as fractional pieces if the fraction is too small.", "fraction_subtract"),
    ]),
    ("Fractions and Decimals", [
        ("Multiplying a fraction by a whole number", "<b>What it means:</b> A whole number times a fraction means repeated groups of that fraction. <b>Example:</b> 3 x 2/5 = 6/5 = 1 1/5. <b>Remember:</b> Multiply the numerator by the whole number, then simplify or make a mixed number.", "fraction_multiply"),
        ("Tenths and hundredths", "<b>What it means:</b> Decimals are another way to write fractions with denominators of 10, 100, and so on. <b>Example:</b> 0.7 is seven tenths, or 7/10. The decimal 0.35 is thirty-five hundredths, or 35/100. <b>Remember:</b> The first place right of the decimal is tenths; the second is hundredths.", "decimal_grid"),
        ("Comparing decimals and fractions", "<b>What it means:</b> Compare quantities by writing them in a common form. <b>Example:</b> 3/4 = 0.75, so 0.75 is greater than 0.7. <b>Remember:</b> Add a zero if needed: 0.7 = 0.70.", "compare"),
    ]),
    ("Geometry", [
        ("Points, lines, segments, rays, and parallel or perpendicular lines", "<b>What it means:</b> A point shows an exact location. A line continues forever both ways, a segment has two endpoints, and a ray has one endpoint. Parallel lines never meet; perpendicular lines meet at right angles. <b>Remember:</b> Look for arrowheads and endpoints to name each figure.", "lines"),
        ("Measuring and classifying angles", "<b>What it means:</b> An angle measures a turn. Acute angles are less than 90 degrees, right angles equal 90 degrees, and obtuse angles are between 90 and 180 degrees. <b>Example:</b> A 120-degree angle is obtuse. <b>Remember:</b> Compare the opening, not the length of the rays.", "angle"),
        ("Triangles, quadrilaterals, and symmetry", "<b>What it means:</b> Classify shapes by their sides and angles. A line of symmetry splits a figure into matching mirror-image halves. <b>Example:</b> A square has four equal sides, four right angles, and four lines of symmetry. <b>Remember:</b> Fold along a symmetry line; both sides should match exactly.", "symmetry"),
    ]),
]


def visual(kind):
    drawing = Drawing(440, 112)
    navy, teal, gold, pale = colors.HexColor("#0B3954"), colors.HexColor("#007C91"), colors.HexColor("#F4B942"), colors.HexColor("#EDF6F9")
    drawing.add(Rect(0, 0, 440, 112, fillColor=pale, strokeColor=colors.HexColor("#A9C5D1"), rx=4, ry=4))
    drawing.add(String(12, 94, "Visual model", fontName="Helvetica-Bold", fontSize=10, fillColor=navy))
    if kind == "place":
        for index, label in enumerate(["Millions", "Hundred-thousands", "Ten-thousands", "Thousands"]):
            drawing.add(Rect(20 + index * 102, 45, 94, 24, fillColor=colors.white, strokeColor=teal)); drawing.add(String(23 + index * 102, 75, label, fontSize=7, fillColor=navy))
        drawing.add(String(65, 52, "5", fontName="Helvetica-Bold", fontSize=16, fillColor=teal)); drawing.add(String(167, 52, "8", fontName="Helvetica-Bold", fontSize=16, fillColor=teal)); drawing.add(String(269, 52, "2", fontName="Helvetica-Bold", fontSize=16, fillColor=teal)); drawing.add(String(371, 52, "6", fontName="Helvetica-Bold", fontSize=16, fillColor=teal))
    elif kind in {"add", "subtract"}:
        operator = "+" if kind == "add" else "-"; result = "7,335" if kind == "add" else "4,725"
        drawing.add(String(85, 68, "  4,786", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(String(85, 44, f"{operator} 2,549" if kind == "add" else f"{operator} 1,478", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(Line(75, 38, 210, 38, strokeColor=teal)); drawing.add(String(85, 15, f"  {result}", fontName="Helvetica-Bold", fontSize=18, fillColor=teal))
    elif kind in {"array", "multiply", "two_digit"}:
        for row in range(3):
            for column in range(4): drawing.add(Circle(48 + column * 18, 30 + row * 18, 5, fillColor=gold, strokeColor=gold))
        drawing.add(String(150, 58, "23 x 4", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(String(150, 32, "20 x 4 + 3 x 4 = 92", fontName="Helvetica-Bold", fontSize=14, fillColor=teal))
    elif kind in {"division", "long_division", "remainder"}:
        drawing.add(String(65, 57, "4 ) 864", fontName="Helvetica-Bold", fontSize=22, fillColor=navy)); drawing.add(String(220, 57, "= 216", fontName="Helvetica-Bold", fontSize=22, fillColor=teal)); drawing.add(String(75, 22, "divisor x quotient = dividend", fontName="Helvetica-Bold", fontSize=13, fillColor=navy))
    elif kind in {"word_problem", "equation", "factors"}:
        drawing.add(String(38, 62, "n + 36 = 91", fontName="Helvetica-Bold", fontSize=20, fillColor=navy)); drawing.add(String(215, 62, "n = 91 - 36 = 55", fontName="Helvetica-Bold", fontSize=17, fillColor=teal)); drawing.add(String(85, 25, "Use an inverse operation to find n", fontSize=13, fillColor=navy))
    elif kind in {"convert", "units"}:
        drawing.add(String(45, 60, "4 feet", fontName="Helvetica-Bold", fontSize=20, fillColor=navy)); drawing.add(String(150, 60, "x 12", fontName="Helvetica-Bold", fontSize=16, fillColor=teal)); drawing.add(String(245, 60, "48 inches", fontName="Helvetica-Bold", fontSize=20, fillColor=navy)); drawing.add(String(85, 25, "1 foot = 12 inches", fontSize=13, fillColor=navy))
    elif kind == "perimeter":
        drawing.add(Rect(105, 28, 180, 48, fillColor=colors.white, strokeColor=teal, strokeWidth=2)); drawing.add(String(165, 80, "7 m", fontSize=12, fillColor=navy)); drawing.add(String(290, 50, "4 m", fontSize=12, fillColor=navy)); drawing.add(String(60, 12, "Perimeter = 22 m; Area = 28 square m", fontName="Helvetica-Bold", fontSize=13, fillColor=navy))
    elif kind.startswith("fraction") or kind == "compare":
        for row, parts in enumerate([2, 4]):
            for part in range(parts): drawing.add(Rect(35 + part * (180 / parts), 63 - row * 37, 180 / parts, 24, fillColor=gold if part < parts / 2 else colors.white, strokeColor=teal))
        drawing.add(String(240, 69, "1/2", fontName="Helvetica-Bold", fontSize=17, fillColor=navy)); drawing.add(String(240, 32, "2/4", fontName="Helvetica-Bold", fontSize=17, fillColor=navy)); drawing.add(String(305, 50, "same amount", fontSize=13, fillColor=teal))
    elif kind in {"decimal_grid", "decimal"}:
        for row in range(5):
            for column in range(10): drawing.add(Rect(40 + column * 14, 25 + row * 12, 14, 12, fillColor=gold if row == 0 and column < 7 else colors.white, strokeColor=teal))
        drawing.add(String(220, 58, "0.7 = 7/10", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(String(220, 30, "0.35 = 35/100", fontName="Helvetica-Bold", fontSize=15, fillColor=teal))
    elif kind == "lines":
        drawing.add(Line(45, 70, 170, 70, strokeColor=teal, strokeWidth=2)); drawing.add(Line(45, 35, 170, 35, strokeColor=teal, strokeWidth=2)); drawing.add(String(55, 80, "parallel", fontSize=11, fillColor=navy)); drawing.add(Line(270, 25, 270, 84, strokeColor=navy, strokeWidth=2)); drawing.add(Line(230, 55, 330, 55, strokeColor=navy, strokeWidth=2)); drawing.add(String(285, 80, "perpendicular", fontSize=11, fillColor=navy))
    elif kind == "angle":
        drawing.add(Line(80, 30, 80, 84, strokeColor=navy, strokeWidth=2)); drawing.add(Line(80, 30, 145, 72, strokeColor=teal, strokeWidth=2)); drawing.add(String(105, 46, "45 degrees", fontSize=11, fillColor=teal)); drawing.add(String(205, 58, "acute < 90", fontName="Helvetica-Bold", fontSize=16, fillColor=navy))
    else:
        drawing.add(Line(140, 20, 140, 85, strokeColor=teal, strokeWidth=2)); drawing.add(Rect(85, 27, 110, 52, fillColor=colors.white, strokeColor=navy)); drawing.add(String(235, 57, "line of symmetry", fontName="Helvetica-Bold", fontSize=14, fillColor=navy)); drawing.add(String(85, 12, "Matching halves fold together", fontSize=13, fillColor=teal))
    return drawing


def make_item(question, answer, work):
    return {"question": question, "answer": answer, "work": work}


def chapter_questions(chapter_number):
    questions = []
    if chapter_number == 1:
        for value, place in [(582641, "ten thousand"), (769328, "hundred thousand"), (431876, "thousand"), (915492, "ten thousand"), (246751, "hundred thousand"), (680149, "thousand"), (357862, "ten thousand"), (824399, "hundred thousand"), (508741, "thousand"), (693258, "ten thousand")]:
            factor = {"thousand": 1000, "ten thousand": 10000, "hundred thousand": 100000}[place]; rounded = round(value / factor) * factor
            questions.append(make_item(f"Round {value:,} to the nearest {place}.", f"{rounded:,}", f"Look at the digit to the right of the {place} place. Round {value:,} to {rounded:,}."))
        for index in range(10):
            first, second = 34_786 + index * 3_217, 25_449 + index * 2_034
            questions.append(make_item(f"Find {first:,} + {second:,}.", f"{first + second:,}", f"Line up place values and add from right to left, regrouping when a column totals 10 or more: {first:,} + {second:,} = {first + second:,}."))
        for index in range(10):
            first, second = 86_203 + index * 2_519, 41_478 + index * 1_307
            questions.append(make_item(f"Find {first:,} - {second:,}.", f"{first - second:,}", f"Line up place values and subtract from right to left. Regroup when needed: {first:,} - {second:,} = {first - second:,}."))
    elif chapter_number == 2:
        for index in range(10):
            a, b = 20 + index * 7 + 3, index + 3; answer = a * b
            questions.append(make_item(f"Use an area model to find {a} x {b}.", str(answer), f"Split {a} into tens and ones, multiply each part by {b}, and add the partial products to get {answer}."))
        for index in range(10):
            a, b = 1426 + index * 317, (index % 6) + 2; answer = a * b
            questions.append(make_item(f"Find {a:,} x {b}.", f"{answer:,}", f"Multiply {a:,} by {b} one place at a time, regrouping when needed. The product is {answer:,}."))
        for index in range(10):
            a, b = 12 + index, 14 + index * 2; answer = a * b
            questions.append(make_item(f"Find {a} x {b}.", str(answer), f"Break {b} into tens and ones: {a} x {b // 10 * 10} + {a} x {b % 10} = {answer}."))
    elif chapter_number == 3:
        for dividend, divisor in [(84, 6), (96, 8), (72, 9), (63, 7), (144, 12), (120, 10), (132, 11), (108, 9), (156, 12), (175, 7)]:
            answer = dividend // divisor
            questions.append(make_item(f"Name the dividend, divisor, and quotient in {dividend} divided by {divisor} = {answer}.", f"Dividend {dividend}; divisor {divisor}; quotient {answer}", f"The dividend is being shared ({dividend}), the divisor tells the group size ({divisor}), and the quotient is the answer ({answer})."))
        for index in range(10):
            dividend, divisor = 864 + index * 125, (index % 6) + 3; quotient, remainder = divmod(dividend, divisor)
            questions.append(make_item(f"Divide {dividend:,} by {divisor}. Give a quotient and remainder.", f"{quotient} R {remainder}", f"Use divide, multiply, subtract, and bring down. Check: {divisor} x {quotient} + {remainder} = {dividend:,}."))
        for students, seats in [(29, 6), (47, 8), (73, 10), (58, 9), (65, 12), (94, 15), (38, 7), (53, 8), (76, 11), (101, 20)]:
            vans = -(-students // seats)
            questions.append(make_item(f"{students} students need vans with {seats} seats each. How many vans are needed?", str(vans), f"{students} divided by {seats} has a remainder, so one more van is needed for the remaining students. The answer is {vans} vans."))
    elif chapter_number == 4:
        for index in range(10):
            boxes, each, given = index + 3, index * 5 + 12, index * 4 + 5; answer = boxes * each - given
            questions.append(make_item(f"A shop has {boxes} boxes with {each} pencils each. It gives away {given} pencils. How many pencils remain?", str(answer), f"First find the total: {boxes} x {each} = {boxes * each}. Then subtract {given}: {boxes * each} - {given} = {answer}."))
        for index in range(10):
            total, add = 90 + index * 7, 25 + index * 3; answer = total - add
            questions.append(make_item(f"Solve n + {add} = {total}.", str(answer), f"Subtract {add} from both sides: n = {total} - {add} = {answer}."))
        for value in range(20, 30):
            factors = [factor for factor in range(1, value + 1) if value % factor == 0]; kind = "prime" if len(factors) == 2 else "composite"
            questions.append(make_item(f"List the factors of {value}. Then decide whether it is prime or composite.", f"Factors: {', '.join(map(str, factors))}; {kind}", f"Factors divide evenly into {value}. It has {len(factors)} factors, so it is {kind}."))
    elif chapter_number == 5:
        conversions = [(3, "hours", "minutes", 180), (4, "feet", "inches", 48), (7, "yards", "feet", 21), (5, "meters", "centimeters", 500), (2, "kilograms", "grams", 2000), (6, "pints", "cups", 12), (3, "quarts", "pints", 6), (2, "gallons", "quarts", 8), (9, "days", "hours", 216), (5, "weeks", "days", 35)]
        for amount, large, small, answer in conversions: questions.append(make_item(f"Convert {amount} {large} to {small}.", f"{answer} {small}", f"Use the conversion fact, then multiply: {amount} {large} = {answer} {small}."))
        for index in range(10):
            kilograms = index + 2; grams = kilograms * 1000
            questions.append(make_item(f"A bag has {kilograms} kilograms of rice. How many grams is that?", f"{grams:,} grams", f"One kilogram is 1,000 grams, so {kilograms} x 1,000 = {grams:,} grams."))
        for index in range(10):
            length, width = index + 5, index + 3; perimeter, area = 2 * (length + width), length * width
            questions.append(make_item(f"A rectangle is {length} m by {width} m. Find its perimeter and area.", f"Perimeter {perimeter} m; area {area} square m", f"Perimeter = 2 x ({length} + {width}) = {perimeter} m. Area = {length} x {width} = {area} square meters."))
    elif chapter_number == 6:
        for numerator, denominator in [(1, 2), (2, 3), (3, 4), (2, 5), (3, 8), (4, 6), (5, 10), (3, 9), (4, 12), (6, 8)]:
            simplified_num, simplified_den = numerator, denominator
            for divisor in range(min(numerator, denominator), 1, -1):
                if numerator % divisor == 0 and denominator % divisor == 0: simplified_num, simplified_den = numerator // divisor, denominator // divisor; break
            questions.append(make_item(f"Write {numerator}/{denominator} in simplest form.", f"{simplified_num}/{simplified_den}", f"Divide the numerator and denominator by their greatest common factor to get {simplified_num}/{simplified_den}."))
        for index in range(10):
            denominator, first, second = index + 5, index % 4 + 1, index % 3 + 1; answer = first + second
            questions.append(make_item(f"Find {first}/{denominator} + {second}/{denominator}.", f"{answer}/{denominator}", f"The denominators match, so add the numerators: {first} + {second} = {answer}. Keep denominator {denominator}."))
        for index in range(10):
            denominator, first, second = index + 7, index % 5 + 4, index % 3 + 1; answer = first - second
            questions.append(make_item(f"Find {first}/{denominator} - {second}/{denominator}.", f"{answer}/{denominator}", f"The denominators match, so subtract the numerators: {first} - {second} = {answer}. Keep denominator {denominator}."))
    elif chapter_number == 7:
        for numerator, denominator, whole in [(1, 3, 4), (2, 5, 3), (3, 4, 2), (2, 7, 5), (3, 8, 4), (4, 9, 3), (5, 6, 2), (1, 8, 6), (3, 5, 4), (7, 10, 3)]:
            top = numerator * whole; answer = f"{top // denominator} {top % denominator}/{denominator}" if top >= denominator and top % denominator else str(top // denominator) if top >= denominator else f"{top}/{denominator}"
            questions.append(make_item(f"Find {whole} x {numerator}/{denominator}.", answer, f"Multiply the numerator by {whole}: {whole} x {numerator}/{denominator} = {top}/{denominator}. Simplify or write as a mixed number: {answer}."))
        for tenths in range(1, 11):
            questions.append(make_item(f"Write {tenths}/10 as a decimal.", f"{tenths / 10:.1f}", f"A denominator of 10 means tenths. Put {tenths} in the tenths place: {tenths / 10:.1f}."))
        for index in range(10):
            first, second = index / 10 + 0.25, index / 10 + 0.18; symbol = ">" if first > second else "=" if first == second else "<"
            questions.append(make_item(f"Compare {first:.2f} and {second:.2f}. Use <, >, or =.", symbol, f"Compare tenths and then hundredths. {first:.2f} {symbol} {second:.2f}."))
    else:
        for name, description in [("point", "a location"), ("line segment", "two endpoints"), ("ray", "one endpoint"), ("parallel lines", "lines that never meet"), ("perpendicular lines", "lines meeting at a right angle")]:
            for repeat in range(2): questions.append(make_item(f"Which geometry word means {description}?", name, f"A {name} is described as {description}."))
        for angle in [25, 45, 70, 90, 110, 135, 160, 85, 100, 180]:
            kind = "acute" if angle < 90 else "right" if angle == 90 else "obtuse" if angle < 180 else "straight"
            questions.append(make_item(f"Classify a {angle}-degree angle.", kind, f"{angle} degrees is {kind} because it is " + ("less than 90" if kind == "acute" else "equal to 90" if kind == "right" else "between 90 and 180" if kind == "obtuse" else "equal to 180") + " degrees."))
        for sides, name, symmetry in [(3, "equilateral triangle", 3), (4, "square", 4), (4, "rectangle", 2), (4, "rhombus", 2), (5, "regular pentagon", 5), (6, "regular hexagon", 6), (4, "trapezoid", 0), (3, "scalene triangle", 0), (4, "kite", 1), (4, "parallelogram", 0)]:
            questions.append(make_item(f"How many lines of symmetry does a {name} have?", str(symmetry), f"A {name} has {symmetry} line(s) of symmetry because only that many folds make matching mirror-image halves."))
    return questions


def footer(canvas, document):
    canvas.saveState(); canvas.setFont("Helvetica", 8); canvas.setFillColor(colors.HexColor("#555555")); canvas.drawString(0.65 * inch, 0.42 * inch, "Original Grade 4 practice material based on the supplied unit scope"); canvas.drawRightString(7.85 * inch, 0.42 * inch, f"Page {document.page}"); canvas.restoreState()


def build_pdf():
    document = SimpleDocTemplate(OUTPUT_FILE, pagesize=letter, rightMargin=0.62 * inch, leftMargin=0.62 * inch, topMargin=0.62 * inch, bottomMargin=0.65 * inch)
    styles = getSampleStyleSheet()
    title = ParagraphStyle("TitleCustom", parent=styles["Title"], alignment=TA_CENTER, fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=colors.HexColor("#0B3954"))
    heading = ParagraphStyle("ChapterHeading", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=colors.HexColor("#0B3954"), spaceBefore=4, spaceAfter=8)
    problem = ParagraphStyle("Problem", parent=styles["BodyText"], fontSize=10.2, leading=14, spaceAfter=10)
    solution = ParagraphStyle("Solution", parent=styles["BodyText"], fontSize=9.4, leading=13, spaceAfter=7)
    story = [Spacer(1, 1.05 * inch), Paragraph("Expanded Grade 4 Math Practice", title), Spacer(1, 0.18 * inch), Paragraph("Volumes 1 and 2 | 8 Chapters | 240 Original Questions | Visual Lessons and Worked Solutions", ParagraphStyle("Subtitle", parent=styles["BodyText"], alignment=TA_CENTER, fontSize=10, leading=14, textColor=colors.HexColor("#355C7D"))), Spacer(1, 0.35 * inch), Paragraph("This workbook follows the Grade 4 unit scope you supplied. Every lesson, visual, question, answer, and explanation is newly written practice material and is not copied from a textbook." , styles["BodyText"]), PageBreak(), Paragraph("Contents", heading)]
    contents = [["Volume", "Chapter", "Focus", "Questions"]]
    for number, (name, _) in enumerate(CHAPTERS, 1): contents.append(["1" if number <= 4 else "2", str(number), name, "30"])
    table = Table(contents, colWidths=[0.65 * inch, 0.7 * inch, 4.85 * inch, 0.6 * inch])
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0B3954")), ("TEXTCOLOR", (0, 0), (-1, 0), colors.white), ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"), ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#A9C5D1")), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("FONTSIZE", (0, 0), (-1, -1), 9), ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EDF6F9")]), ("LEFTPADDING", (0, 0), (-1, -1), 6), ("RIGHTPADDING", (0, 0), (-1, -1), 6), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6)]))
    story.extend([table, PageBreak()])
    for chapter_number, (name, concepts) in enumerate(CHAPTERS, 1):
        if chapter_number in (1, 5):
            volume = 1 if chapter_number == 1 else 2
            label = "Chapters 1-4: whole-number operations and algebraic thinking." if volume == 1 else "Chapters 5-8: measurement, fractions, decimals, and geometry."
            story.extend([Paragraph(f"Volume {volume}", heading), Paragraph(label, styles["BodyText"]), Spacer(1, 0.15 * inch)])
        questions = chapter_questions(chapter_number)
        story.append(Paragraph(f"Chapter {chapter_number}: {name}", heading))
        start = 0
        for concept_name, lesson, kind in concepts:
            end = start + 10
            story.extend([Paragraph(f"Concept: {concept_name}", styles["Heading2"]), Paragraph(lesson, styles["BodyText"]), Spacer(1, 0.08 * inch), visual(kind), Spacer(1, 0.12 * inch), Paragraph("Questions", styles["Heading3"])])
            for number, question in enumerate(questions[start:end], start + 1):
                story.extend([Paragraph(f"{number}. {question['question']}", problem), Spacer(1, 0.1 * inch)])
            start = end
        story.extend([Paragraph("Chapter Answers and Explained Solutions", styles["Heading2"]), Paragraph("Use these explanations to understand the concept and check how the answer is found.", styles["BodyText"])])
        for number, question in enumerate(questions, 1): story.append(Paragraph(f"<b>{chapter_number}.{number}</b> Answer: <b>{question['answer']}</b><br/>{question['work']}", solution))
        if chapter_number != len(CHAPTERS): story.append(PageBreak())
    document.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()