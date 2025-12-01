(function (window) {
  const MOBILE_BREAKPOINT = 768;
  const DEVICE_CLASS_MOBILE = "is-mobile";
  const DEVICE_CLASS_DESKTOP = "is-desktop";

  function isLikelyMobile() {
    const ua = (window.navigator && window.navigator.userAgent) || "";
    const isTouch =
      "ontouchstart" in window ||
      (window.navigator && window.navigator.maxTouchPoints > 0) ||
      (window.navigator && window.navigator.msMaxTouchPoints > 0);
    const isSmallViewport = window.innerWidth <= MOBILE_BREAKPOINT;
    const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
    return Boolean(isSmallViewport || (isTouch && isMobileUA) || isMobileUA);
  }

  function applyDeviceClass(isMobile) {
    const body = document.body;
    if (!body) return;
    body.classList.toggle(DEVICE_CLASS_MOBILE, isMobile);
    body.classList.toggle(DEVICE_CLASS_DESKTOP, !isMobile);
    body.dataset.deviceType = isMobile ? "mobile" : "desktop";
  }

  function detectAndApply() {
    const mobile = isLikelyMobile();
    applyDeviceClass(mobile);
    return mobile ? "mobile" : "desktop";
  }

  function initResponsiveWatcher() {
    let rafId = null;
    const onResize = () => {
      if (rafId) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        detectAndApply();
      });
    };
    window.addEventListener("resize", onResize);
    detectAndApply();
  }

  const DeviceContext = {
    detect: detectAndApply,
    isMobile: () => document.body?.classList.contains(DEVICE_CLASS_MOBILE)
  };

  window.DeviceContext = DeviceContext;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initResponsiveWatcher, { once: true });
  } else {
    initResponsiveWatcher();
  }
})(window);
