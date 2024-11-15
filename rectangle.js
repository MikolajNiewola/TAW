"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
var Point = /** @class */ (function () {
    function Point(x, y) {
        if (typeof x !== 'number' || typeof y !== 'number') {
            throw new Error("Złe dane, punkt wymaga liczb!");
        }
        this.x = x;
        this.y = y;
    }
    Point.prototype.move = function (x, y) {
        this.x += x;
        this.y += y;
    };
    Point.prototype.rotate = function (angle, mp) {
        var radians = (angle * Math.PI) / 180;
        var cosinus = Math.cos(radians);
        var sinus = Math.sin(radians);
        var xrotated = mp.x + (this.x - mp.x) * cosinus - (this.y - mp.y) * sinus;
        var yrotated = mp.y + (this.x - mp.x) * sinus + (this.y - mp.y) * cosinus;
        this.x = xrotated;
        this.y = yrotated;
    };
    return Point;
}());
exports.Point = Point;
var Rectangle = /** @class */ (function () {
    function Rectangle(a, b, c, d) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.width = Math.sqrt(Math.pow((this.b.x - this.a.x), 2) + Math.pow((this.b.y - this.a.y), 2));
        this.height = Math.sqrt(Math.pow((this.c.x - this.b.x), 2) + Math.pow((this.c.y - this.b.y), 2));
        this.midPoint = new Point((this.a.x + this.b.x) / 2, (this.a.y + this.c.y) / 2);
    }
    Rectangle.prototype.move = function (x, y) {
        this.a.move(x, y);
        this.b.move(x, y);
        this.c.move(x, y);
        this.d.move(x, y);
        this.midPoint = new Point((this.a.x + this.b.x) / 2, (this.a.y + this.c.y) / 2);
    };
    Rectangle.prototype.rotate = function (angle) {
        this.a.rotate(angle, this.midPoint);
        this.b.rotate(angle, this.midPoint);
        this.c.rotate(angle, this.midPoint);
        this.d.rotate(angle, this.midPoint);
    };
    Rectangle.prototype.getArea = function () {
        return this.width * this.height;
    };
    Rectangle.prototype.getPerimeter = function () {
        return 2 * this.width + 2 * this.height;
    };
    return Rectangle;
}());
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(a, b) {
        var xVector = b.x - a.x;
        var yVector = b.y - a.y;
        var c = new Point((b.x - yVector), (b.y + xVector));
        var d = new Point((a.x - yVector), (a.y + xVector));
        return _super.call(this, a, b, c, d) || this;
    }
    return Square;
}(Rectangle));
// TESTY
var a = new Point(-1, 1);
var b = new Point(1, 1);
var c = new Point(1, -1);
var d = new Point(-1, -1);
var rect = new Rectangle(a, b, c, d);
var area = rect.getArea();
var perimeter = rect.getPerimeter();
console.log(rect);
console.log(area);
console.log(perimeter);
rect.rotate(90);
console.log(rect);
rect.move(-2, 1);
console.log(rect);
var x = new Point(2, 2);
var y = new Point(8, 8);
var sqr = new Square(x, y);
console.log(sqr);
sqr.move(2, 0);
console.log(sqr);
