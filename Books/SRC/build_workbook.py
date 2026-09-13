from fractions import Fraction

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.graphics.shapes import Circle, Drawing, Line, Rect, String
from reportlab.platypus import (
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


OUTPUT_FILE = "grade_5_math_expressions_expanded_practice_visual_lessons.pdf"

CHAPTER_CONCEPTS = {
    1: [
        ("Multiplicative comparisons and word problems", "Use multiplication to find an unknown total or compare quantities. Read for equal groups and phrases such as “times as many.”", 0, 15),
        ("Expressions, parentheses, and properties", "Parentheses tell you what to calculate first. The distributive property breaks one factor into easier parts.", 15, 25),
        ("Factors", "Factors are whole numbers that multiply to make a product. Find them by making multiplication pairs.", 25, 30),
    ],
    2: [
        ("Perimeter and area of rectangles", "Perimeter measures distance around a shape. Area measures the square units that cover its inside.", 0, 10),
        ("Finding an unknown side length", "When area and one side are known, divide the area by the known side to find the missing side.", 10, 20),
        ("Area models for multiplication", "Split a two-digit factor into tens and ones, multiply each part, and add the partial products.", 20, 30),
    ],
    3: [
        ("Adding and subtracting whole numbers", "Line up digits by place value. Regroup when a column has too many ones or too few to subtract.", 0, 15),
        ("Adding and subtracting decimals", "Always line up decimal points. Add zeros as placeholders when a number has fewer decimal places.", 15, 30),
    ],
    4: [
        ("Measuring and classifying angles", "Acute angles are less than 90 degrees, right angles equal 90 degrees, obtuse angles are between 90 and 180 degrees, and straight angles equal 180 degrees.", 0, 10),
        ("Angles on a straight line", "The two adjacent angles on a straight line total 180 degrees. Subtract a known angle from 180 to find the other.", 10, 20),
        ("Polygons", "A polygon is a closed shape made from line segments. Its number of sides equals its number of vertices.", 20, 30),
    ],
    5: [
        ("Equivalent fractions", "Equivalent fractions name the same amount. Multiply the numerator and denominator by the same nonzero number.", 0, 8),
        ("Adding fractions", "Use a common denominator so the pieces are the same size, then add the numerators.", 8, 15),
        ("Subtracting fractions", "Rewrite fractions with a common denominator, subtract the numerators, and simplify the result when possible.", 15, 22),
        ("Comparing fractions and decimals", "Convert to a shared form, such as decimals, or compare each number to useful benchmarks like one-half and one.", 22, 30),
    ],
    6: [
        ("Volume of rectangular prisms", "Volume is the number of cubic units that fill a solid. Multiply length, width, and height: V = l x w x h.", 0, 10),
        ("Capacity, mass, and length conversions", "Use a conversion relationship to change units. Multiply when moving from a larger unit to a smaller unit.", 10, 20),
        ("Volume as equal layers", "A rectangular prism has equal layers. Multiply the cubes in one layer by the number of layers.", 20, 30),
    ],
    7: [
        ("Integers and absolute value", "Integers include negative numbers, positive numbers, and zero. Absolute value is a number’s distance from zero.", 0, 15),
        ("The coordinate plane", "An ordered pair is written (x, y). The signs of x and y determine which quadrant contains the point.", 15, 30),
    ],
    8: [
        ("Multiplying fractions by whole numbers", "Multiply a fraction by a whole number, then simplify or write the answer as a mixed number when needed.", 0, 8),
        ("Dividing fractions by whole numbers", "Dividing a fraction by a whole number means splitting it into that many equal groups; multiply by the reciprocal of the whole number.", 8, 15),
        ("Long division and remainders", "Divide one place at a time. Check a quotient and remainder with divisor x quotient + remainder = dividend.", 15, 23),
        ("Decimal multiplication and division", "Use place value carefully. Estimate first, then place the decimal point so the result is reasonable.", 23, 30),
    ],
}

CONCEPT_LESSONS = {
    "Multiplicative comparisons and word problems": "<b>What it means:</b> Multiplication is useful when every group has the same amount or when one amount is a certain number of times another amount. <b>Example:</b> If 4 boxes hold 3 books each, draw 4 equal groups of 3. Then write 4 x 3 = 12. <b>Remember:</b> The words <i>each</i>, <i>groups of</i>, and <i>times as many</i> often signal multiplication.",
    "Expressions, parentheses, and properties": "<b>What it means:</b> An expression is a math sentence without an equals sign. Parentheses act like a fence: solve what is inside first. <b>Example:</b> In 5 x (8 + 2), add 8 + 2 first to make 10, then multiply 5 x 10. The distributive property gives another path: 5 x 8 + 5 x 2. <b>Remember:</b> Both paths give the same total.",
    "Factors": "<b>What it means:</b> Factors are the numbers multiplied together to make a product. <b>Example:</b> The factor pairs for 24 are 1 x 24, 2 x 12, 3 x 8, and 4 x 6. Every number in those pairs is a factor of 24. <b>Remember:</b> Start with 1 and work upward until the pairs repeat.",
    "Perimeter and area of rectangles": "<b>What it means:</b> Perimeter is the distance all the way around a shape. Area is the amount of flat space inside it. <b>Example:</b> A 6-by-4 rectangle has perimeter 6 + 4 + 6 + 4 = 20 units, but area 6 x 4 = 24 square units. <b>Remember:</b> Perimeter uses regular units; area uses square units.",
    "Finding an unknown side length": "<b>What it means:</b> A rectangle's area is length x width. If you know the area and one side, you can use division to find the missing side. <b>Example:</b> An area of 35 square units with a width of 5 units means 35 divided by 5 = 7 units for the length. <b>Remember:</b> Multiply your two side lengths to check the area.",
    "Area models for multiplication": "<b>What it means:</b> An area model splits a harder multiplication problem into smaller, easier rectangles. <b>Example:</b> For 23 x 4, split 23 into 20 and 3. Find 20 x 4 = 80 and 3 x 4 = 12; then add 80 + 12 = 92. <b>Remember:</b> Every part of the split must be included in the final sum.",
    "Adding and subtracting whole numbers": "<b>What it means:</b> Each digit has a place value, such as ones, tens, hundreds, or thousands. <b>Example:</b> Put ones under ones, tens under tens, and so on. Regroup 10 ones as 1 ten when adding, or trade 1 ten for 10 ones when subtracting. <b>Remember:</b> Neat vertical columns protect the place values.",
    "Adding and subtracting decimals": "<b>What it means:</b> Decimal places also have place values: tenths, hundredths, and thousandths. <b>Example:</b> For 3.40 + 0.65, line up the decimal points. Add hundredths, then tenths, then ones to get 4.05. <b>Remember:</b> Add zeros as placeholders, but never move a decimal point.",
    "Measuring and classifying angles": "<b>What it means:</b> An angle is made by two rays meeting at a vertex. The size is the turn between them, measured in degrees. <b>Example:</b> A 45-degree angle is acute, a 90-degree angle is right, a 120-degree angle is obtuse, and a 180-degree angle is straight. <b>Remember:</b> Compare the opening, not the length of the rays.",
    "Angles on a straight line": "<b>What it means:</b> A straight line is a half-turn, so its angle measure is 180 degrees. <b>Example:</b> If one part of a straight line is 70 degrees, the missing part is 180 - 70 = 110 degrees. <b>Remember:</b> Add both adjacent angles to check for 180 degrees.",
    "Polygons": "<b>What it means:</b> A polygon is a closed, flat shape made only from straight line segments. <b>Example:</b> A pentagon has 5 sides and 5 vertices. A hexagon has 6 sides and 6 vertices. <b>Remember:</b> Curved sides or an open gap mean the shape is not a polygon.",
    "Equivalent fractions": "<b>What it means:</b> Equivalent fractions look different but name the same amount. <b>Example:</b> One-half and two-fourths both cover half of a shape. Multiply the numerator and denominator of 1/2 by 2 to make 2/4. <b>Remember:</b> Multiply or divide the top and bottom by the same number.",
    "Adding fractions": "<b>What it means:</b> You can only add fractions when the pieces are the same size. The denominator names the piece size. <b>Example:</b> For 1/3 + 1/6, change 1/3 into 2/6. Then add 2/6 + 1/6 = 3/6 = 1/2. <b>Remember:</b> Find a common denominator before adding the numerators.",
    "Subtracting fractions": "<b>What it means:</b> Fraction subtraction also needs equal-size pieces. <b>Example:</b> For 3/4 - 1/6, use twelfths: 3/4 = 9/12 and 1/6 = 2/12. Then 9/12 - 2/12 = 7/12. <b>Remember:</b> Subtract only the numerators after the denominators match.",
    "Comparing fractions and decimals": "<b>What it means:</b> To compare two numbers, write them in the same form or use a benchmark such as 0, 1/2, or 1. <b>Example:</b> 3/4 equals 0.75, so 3/4 is greater than 0.70. <b>Remember:</b> The symbol > points toward the smaller number, like an open mouth.",
    "Volume of rectangular prisms": "<b>What it means:</b> Volume counts the cubic units that fill a solid box. <b>Example:</b> A prism 4 units long, 3 units wide, and 2 units high contains 4 x 3 x 2 = 24 cubic units. <b>Remember:</b> Volume has three measurements and uses cubic units.",
    "Capacity, mass, and length conversions": "<b>What it means:</b> A conversion changes the unit but not the amount. <b>Example:</b> Since 1 foot = 12 inches, 3 feet = 3 x 12 = 36 inches. <b>Remember:</b> Moving from a bigger unit to a smaller unit makes the number larger.",
    "Volume as equal layers": "<b>What it means:</b> A rectangular prism is built from equal layers of cubes. <b>Example:</b> If one layer has 12 cubes and the box has 3 layers, it has 12 x 3 = 36 cubic units. <b>Remember:</b> Count a layer, then multiply by the number of layers.",
    "Integers and absolute value": "<b>What it means:</b> Integers include positive numbers, negative numbers, and zero. Absolute value is how far a number is from zero on a number line. <b>Example:</b> -5 is five steps left of zero, so |-5| = 5. <b>Remember:</b> Absolute value is never negative.",
    "The coordinate plane": "<b>What it means:</b> A coordinate plane uses a horizontal x-axis and vertical y-axis. An ordered pair is read x first, then y. <b>Example:</b> To plot (3, -2), move 3 right and then 2 down. <b>Remember:</b> Start at the origin (0, 0) every time.",
    "Multiplying fractions by whole numbers": "<b>What it means:</b> Multiplying a fraction by a whole number means taking that fraction several times. <b>Example:</b> 3/4 x 4 means four groups of 3/4. Multiply to get 12/4 = 3. <b>Remember:</b> Simplify after multiplying, and turn an improper fraction into a mixed number if needed.",
    "Dividing fractions by whole numbers": "<b>What it means:</b> Dividing a fraction by a whole number splits that fraction into equal groups. <b>Example:</b> 3/4 divided by 2 means split three fourths between 2 groups: 3/4 x 1/2 = 3/8. <b>Remember:</b> Divide by a whole number by multiplying by its reciprocal, 1 over that number.",
    "Long division and remainders": "<b>What it means:</b> Long division helps share a large amount into equal groups. <b>Example:</b> In 864 divided by 7, divide, multiply, subtract, and bring down at each place. The remainder must be smaller than 7. <b>Remember:</b> Check with divisor x quotient + remainder = dividend.",
    "Decimal multiplication and division": "<b>What it means:</b> Decimal operations use place value just like whole-number operations. <b>Example:</b> For 2.4 x 3.5, multiply 24 x 35 = 840, then place two decimal digits to get 8.40. <b>Remember:</b> Estimate first so you can tell whether the decimal point makes sense.",
}


def concept_visual(name):
    drawing = Drawing(440, 115)
    navy, teal, gold, pale = colors.HexColor("#0B3954"), colors.HexColor("#007C91"), colors.HexColor("#F4B942"), colors.HexColor("#EDF6F9")
    drawing.add(Rect(0, 0, 440, 115, fillColor=pale, strokeColor=colors.HexColor("#A9C5D1"), rx=4, ry=4))
    drawing.add(String(12, 96, "Visual model", fontName="Helvetica-Bold", fontSize=10, fillColor=navy))
    if "Multiplicative" in name:
        for column in range(4):
            drawing.add(Rect(25 + column * 68, 38, 48, 35, strokeColor=teal, fillColor=colors.white))
            for dot in range(3): drawing.add(Circle(38 + column * 68 + dot * 13, 55, 4, fillColor=gold, strokeColor=gold))
        drawing.add(String(310, 53, "4 groups x 3 = 12", fontSize=12, fillColor=navy))
    elif "Expressions" in name:
        drawing.add(String(30, 62, "5 x (8 + 2)", fontName="Helvetica-Bold", fontSize=16, fillColor=navy)); drawing.add(String(185, 62, "=", fontSize=16, fillColor=navy)); drawing.add(String(215, 62, "5 x 8 + 5 x 2", fontName="Helvetica-Bold", fontSize=16, fillColor=teal))
    elif "Factors" in name:
        drawing.add(String(36, 62, "24 = 1 x 24 = 2 x 12 = 3 x 8 = 4 x 6", fontName="Helvetica-Bold", fontSize=15, fillColor=navy))
    elif "Perimeter" in name or "unknown side" in name:
        drawing.add(Rect(100, 24, 180, 55, fillColor=colors.white, strokeColor=teal, strokeWidth=2)); drawing.add(String(158, 84, "length = 6", fontSize=11, fillColor=navy)); drawing.add(String(285, 48, "width = 4", fontSize=11, fillColor=navy)); drawing.add(String(40, 16, "Area = 6 x 4 = 24 square units", fontName="Helvetica-Bold", fontSize=12, fillColor=navy))
    elif "Area models" in name:
        drawing.add(Rect(80, 27, 200, 55, fillColor=colors.white, strokeColor=teal)); drawing.add(Line(230, 27, 230, 82, strokeColor=teal)); drawing.add(String(145, 86, "20", fontSize=11, fillColor=navy)); drawing.add(String(247, 86, "3", fontSize=11, fillColor=navy)); drawing.add(String(45, 52, "4", fontSize=11, fillColor=navy)); drawing.add(String(108, 52, "80", fontSize=14, fillColor=teal)); drawing.add(String(247, 52, "12", fontSize=14, fillColor=teal)); drawing.add(String(300, 52, "80 + 12 = 92", fontName="Helvetica-Bold", fontSize=13, fillColor=navy))
    elif "whole numbers" in name:
        for index, label in enumerate(["Thousands", "Hundreds", "Tens", "Ones"]): drawing.add(String(52 + index * 88, 75, label, fontSize=9, fillColor=navy)); drawing.add(Rect(45 + index * 88, 38, 75, 25, fillColor=colors.white, strokeColor=teal))
        drawing.add(String(105, 16, "Line up each digit by its place value", fontName="Helvetica-Bold", fontSize=12, fillColor=navy))
    elif "decimals" in name or "Decimal multiplication" in name:
        drawing.add(String(90, 67, "  2.40", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(String(90, 44, "x 3.50", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(Line(80, 38, 200, 38, strokeColor=teal)); drawing.add(String(90, 16, "  8.40", fontName="Helvetica-Bold", fontSize=18, fillColor=teal)); drawing.add(String(245, 52, "Two decimal places\nin each factor", fontSize=13, fillColor=navy))
    elif "Angles on" in name:
        drawing.add(Line(55, 45, 355, 45, strokeColor=navy, strokeWidth=2)); drawing.add(Line(205, 45, 150, 85, strokeColor=teal, strokeWidth=2)); drawing.add(String(152, 72, "70 degrees", fontSize=11, fillColor=teal)); drawing.add(String(240, 55, "110 degrees", fontSize=11, fillColor=gold)); drawing.add(String(110, 16, "70 + 110 = 180 degrees", fontName="Helvetica-Bold", fontSize=13, fillColor=navy))
    elif "angles" in name:
        drawing.add(Line(80, 30, 80, 82, strokeColor=navy, strokeWidth=2)); drawing.add(Line(80, 30, 145, 75, strokeColor=teal, strokeWidth=2)); drawing.add(String(100, 47, "45 degrees", fontSize=11, fillColor=teal)); drawing.add(String(195, 57, "acute < 90", fontSize=13, fillColor=navy)); drawing.add(String(195, 35, "right = 90", fontSize=13, fillColor=navy))
    elif "Polygons" in name:
        points = [(130, 25), (200, 25), (225, 60), (165, 88), (105, 60)]
        for start, end in zip(points, points[1:] + points[:1]): drawing.add(Line(*start, *end, strokeColor=teal, strokeWidth=2))
        drawing.add(String(270, 57, "5 sides = pentagon", fontName="Helvetica-Bold", fontSize=14, fillColor=navy))
    elif "fractions" in name.lower() or "Equivalent" in name or "Comparing" in name:
        for row, parts in enumerate([2, 4]):
            for part in range(parts): drawing.add(Rect(35 + part * (180 / parts), 63 - row * 38, 180 / parts, 25, fillColor=gold if part < parts / 2 else colors.white, strokeColor=teal))
        drawing.add(String(240, 72, "1/2", fontName="Helvetica-Bold", fontSize=16, fillColor=navy)); drawing.add(String(240, 34, "2/4", fontName="Helvetica-Bold", fontSize=16, fillColor=navy)); drawing.add(String(300, 52, "same amount", fontSize=13, fillColor=teal))
    elif "Volume" in name or "layers" in name:
        for layer in range(3):
            drawing.add(Rect(95 + layer * 17, 25 + layer * 14, 110, 48, fillColor=colors.white, strokeColor=teal)); drawing.add(String(235 + layer * 5, 36 + layer * 14, f"layer {layer + 1}", fontSize=10, fillColor=navy))
        drawing.add(String(55, 10, "12 cubes in each layer x 3 layers = 36 cubic units", fontName="Helvetica-Bold", fontSize=12, fillColor=navy))
    elif "conversions" in name:
        drawing.add(String(50, 58, "3 feet", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(String(150, 58, "x 12", fontName="Helvetica-Bold", fontSize=16, fillColor=teal)); drawing.add(String(245, 58, "36 inches", fontName="Helvetica-Bold", fontSize=18, fillColor=navy)); drawing.add(Line(115, 54, 140, 54, strokeColor=gold, strokeWidth=3)); drawing.add(Line(210, 54, 235, 54, strokeColor=gold, strokeWidth=3))
    elif "Integers" in name:
        drawing.add(Line(45, 53, 375, 53, strokeColor=navy));
        for value in range(-5, 6): drawing.add(Line(210 + value * 28, 47, 210 + value * 28, 59, strokeColor=navy)); drawing.add(String(205 + value * 28, 33, str(value), fontSize=9, fillColor=navy))
        drawing.add(String(65, 77, "|-5| = 5: five steps from zero", fontName="Helvetica-Bold", fontSize=13, fillColor=teal))
    elif "coordinate" in name.lower():
        drawing.add(Line(60, 55, 350, 55, strokeColor=navy)); drawing.add(Line(205, 15, 205, 98, strokeColor=navy)); drawing.add(Circle(270, 30, 4, fillColor=gold, strokeColor=gold)); drawing.add(String(275, 25, "(3, -2)", fontSize=12, fillColor=navy)); drawing.add(String(330, 59, "x", fontSize=11, fillColor=navy)); drawing.add(String(210, 96, "y", fontSize=11, fillColor=navy))
    elif "Long division" in name:
        drawing.add(String(75, 58, "7 ) 864", fontName="Helvetica-Bold", fontSize=22, fillColor=navy)); drawing.add(String(225, 58, "= 123 R 3", fontName="Helvetica-Bold", fontSize=20, fillColor=teal)); drawing.add(String(95, 25, "7 x 123 + 3 = 864", fontName="Helvetica-Bold", fontSize=13, fillColor=navy))
    else:
        drawing.add(String(45, 58, "3/4 x 4 = 12/4 = 3", fontName="Helvetica-Bold", fontSize=20, fillColor=navy)); drawing.add(String(75, 28, "Use a model, equation, and estimate to reason.", fontSize=13, fillColor=teal))
    return drawing


def mixed(number):
    """Format a Fraction as a whole number or mixed number."""
    if number.denominator == 1:
        return str(number.numerator)
    whole, remainder = divmod(number.numerator, number.denominator)
    if whole == 0:
        return f"{remainder}/{number.denominator}"
    return f"{whole} {remainder}/{number.denominator}"


def item(question, answer, work):
    return {"question": question, "answer": answer, "work": work}


def unit_1():
    problems = []
    for index in range(1, 11):
        groups, each = index + 3, index * 4 + 7
        total = groups * each
        problems.append(item(
            f"A library packs {groups} boxes with {each} books in each box. How many books are packed?",
            str(total),
            f"Multiply the equal groups: {groups} x {each} = {total}."
        ))
    for index in range(11, 16):
        smaller, factor = index * 6, index - 7
        larger = smaller * factor
        problems.append(item(
            f"Maya collected {smaller} shells. Diego collected {factor} times as many. How many shells did Diego collect?",
            str(larger),
            f"A multiplicative comparison uses multiplication: {smaller} x {factor} = {larger}."
        ))
    for index in range(16, 21):
        a, b, c = index + 4, index * 3, index - 9
        answer = (a + b) * c
        problems.append(item(
            f"Evaluate ({a} + {b}) x {c}.",
            str(answer),
            f"Work inside parentheses first: {a} + {b} = {a + b}. Then multiply: {a + b} x {c} = {answer}."
        ))
    for index in range(21, 26):
        a, b = index - 10, index + 2
        answer = a * b
        problems.append(item(
            f"Use the distributive property to find {a} x {b} by breaking {b} into {b - 2} + 2.",
            str(answer),
            f"{a} x ({b - 2} + 2) = ({a} x {b - 2}) + ({a} x 2) = {a * (b - 2)} + {a * 2} = {answer}."
        ))
    for number in range(26, 31):
        value = number * 3
        factors = [factor for factor in range(1, value + 1) if value % factor == 0]
        problems.append(item(
            f"List every factor of {value}.",
            ", ".join(map(str, factors)),
            f"Pair factors that multiply to {value}: " + ", ".join(f"{factor} x {value // factor}" for factor in factors if factor <= value // factor) + "."
        ))
    return "Unit 1: Multiplication and Division Word Problems", problems


def unit_2():
    problems = []
    for index in range(1, 11):
        length, width = index + 5, index + 2
        problems.append(item(
            f"A rectangle is {length} cm long and {width} cm wide. Find its perimeter and area.",
            f"Perimeter = {2 * (length + width)} cm; area = {length * width} sq cm",
            f"Perimeter = 2 x ({length} + {width}) = {2 * (length + width)} cm. Area = {length} x {width} = {length * width} square centimeters."
        ))
    for index in range(11, 21):
        length, width = index + 7, index - 4
        problems.append(item(
            f"A garden has an area of {length * width} square meters and a width of {width} meters. What is its length?",
            f"{length} m",
            f"Area = length x width, so length = {length * width} divided by {width} = {length} meters."
        ))
    for index in range(21, 31):
        tens, ones = index - 10, (index * 3) % 9 + 1
        product = (tens * 10 + ones) * (index - 14)
        multiplier = index - 14
        problems.append(item(
            f"Use an area model or the distributive property to find {tens * 10 + ones} x {multiplier}.",
            str(product),
            f"Break {tens * 10 + ones} into {tens * 10} + {ones}: ({tens * 10} x {multiplier}) + ({ones} x {multiplier}) = {tens * 10 * multiplier} + {ones * multiplier} = {product}."
        ))
    return "Unit 2: Perimeter and Area", problems


def unit_3():
    problems = []
    for index in range(1, 9):
        a, b = 23_000 + index * 4_321, 11_000 + index * 2_109
        problems.append(item(
            f"Find {a:,} + {b:,}.", str(a + b), f"Align place values and add: {a:,} + {b:,} = {a + b:,}."
        ))
    for index in range(9, 16):
        a, b = 90_000 + index * 1_317, 31_000 + index * 841
        problems.append(item(
            f"Find {a:,} - {b:,}.", str(a - b), f"Align place values and subtract: {a:,} - {b:,} = {a - b:,}."
        ))
    for index in range(16, 24):
        a, b = index + 3.47, index / 10 + 0.58
        answer = round(a + b, 2)
        problems.append(item(
            f"Find {a:.2f} + {b:.2f}.", f"{answer:.2f}", f"Line up the decimal points: {a:.2f} + {b:.2f} = {answer:.2f}."
        ))
    for index in range(24, 31):
        a, b = index + 8.36, index / 10 + 1.47
        answer = round(a - b, 2)
        problems.append(item(
            f"Find {a:.2f} - {b:.2f}.", f"{answer:.2f}", f"Line up the decimal points: {a:.2f} - {b:.2f} = {answer:.2f}."
        ))
    return "Unit 3: Addition and Subtraction of Whole Numbers and Decimals", problems


def unit_4():
    problems = []
    angles = [25, 48, 72, 90, 105, 128, 160, 180, 37, 145]
    for angle in angles:
        kind = "acute" if angle < 90 else "right" if angle == 90 else "obtuse" if angle < 180 else "straight"
        problems.append(item(
            f"Classify an angle that measures {angle} degrees.", kind, f"{angle} degrees is {kind} because it is " + ("less than 90 degrees." if kind == "acute" else "equal to 90 degrees." if kind == "right" else "between 90 and 180 degrees." if kind == "obtuse" else "equal to 180 degrees.")))
    for index in range(11, 21):
        full, known = 180, 20 + index * 7
        missing = full - known
        problems.append(item(
            f"Two angles form a straight line. One measures {known} degrees. What is the other angle?",
            f"{missing} degrees", f"Angles on a straight line total 180 degrees: 180 - {known} = {missing} degrees."
        ))
    shapes = [(3, "triangle"), (4, "quadrilateral"), (5, "pentagon"), (6, "hexagon"), (7, "heptagon"), (8, "octagon"), (9, "nonagon"), (10, "decagon"), (4, "square"), (3, "equilateral triangle")]
    for sides, name in shapes:
        problems.append(item(
            f"How many sides and vertices does a {name} have?",
            f"{sides} sides and {sides} vertices", f"A {name} has {sides} sides. Each corner is a vertex, so it has {sides} vertices."
        ))
    return "Unit 4: Circles, Angles, and Polygons", problems


def unit_5():
    problems = []
    for numerator, denominator in [(1, 2), (2, 3), (3, 4), (3, 5), (4, 7), (5, 8), (2, 9), (3, 10)]:
        multiplier = 2
        problems.append(item(
            f"Write an equivalent fraction for {numerator}/{denominator} with denominator {denominator * multiplier}.",
            f"{numerator * multiplier}/{denominator * multiplier}", f"Multiply numerator and denominator by {multiplier}: {numerator}/{denominator} = {numerator * multiplier}/{denominator * multiplier}."
        ))
    pairs = [(Fraction(1, 3), Fraction(1, 6)), (Fraction(2, 5), Fraction(1, 10)), (Fraction(3, 4), Fraction(1, 8)), (Fraction(2, 3), Fraction(1, 9)), (Fraction(3, 5), Fraction(1, 4)), (Fraction(5, 6), Fraction(1, 3)), (Fraction(7, 8), Fraction(1, 4)), (Fraction(4, 7), Fraction(2, 7)), (Fraction(5, 9), Fraction(2, 3)), (Fraction(7, 10), Fraction(3, 5)), (Fraction(11, 12), Fraction(1, 6)), (Fraction(3, 4), Fraction(2, 5)), (Fraction(5, 6), Fraction(1, 2)), (Fraction(7, 9), Fraction(1, 3))]
    for first, second in pairs[:7]:
        answer = first + second
        problems.append(item(f"Find {first.numerator}/{first.denominator} + {second.numerator}/{second.denominator}.", mixed(answer), f"Use a common denominator, then add. The sum simplifies to {mixed(answer)}."))
    for first, second in pairs[7:]:
        answer = first - second
        problems.append(item(f"Find {first.numerator}/{first.denominator} - {second.numerator}/{second.denominator}.", mixed(answer), f"Use a common denominator, then subtract. The difference simplifies to {mixed(answer)}."))
    comparisons = [(Fraction(3, 4), Fraction(7, 10)), (Fraction(5, 8), Fraction(2, 3)), (Fraction(7, 12), Fraction(3, 5)), (Fraction(9, 10), Fraction(11, 12)), (Fraction(4, 9), Fraction(5, 12)), (Fraction(3, 5), Fraction(0, 1)), (Fraction(7, 8), Fraction(0, 1)), (Fraction(2, 5), Fraction(0, 1))]
    decimals = [0.58, 0.7, 0.6, 0.9, 0.42, 0.55, 0.8, 0.45]
    for (fraction, _), decimal in zip(comparisons, decimals):
        symbol = ">" if float(fraction) > decimal else "<"
        problems.append(item(f"Compare {fraction.numerator}/{fraction.denominator} and {decimal:.2f}. Use <, >, or =.", symbol, f"Convert {fraction.numerator}/{fraction.denominator} to a decimal or use a common benchmark. {float(fraction):.3g} {symbol} {decimal:.2f}."))
    return "Unit 5: Addition and Subtraction with Fractions", problems


def unit_6():
    problems = []
    for index in range(1, 11):
        length, width, height = index + 2, index + 3, index + 1
        volume = length * width * height
        problems.append(item(f"Find the volume of a rectangular prism with length {length} cm, width {width} cm, and height {height} cm.", f"{volume} cubic cm", f"Volume = l x w x h = {length} x {width} x {height} = {volume} cubic centimeters."))
    conversions = [(3, "feet", "inches", 36), (5, "yards", "feet", 15), (4, "pints", "cups", 8), (3, "quarts", "pints", 6), (2, "gallons", "quarts", 8), (6, "pounds", "ounces", 96), (7, "kilograms", "grams", 7000), (9, "meters", "centimeters", 900), (4, "liters", "milliliters", 4000), (8, "tons", "pounds", 16000)]
    for amount, large, small, answer in conversions:
        problems.append(item(f"Convert {amount} {large} to {small}.", f"{answer} {small}", f"Use the conversion relationship: {amount} {large} = {answer} {small}."))
    for index in range(21, 31):
        cubes_per_layer, layers = index + 4, index - 14
        answer = cubes_per_layer * layers
        problems.append(item(f"A box has {layers} equal layers of unit cubes. Each layer has {cubes_per_layer} cubes. What is the volume?", f"{answer} cubic units", f"Multiply cubes in one layer by layers: {cubes_per_layer} x {layers} = {answer} cubic units."))
    return "Unit 6: Volume, Capacity, and Weight", problems


def unit_7():
    problems = []
    values = [-15, 8, -3, 0, 22, -11, 14, -9, 6, -20, 17, -4, 25, -7, 12]
    for value in values:
        problems.append(item(f"Find the absolute value of {value}.", str(abs(value)), f"Absolute value is distance from 0, so |{value}| = {abs(value)}."))
    points = [(-2, 4), (3, 5), (-4, -1), (6, -3), (-5, 2), (1, -6), (-3, -4), (5, 1), (-1, 7), (4, -5), (-6, 3), (2, -2), (-7, -3), (8, 4), (-2, -8)]
    for x_value, y_value in points:
        quadrant = "I" if x_value > 0 and y_value > 0 else "II" if x_value < 0 and y_value > 0 else "III" if x_value < 0 and y_value < 0 else "IV"
        problems.append(item(f"In which quadrant is the point ({x_value}, {y_value})?", f"Quadrant {quadrant}", f"The x-coordinate is {'positive' if x_value > 0 else 'negative'} and the y-coordinate is {'positive' if y_value > 0 else 'negative'}, so the point is in Quadrant {quadrant}."))
    return "Unit 7: Integers and the Coordinate Plane", problems


def unit_8():
    problems = []
    for fraction, whole in [(Fraction(1, 3), 6), (Fraction(2, 5), 10), (Fraction(3, 4), 8), (Fraction(5, 6), 12), (Fraction(3, 8), 16), (Fraction(7, 10), 20), (Fraction(4, 9), 18), (Fraction(5, 12), 24)]:
        answer = fraction * whole
        problems.append(item(f"Find {fraction.numerator}/{fraction.denominator} x {whole}.", mixed(answer), f"Multiply the whole number: {fraction.numerator}/{fraction.denominator} x {whole} = {mixed(answer)}."))
    for fraction, whole in [(Fraction(3, 4), 2), (Fraction(5, 6), 3), (Fraction(7, 8), 4), (Fraction(2, 3), 5), (Fraction(9, 10), 3), (Fraction(5, 12), 2), (Fraction(7, 9), 7)]:
        answer = fraction / whole
        problems.append(item(f"Find {fraction.numerator}/{fraction.denominator} divided by {whole}.", mixed(answer), f"Dividing by {whole} means multiplying by 1/{whole}: {fraction.numerator}/{fraction.denominator} x 1/{whole} = {mixed(answer)}."))
    divisions = [(864, 7), (975, 8), (1234, 9), (1465, 6), (2387, 5), (3210, 4), (1756, 3), (2689, 7)]
    for dividend, divisor in divisions:
        quotient, remainder = divmod(dividend, divisor)
        problems.append(item(f"Divide {dividend:,} by {divisor}. Give a quotient and remainder.", f"{quotient} R {remainder}", f"{dividend:,} divided by {divisor} = {quotient} remainder {remainder}, because {divisor} x {quotient} + {remainder} = {dividend:,}."))
    decimal_problems = [(2.4, 3.5), (1.25, 4), (3.6, 0.5), (7.2, 0.3), (4.08, 2), (6.25, 0.5), (8.4, 1.2)]
    for first, second in decimal_problems:
        answer = first * second if second >= 1 else first / second
        operation = "x" if second >= 1 else "divided by"
        problems.append(item(f"Find {first:.2f} {operation} {second:.2f}.", f"{answer:.2f}", f"Compute the decimal operation: {first:.2f} {operation} {second:.2f} = {answer:.2f}."))
    return "Unit 8: Advanced Multiplication and Division with Fractions and Decimals", problems


def footer(canvas, document):
    canvas.saveState()
    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(colors.HexColor("#555555"))
    canvas.drawString(0.65 * inch, 0.42 * inch, "Original practice material - aligned to the user-supplied unit scope")
    canvas.drawRightString(7.85 * inch, 0.42 * inch, f"Page {document.page}")
    canvas.restoreState()


def build_pdf():
    units = [unit_1(), unit_2(), unit_3(), unit_4(), unit_5(), unit_6(), unit_7(), unit_8()]
    document = SimpleDocTemplate(OUTPUT_FILE, pagesize=letter, rightMargin=0.62 * inch, leftMargin=0.62 * inch, topMargin=0.62 * inch, bottomMargin=0.65 * inch)
    styles = getSampleStyleSheet()
    title = ParagraphStyle("TitleCustom", parent=styles["Title"], alignment=TA_CENTER, fontName="Helvetica-Bold", fontSize=22, leading=27, textColor=colors.HexColor("#0B3954"))
    subtitle = ParagraphStyle("Subtitle", parent=styles["BodyText"], alignment=TA_CENTER, fontSize=10, leading=14, textColor=colors.HexColor("#355C7D"))
    heading = ParagraphStyle("UnitHeading", parent=styles["Heading1"], fontName="Helvetica-Bold", fontSize=15, leading=19, textColor=colors.HexColor("#0B3954"), spaceBefore=4, spaceAfter=8)
    problem = ParagraphStyle("Problem", parent=styles["BodyText"], fontSize=10.2, leading=14, spaceAfter=10)
    solution = ParagraphStyle("Solution", parent=styles["BodyText"], fontSize=9.5, leading=13, spaceAfter=7)
    story = [
        Spacer(1, 1.1 * inch),
        Paragraph("Expanded Grade 5 Math Practice", title),
        Spacer(1, 0.18 * inch),
        Paragraph("Eight Units | 240 Original Questions | Worked Solutions and Answer Key", subtitle),
        Spacer(1, 0.38 * inch),
        Paragraph("This workbook follows the eight-unit scope supplied for California Math Expressions Grade 5, Volumes 1 and 2. Questions and explanations in this book are newly written practice material; none are copied from the textbook.", styles["BodyText"]),
        Spacer(1, 0.22 * inch),
        Paragraph("Directions: Show your work. Use drawings, equations, tables, or models where they help. Check answers in the worked-solutions section only after attempting each problem.", styles["BodyText"]),
        PageBreak(),
        Paragraph("Contents", heading),
    ]
    contents = [["Volume", "Chapter", "Practice focus", "Questions"]]
    for index, (name, problems) in enumerate(units, start=1):
        volume = "1" if index <= 4 else "2"
        contents.append([volume, str(index), name.replace(f"Unit {index}: ", ""), str(len(problems))])
    table = Table(contents, colWidths=[0.65 * inch, 0.7 * inch, 4.85 * inch, 0.6 * inch])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#0B3954")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("GRID", (0, 0), (-1, -1), 0.3, colors.HexColor("#A9C5D1")),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("FONTNAME", (0, 1), (-1, -1), "Helvetica"),
        ("FONTSIZE", (0, 0), (-1, -1), 9),
        ("LEADING", (0, 0), (-1, -1), 11),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [colors.white, colors.HexColor("#EDF6F9")]),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    story.extend([table, PageBreak()])
    for unit_number, (name, problems) in enumerate(units, start=1):
        if unit_number in (1, 5):
            volume_number = 1 if unit_number == 1 else 2
            story.append(Paragraph(f"Volume {volume_number}", heading))
            story.append(Paragraph("Chapters 1-4: Whole-number operations, measurement, and geometry." if volume_number == 1 else "Chapters 5-8: Fractions, volume, coordinates, and advanced operations.", styles["BodyText"]))
            story.append(Spacer(1, 0.15 * inch))
        story.append(Paragraph(f"Chapter {unit_number}: {name.replace(f'Unit {unit_number}: ', '')}", heading))
        for concept_name, concept_explanation, start, end in CHAPTER_CONCEPTS[unit_number]:
            story.append(Paragraph(f"Concept: {concept_name}", styles["Heading2"]))
            story.append(Paragraph(CONCEPT_LESSONS[concept_name], styles["BodyText"]))
            story.append(Spacer(1, 0.08 * inch))
            story.append(concept_visual(concept_name))
            story.append(Spacer(1, 0.12 * inch))
            story.append(Paragraph("Questions", styles["Heading3"]))
            for number, problem_data in enumerate(problems[start:end], start=start + 1):
                story.append(Paragraph(f"{number}. {problem_data['question']}", problem))
                story.append(Spacer(1, 0.11 * inch))
        story.append(Paragraph("Chapter Answers and Explained Solutions", styles["Heading2"]))
        story.append(Paragraph("Use these explanations to check both the answer and the concept used to find it.", styles["BodyText"]))
        for number, problem_data in enumerate(problems, start=1):
            story.append(Paragraph(f"<b>{unit_number}.{number}</b> Answer: <b>{problem_data['answer']}</b><br/>{problem_data['work']}", solution))
        if unit_number != len(units):
            story.append(PageBreak())
    document.build(story, onFirstPage=footer, onLaterPages=footer)


if __name__ == "__main__":
    build_pdf()