import { IPoint, IRect } from './type';

export const DOUBLE_PI = Math.PI * 2;

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
