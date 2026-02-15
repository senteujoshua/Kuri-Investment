import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const ORANGE = [245, 166, 35];
const DARK = [26, 26, 26];
const WHITE = [255, 255, 255];
const GRAY = [156, 163, 175];
const DARK_BG = [30, 30, 30];
const DARK_ROW = [40, 40, 40];

function formatMonth(monthStr) {
  const [year, month] = monthStr.split('-');
  const date = new Date(year, parseInt(month) - 1);
  return date.toLocaleString('default', { month: 'long', year: 'numeric' });
}

function addHeader(doc, monthStr) {
  // Dark header background
  doc.setFillColor(...DARK);
  doc.rect(0, 0, 210, 45, 'F');

  // Orange accent bar
  doc.setFillColor(...ORANGE);
  doc.rect(0, 45, 210, 2, 'F');

  // Company name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(...ORANGE);
  doc.text('KURI', 20, 25);

  doc.setTextColor(...WHITE);
  doc.text(' INVESTMENTS', 55, 25);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(...GRAY);
  doc.text('Quarry & Construction Materials', 20, 35);

  // Report title on the right
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...WHITE);
  doc.text('Monthly Report', 190, 22, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...ORANGE);
  doc.text(formatMonth(monthStr), 190, 32, { align: 'right' });
}

function addFooter(doc) {
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(...GRAY);
    doc.text(
      `Generated on ${new Date().toLocaleDateString()} | Kuri Investments | Page ${i} of ${pageCount}`,
      105,
      290,
      { align: 'center' }
    );
    // Bottom accent
    doc.setFillColor(...ORANGE);
    doc.rect(0, 293, 210, 1, 'F');
  }
}

function addSectionTitle(doc, y, title) {
  doc.setFillColor(...ORANGE);
  doc.rect(20, y, 3, 10, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(...DARK);
  doc.text(title, 27, y + 8);
  return y + 18;
}

export function generateMonthlyReport(data) {
  const doc = new jsPDF();
  const { month, revenue, previousMonth, ordersByStatus, topProducts, customers, orders } = data;

  // Header
  addHeader(doc, month);

  let y = 57;

  // ========== REVENUE SUMMARY ==========
  y = addSectionTitle(doc, y, 'Revenue Summary');

  // Stat boxes
  const stats = [
    { label: 'Total Revenue', value: `KES ${revenue.totalRevenue.toLocaleString()}` },
    { label: 'Total Orders', value: String(revenue.totalOrders) },
    { label: 'Avg Order Value', value: `KES ${revenue.avgOrderValue.toLocaleString()}` },
  ];

  const boxWidth = 53;
  stats.forEach((stat, i) => {
    const x = 20 + i * (boxWidth + 7);
    doc.setFillColor(245, 245, 245);
    doc.roundedRect(x, y, boxWidth, 28, 3, 3, 'F');

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(stat.label, x + boxWidth / 2, y + 10, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(...DARK);
    doc.text(stat.value, x + boxWidth / 2, y + 23, { align: 'center' });
  });

  y += 35;

  // Month comparison
  if (previousMonth.totalOrders > 0) {
    const revChange = revenue.totalRevenue - previousMonth.totalRevenue;
    const revPct = previousMonth.totalRevenue > 0
      ? ((revChange / previousMonth.totalRevenue) * 100).toFixed(1)
      : 'N/A';

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...GRAY);
    doc.text(
      `vs ${formatMonth(previousMonth.month)}: KES ${previousMonth.totalRevenue.toLocaleString()} revenue, ${previousMonth.totalOrders} orders (${revChange >= 0 ? '+' : ''}${typeof revPct === 'string' ? revPct : revPct + '%'})`,
      20,
      y
    );
    y += 12;
  }

  // ========== ORDERS BY STATUS ==========
  y = addSectionTitle(doc, y, 'Orders by Status');

  if (ordersByStatus.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [['Status', 'Count']],
      body: ordersByStatus.map((s) => [s.status.charAt(0).toUpperCase() + s.status.slice(1), s.count]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      theme: 'grid',
    });
    y = doc.lastAutoTable.finalY + 12;
  } else {
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text('No orders this month.', 20, y);
    y += 12;
  }

  // ========== TOP PRODUCTS ==========
  if (y > 230) { doc.addPage(); y = 20; }
  y = addSectionTitle(doc, y, 'Top Products Sold');

  if (topProducts.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [['Product', 'Category', 'Tons Sold', 'Revenue']],
      body: topProducts.map((p) => [
        p.name,
        p.category,
        p.tons_sold.toFixed(1),
        `KES ${p.revenue.toLocaleString()}`,
      ]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      theme: 'grid',
    });
    y = doc.lastAutoTable.finalY + 12;
  } else {
    doc.setFontSize(10);
    doc.setTextColor(...GRAY);
    doc.text('No products sold this month.', 20, y);
    y += 12;
  }

  // ========== CUSTOMER STATS ==========
  if (y > 230) { doc.addPage(); y = 20; }
  y = addSectionTitle(doc, y, 'Customer Statistics');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...DARK);
  doc.text(`Total Customers: ${customers.total}`, 20, y + 2);
  y += 12;

  if (customers.topCustomers.length > 0) {
    autoTable(doc, {
      startY: y,
      head: [['Customer', 'Phone', 'Orders', 'Total Spent']],
      body: customers.topCustomers.map((c) => [
        c.name,
        c.phone,
        c.orders,
        `KES ${c.total_spent.toLocaleString()}`,
      ]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 10, cellPadding: 5 },
      headStyles: { fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      theme: 'grid',
    });
    y = doc.lastAutoTable.finalY + 12;
  }

  // ========== ORDER LIST ==========
  if (orders.length > 0) {
    if (y > 200) { doc.addPage(); y = 20; }
    y = addSectionTitle(doc, y, 'All Orders');

    autoTable(doc, {
      startY: y,
      head: [['#', 'Customer', 'Phone', 'Total', 'Status', 'Date']],
      body: orders.map((o) => [
        o.id,
        o.customer_name,
        o.customer_phone,
        `KES ${o.total_cost.toLocaleString()}`,
        o.status.charAt(0).toUpperCase() + o.status.slice(1),
        new Date(o.created_at).toLocaleDateString(),
      ]),
      margin: { left: 20, right: 20 },
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { fillColor: ORANGE, textColor: WHITE, fontStyle: 'bold' },
      alternateRowStyles: { fillColor: [248, 248, 248] },
      theme: 'grid',
    });
  }

  // Add footers to all pages
  addFooter(doc);

  return doc;
}

export function downloadReport(data) {
  const doc = generateMonthlyReport(data);
  doc.save(`Kuri-Investments-Report-${data.month}.pdf`);
}
