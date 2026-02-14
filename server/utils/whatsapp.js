const OWNER_PHONE = process.env.OWNER_WHATSAPP || '263771234567';

function generateWhatsAppOrderLink(order, items) {
  const itemsList = items
    .map((item) => `• ${item.product_name}: ${item.quantity_tons}T @ $${item.price}/T`)
    .join('\n');

  const message = `🆕 *New Order #${order.id}*\n\n` +
    `*Customer:* ${order.customer_name}\n` +
    `*Phone:* ${order.customer_phone}\n` +
    `*Delivery:* ${order.delivery_address || 'Pickup'}\n\n` +
    `*Items:*\n${itemsList}\n\n` +
    `*Delivery Cost:* $${order.delivery_cost}\n` +
    `*Total:* $${order.total_cost}`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${OWNER_PHONE}?text=${encoded}`;
}

function getWhatsAppChatLink(prefilledMessage) {
  const message = prefilledMessage || 'Hi, I\'m interested in your quarry products.';
  return `https://wa.me/${OWNER_PHONE}?text=${encodeURIComponent(message)}`;
}

module.exports = { generateWhatsAppOrderLink, getWhatsAppChatLink };
