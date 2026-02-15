// Facebook Pixel Helper
// Set your Pixel ID via VITE_FB_PIXEL_ID environment variable in .env file

const FB_PIXEL_ID = import.meta.env.VITE_FB_PIXEL_ID || '';

export function initPixel() {
  if (typeof window === 'undefined' || !FB_PIXEL_ID) {
    if (!FB_PIXEL_ID) {
      console.log('[FB Pixel] No Pixel ID configured. Set VITE_FB_PIXEL_ID in your .env file.');
    }
    return;
  }

  if (window.fbq) return;

  // Facebook Pixel base code
  (function (f, b, e, v, n, t, s) {
    if (f.fbq) return;
    n = f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e);
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

  window.fbq('init', FB_PIXEL_ID);
  window.fbq('track', 'PageView');

  // Add noscript fallback
  const noscript = document.createElement('noscript');
  const img = document.createElement('img');
  img.height = 1;
  img.width = 1;
  img.style.display = 'none';
  img.src = `https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`;
  noscript.appendChild(img);
  document.body.appendChild(noscript);

  console.log('[FB Pixel] Initialized with ID:', FB_PIXEL_ID);
}

export function trackPageView() {
  if (window.fbq) {
    window.fbq('track', 'PageView');
  }
}

export function trackViewContent(product) {
  if (window.fbq) {
    window.fbq('track', 'ViewContent', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price_per_ton,
      currency: 'KES',
    });
  }
}

export function trackAddToCart(product, quantity) {
  if (window.fbq) {
    window.fbq('track', 'AddToCart', {
      content_name: product.name,
      content_ids: [product.id],
      content_type: 'product',
      value: product.price_per_ton * quantity,
      currency: 'KES',
    });
  }
}

export function trackInitiateCheckout(items, total) {
  if (window.fbq) {
    window.fbq('track', 'InitiateCheckout', {
      content_ids: items.map((i) => i.product_id),
      num_items: items.length,
      value: total,
      currency: 'KES',
    });
  }
}

export function trackPurchase(orderId, total) {
  if (window.fbq) {
    window.fbq('track', 'Purchase', {
      value: total,
      currency: 'KES',
      content_type: 'product',
    });
  }
}
