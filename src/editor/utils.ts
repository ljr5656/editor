import { IPoint, IRect } from './type';

export const DOUBLE_PI = Math.PI * 2;
export const PI = Math.PI * 2;
export const HALF_PI = Math.PI / 2;

// 视口坐标->场景坐标
export const viewportCoordsToSceneUtil = (
  x: number,
  y: number,
  zoom: number,
  scrollX: number,
  scrollY: number,
  round = false, // 是否四舍五入
) => {
  let newX = scrollX + x / zoom;
  let newY = scrollY + y / zoom;
  if (round) {
    newX = Math.round(newX);
    newY = Math.round(newY);
  }
  return {
    x: newX,
    y: newY,
  };
};

// 场景坐标->视口坐标
export const sceneCoordsToViewportUtil = (
  x: number,
  y: number,
  zoom: number,
  scrollX: number,
  scrollY: number,
) => {
  return {
    x: (x - scrollX) * zoom,
    y: (y - scrollY) * zoom,
  };
};

export const getDevicePixelRatio = () => {
  return window.devicePixelRatio || 1;
};

/**标准化rect
 * 处理可能为负数的width和height
 */
export const normalizeRect = ({ x, y, width, height }: IRect) => {
  const x2 = x + width;
  const y2 = y + height;
  return getRectByTwoCoord({ x, y }, { x: x2, y: y2 });
};

export function getRectByTwoCoord(point1: IPoint, point2: IPoint): IRect {
  return {
    x: Math.min(point1.x, point2.x),
    y: Math.min(point1.y, point2.y),
    width: Math.abs(point1.x - point2.x),
    height: Math.abs(point1.y - point2.y),
  };
}

/**
 * 保留两位小数
 * 如果是 0，丢弃 0
 */
export const remainDecimal = (num: number, precision = 2) => {
  return Number(num.toFixed(precision));
};

/**
 * 找出离 value 最近的 segment 的倍数值
 */
export const getClosestTimesVal = (value: number, segment: number) => {
  const n = Math.floor(value / segment);
  const left = segment * n;
  const right = segment * (n + 1);
  return value - left <= right - value ? left : right;
};

/**
 * Canvas 中绘制，必须为 x.5 才能绘制一列单独像素，
 * 否则会因为抗锯齿，绘制两列像素，且一个为半透明，导致一种模糊的效果
 *
 * 这个方法会得到值最接近的 x.5 值。
 */
export const nearestPixelVal = (n: number) => {
  const left = Math.floor(n);
  const right = Math.ceil(n);
  return (n - left < right - n ? left : right) + 0.5;
};

export const rotateInCanvas = (
  ctx: CanvasRenderingContext2D,
  angle: number,
  cx: number,
  cy: number,
) => {
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.translate(-cx, -cy);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rafThrottle = (callback: (...args: any) => void) => {
  let requestId: number | undefined;

  const throttled = function (...args: unknown[]) {
    if (requestId === undefined) {
      requestId = requestAnimationFrame(() => {
        requestId = undefined;
        callback(args);
      });
    }
  };

  throttled.cancel = () => {
    if (requestId !== undefined) {
      cancelAnimationFrame(requestId);
    }
    requestId = undefined;
  };

  return throttled;
};
