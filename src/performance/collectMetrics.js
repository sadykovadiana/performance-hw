import { getLCP, getFCP, getTTFB, getFID } from "web-vitals";
import { Counter } from "./send";

let counter = new Counter();
const isTouchDevice = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

const browser = () => {
  var ua = navigator.userAgent,
    tem,
    M =
      ua.match(
        /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
      ) || [];
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
    return "IE " + (tem[1] || "");
  }
  if (M[1] === "Chrome") {
    tem = ua.match(/\b(OPR|Edge?)\/(\d+)/);
    if (tem != null)
      return tem
        .slice(1)
        .join(" ")
        .replace("OPR", "Opera")
        .replace("Edg ", "Edge ");
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
  return M.join(" ");
};

counter.init(
  "D8F28E50-2021-11EC-9EDF-9F93090795B1",
  String(Math.random()).substr(2, 12),
  "index"
);

counter.setAdditionalParams({
  env: "production",
  platform: isTouchDevice() ? "touch" : "desktop",
  browser: browser(),
});

getFCP((metric) => {
  counter.send("fcp", metric.delta);
});

getTTFB((metric) => {
  counter.send("ttfb", metric.delta);
});

getLCP((metric) => {
  counter.send("lcp", metric.delta);
});

getFID((metric) => {
  counter.send("fid", metric.delta);
});

export default counter;
