import { fabric } from 'fabric-browseronly'

var deg2rad = Math.PI / 180;
var rad2deg = 180 / Math.PI;

/* convert angle to rectangle perimeter coordinates */
function angle2rect(angle, sx, sy) {
    while (angle < 0) angle += 360; angle %= 360;

    var a = sy, b = a + sx, c = b + sy, // 3 first corners
        p = (sx + sy) * 2, // perimeter
        rp = p * 0.00277, // ratio between perimeter & 360
        pp = Math.round(((angle * rp) + (sy >> 1)) % p); // angle position on perimeter

    if (pp <= a) return { x: 0, y: sy - pp };
    if (pp <= b) return { y: 0, x: pp - a };
    if (pp <= c) return { x: sx, y: pp - b };
    return { y: sy, x: sx - (pp - c) };
}

/* convert angle to circle perimeter coordinates */
function angle2circle(angle, radius) {
    var a = (angle + 180) * deg2rad;
    return {
        x: Math.round((Math.cos(a) + 1) * radius),
        y: Math.round((Math.sin(a) + 1) * radius)
    };
}

/* convert perimeter coordinate to angle */
export function xy2angle(x, y, sx, sy) {
    x -= sx >> 1, y -= sy >> 1;
    var a = Math.round(Math.atan(Math.abs(x) / Math.abs(y)) * rad2deg);
    if (x >= 0 && y <= 0) return a + 90;
    if (x >= 0 && y >= 0) return 270 - a;
    if (x <= 0 && y >= 0) return a + 270;
    return 90 - a;
}

/* apply linear gradient from a degree angle */
export function setGradient(obj, angle, colors) {
    if (angle - 90 < 0) {
        angle = 360 - Math.abs(angle - 90);
    } else
        angle -= 90;

    var odx = obj.width * obj.scaleX >> 1, /* object center */
        // ody = obj.height * obj.scaleY >> 1,
        gradient;

    if (obj instanceof fabric.Circle)
        gradient = {
            start: angle2circle(angle, odx)
            //,end   : angle2circle(angle+180, odx)
        };
    else
        gradient = {
            start: angle2rect(angle, obj.width * obj.scaleX, obj.height * obj.scaleX)
            //,end   : angle2rect(angle+180, obj.width,obj.height)
        };

    /* simple simetrie between start & end */
    gradient.end = {
        x: obj.width - gradient.start.x,
        y: obj.height - gradient.start.y
    }

    obj.setGradient('fill', {
        x1: gradient.start.x,
        y1: gradient.start.y,
        x2: gradient.end.x,
        y2: gradient.end.y,
        colorStops: colors
    });

    return gradient; // for debug re-use
}
