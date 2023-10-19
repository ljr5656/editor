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
