const nodemailer = require('nodemailer');

// Configure with real SMTP credentials in production
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
});

async function sendOrderNotification(order, items) {
  const itemsList = items
    .map((item) => `- ${item.product_name}: ${item.quantity_tons}T @ $${item.price}/T`)
    .join('\n');

  const mailOptions = {
    from: process.env.SMTP_USER || 'noreply@kuriinvestments.com',
    to: process.env.OWNER_EMAIL || 'owner@kuriinvestments.com',
    subject: `New Order #${order.id} - Kuri Investments`,
    text: `
New Order Received!

Order #${order.id}
Customer: ${order.customer_name}
Phone: ${order.customer_phone}
Email: ${order.customer_email || 'N/A'}

Delivery Address: ${order.delivery_address || 'Pickup'}

Items:
${itemsList}

Delivery Cost: $${order.delivery_cost}
Total: $${order.total_cost}

View in admin dashboard to manage this order.
    `.trim(),
  };

  try {
    if (process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
      console.log(`Order notification email sent for order #${order.id}`);
    } else {
      console.log(`[Email Skipped] No SMTP configured. Order #${order.id} notification:`);
      console.log(`  Customer: ${order.customer_name}, Total: $${order.total_cost}`);
    }
  } catch (error) {
    console.error('Failed to send email notification:', error.message);
  }
}

module.exports = { sendOrderNotification };
