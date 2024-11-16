interface Movable {
    move(x: number, y: number): void;
}

export class Point implements Movable {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        if(typeof x !== 'number' || typeof y !== 'number') {
            throw new Error("Złe dane, punkt wymaga liczb!");
        }
        this.x = x;
        this.y = y;
    }

    move(x: number, y: number) {
        this.x += x;
        this.y += y;
    }

    rotate(angle: number, p: Point): void {
        const radians = (angle * Math.PI) / 180;
        const cosinus = Math.cos(radians);
        const sinus = Math.sin(radians);

        const xrotated = p.x + (this.x - p.x) * cosinus - (this.y - p.y) * sinus;
        const yrotated = p.y + (this.x - p.x) * sinus + (this.y - p.y) * cosinus;

        this.x = xrotated;
        this.y = yrotated;
    }
}

class Rectangle implements Movable {
    a: Point;
    b: Point;
    c: Point;
    d: Point;
    private midPoint: Point;
    private height: number;
    private width: number;

    constructor(a: Point, b: Point, c: Point, d: Point) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.width  = Math.sqrt((this.b.x - this.a.x) ** 2 + (this.b.y - this.a.y) ** 2); 
        this.height = Math.sqrt((this.c.x - this.b.x) ** 2 + (this.c.y - this.b.y) ** 2);
        this.midPoint = new Point((this.a.x + this.b.x)/2, (this.a.y + this.c.y)  / 2 );
    }

    public move(x: number, y:number) {
        this.a.move(x, y);
        this.b.move(x, y);
        this.c.move(x, y);
        this.d.move(x, y);
        this.midPoint = new Point((this.a.x + this.b.x)/2, (this.a.y + this.c.y)/2);
    }

    public rotate(angle: number) {
        this.a.rotate(angle, this.midPoint);
        this.b.rotate(angle, this.midPoint);
        this.c.rotate(angle, this.midPoint);
        this.d.rotate(angle, this.midPoint);
    }

    public scale(factor: number) {
        if (factor <= 0) {
            throw new Error("Współczynnik skalowania musi być większy od 0!");
        }
    
        this.a.x = this.midPoint.x + (this.a.x - this.midPoint.x) * factor;
        this.a.y = this.midPoint.y + (this.a.y - this.midPoint.y) * factor;
    
        this.b.x = this.midPoint.x + (this.b.x - this.midPoint.x) * factor;
        this.b.y = this.midPoint.y + (this.b.y - this.midPoint.y) * factor;
    
        this.c.x = this.midPoint.x + (this.c.x - this.midPoint.x) * factor;
        this.c.y = this.midPoint.y + (this.c.y - this.midPoint.y) * factor;
    
        this.d.x = this.midPoint.x + (this.d.x - this.midPoint.x) * factor;
        this.d.y = this.midPoint.y + (this.d.y - this.midPoint.y) * factor;
    
        this.width *= factor;
        this.height *= factor;
    }

    public getArea(): number {
        return this.width * this.height;
    }

    public getPerimeter(): number {
        return 2*this.width + 2*this.height;
    }
}

class Square extends Rectangle {
    constructor(a: Point, b: Point){
        const xVector = b.x - a.x;
        const yVector = b.y - a.y;

        const c = new Point((b.x - yVector), (b.y + xVector));
        const d = new Point((a.x - yVector), (a.y + xVector));
        
        super(a, b, c, d);
    }
}

// TESTY
let a = new Point(-1,  1);
let b = new Point( 1,  1);
let c = new Point( 1, -1);
let d = new Point(-1, -1);

let rect = new Rectangle(a,b,c,d);
let area = rect.getArea();
let perimeter = rect.getPerimeter();
console.log(rect);
console.log(area);
console.log(perimeter);

rect.scale(2);

area = rect.getArea();
perimeter = rect.getPerimeter();
console.log(rect);
console.log(area);
console.log(perimeter);

rect.rotate(90);
console.log(rect);

rect.move(-2, 1);
console.log(rect);

let x = new Point(2, 2);
let y = new Point(8, 8);

let sqr = new Square(x, y);
console.log(sqr);

sqr.move(2, 0);
console.log(sqr);

