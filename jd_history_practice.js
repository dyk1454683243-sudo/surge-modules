/**
 * 京东历史价格练习版脚本
 * 用途：
 * 1. 练习 Surge 模块“拦截接口响应并改写 JSON”的基本结构
 * 2. 先不接真实历史价格接口，只插入测试字段，验证是否命中
 *
 * 说明：
 * - 这份脚本不保证会直接显示在京东商品名下方
 * - 它的主要作用是帮助你理解“旧历史价模块”的骨架
 * - 后续如果抓到当前京东商品页真实的 functionId 和字段结构，再继续改
 */

function safeDone(body) {
  $done({ body });
}

try {
  const raw = $response.body || "";
  const obj = JSON.parse(raw);

  // 调试标记：确认脚本是否命中
  obj.__history_price_test__ = "历史价练习模块已命中";

  // 尝试塞入一个测试字段
  if (obj && typeof obj === "object") {
    if (!obj.serviceInfo || typeof obj.serviceInfo !== "object") {
      obj.serviceInfo = {};
    }
    obj.serviceInfo.historyPriceTest = "历史最低价：¥1999（练习数据）";
    obj.serviceInfo.historyPriceNote = "这是教学版脚本，用于测试接口改写是否生效";
  }

  safeDone(JSON.stringify(obj));
} catch (e) {
  // 如果不是 JSON 或解析失败，则原样返回
  safeDone($response.body);
}