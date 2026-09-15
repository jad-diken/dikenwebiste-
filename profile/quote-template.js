// Builds Diken-Price-Offer-Template.docx: an editable Word quotation in the Diken brand.
// Run: node quote-template.js
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  ImageRun, ShadingType, BorderStyle, Header, Footer, PageNumber, VerticalAlign, TableLayoutType,
} = require("docx");

const RED = "D4141D", INK = "0B0B0C", MUTED = "6B6E73", LINE = "E3E5E8", WHITE = "FFFFFF", PALE = "FAFAFA";
const FONT = "Arial";
const logo = fs.readFileSync(path.join(__dirname, "..", "assets", "brand", "diken-d-crop.png"));
const motul = fs.readFileSync(path.join(__dirname, "..", "assets", "logos", "motul-1k.png"));
const PAGE_W = 11906, MARGIN = 907, CONTENT = PAGE_W - 2 * MARGIN; // A4 in DXA, 16 mm margins

const noBorder = { style: BorderStyle.NONE, size: 0, color: WHITE };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder, insideHorizontal: noBorder, insideVertical: noBorder };
const hair = { style: BorderStyle.SINGLE, size: 4, color: LINE };

const t = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size || 20, bold: !!o.bold, color: o.color || "111214", ...o });
const p = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { before: o.before || 0, after: o.after || 0, line: o.line || 276 }, alignment: o.align || AlignmentType.LEFT, ...(o.border ? { border: o.border } : {}) });
const label = (s) => p(t(s.toUpperCase(), { size: 15, color: MUTED, bold: true, characterSpacing: 40 }), { after: 60 });
const cell = (children, w, o = {}) => new TableCell({ children, width: { size: w, type: WidthType.DXA }, borders: o.borders || noBorders, shading: o.shading ? { type: ShadingType.CLEAR, fill: o.shading, color: "auto" } : undefined, margins: { top: o.pad ?? 100, bottom: o.pad ?? 100, left: o.padx ?? 120, right: o.padx ?? 120 }, verticalAlign: o.valign || VerticalAlign.TOP });
const table = (rows, widths, o = {}) => new Table({ rows, width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: widths, layout: TableLayoutType.FIXED, borders: o.borders || noBorders });

// Letterhead: black band with logo box, wordmark, tagline, and contact column
const headTable = table([
  new TableRow({ children: [
    cell([p(new ImageRun({ type: "png", data: logo, transformation: { width: 52, height: 52 } }))], 1100, { shading: WHITE, pad: 60, padx: 60, valign: VerticalAlign.CENTER }),
    cell([
      p(t("DIKEN BROS", { size: 44, bold: true, color: WHITE }), { line: 240 }),
      p(t("POWER · PERFORMANCE · PRECISION", { size: 17, bold: true, color: "ED1C26", characterSpacing: 60 }), { before: 40 }),
    ], 4300, { shading: INK, padx: 240, valign: VerticalAlign.CENTER }),
    cell([
      p(t("EXCLUSIVE AGENT FOR JORDAN", { size: 13, bold: true, color: "B8BABD", characterSpacing: 40 }), { after: 60 }),
      p(new ImageRun({ type: "png", data: motul, transformation: { width: 92, height: 25 } })),
    ], 2200, { shading: INK, padx: 120, valign: VerticalAlign.CENTER }),
    cell([
      p([t("Tel  ", { bold: true, color: WHITE, size: 18 }), t("06 416 6660", { color: WHITE, size: 18 })], { align: AlignmentType.RIGHT }),
      p([t("Email  ", { bold: true, color: WHITE, size: 18 }), t("info@dikenbros.com", { color: WHITE, size: 18 })], { align: AlignmentType.RIGHT }),
      p([t("Web  ", { bold: true, color: WHITE, size: 18 }), t("dikendelivery.com", { color: WHITE, size: 18 })], { align: AlignmentType.RIGHT }),
    ], CONTENT - 7600, { shading: RED, padx: 240, valign: VerticalAlign.CENTER }),
  ] }),
], [1100, 4300, 2200, CONTENT - 7600]);

const header = new Header({ children: [headTable, p(t(" ", { size: 6 }), { border: { bottom: { style: BorderStyle.SINGLE, size: 18, color: "ED1C26" } }, after: 200 })] });
const footer = new Footer({ children: [
  p(t(" ", { size: 6 }), { border: { top: { style: BorderStyle.SINGLE, size: 12, color: "ED1C26" } } }),
  p([t("Diken Bros Co.  ·  Wadi Saqra, Arar Street 14, Amman 11181, Jordan  ·  Tel 06 416 6660  ·  info@dikenbros.com  ·  dikendelivery.com", { size: 15, color: MUTED })], { align: AlignmentType.CENTER, before: 80 }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 }, children: [t("Page ", { size: 15, color: MUTED }), new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 15, color: MUTED }), t(" of ", { size: 15, color: MUTED }), new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 15, color: MUTED })] }),
] });

// Title + offer meta
const meta = table([
  new TableRow({ children: [
    cell([
      p(t("Price Offer", { size: 52, bold: true })),
      p(t("عرض سعر", { size: 26, bold: true, color: MUTED }), { before: 40 }),
      p(t("  [DIVISION]  ", { size: 16, bold: true, color: WHITE, shading: { type: ShadingType.CLEAR, fill: RED, color: "auto" } }), { before: 160 }),
    ], 4600),
    cell([
      label("Offer"),
      p([t("Offer no.  ", { color: MUTED }), t("DB-Q-YYYY-NNNN")]),
      p([t("Date  ", { color: MUTED }), t("DD Mon YYYY")]),
      p([t("Valid until  ", { color: MUTED }), t("DD Mon YYYY")]),
      p([t("Currency  ", { color: MUTED }), t("JOD")]),
    ], 2750),
    cell([
      label("Your reference"),
      p([t("RFQ no.  ", { color: MUTED }), t("[client reference]")]),
      p([t("Enquiry date  ", { color: MUTED }), t("DD Mon YYYY")]),
    ], CONTENT - 7350),
  ] }),
], [4600, 2750, CONTENT - 7350]);

const partyCell = (title, lines) => cell([label(title), p(t(lines[0], { size: 22, bold: true })), ...lines.slice(1).map((l) => p(t(l, { size: 18, color: "2A2C30" }), { before: 30 }))], (CONTENT - 300) / 2, { borders: { top: { style: BorderStyle.SINGLE, size: 12, color: "ED1C26" }, bottom: hair, left: hair, right: hair }, pad: 160, padx: 180 });
const parties = table([
  new TableRow({ children: [
    partyCell("Prepared for", ["[Client company]", "Attn. [Name], [Title]", "[Address]", "[email] · [phone]"]),
    cell([p(t(""))], 300),
    partyCell("Prepared by", ["[Your name]", "Diken Bros Co., [Division]", "Wadi Saqra, Arar Street 14, Amman 11181", "[email]@dikenbros.com · +962 7X XXX XXXX"]),
  ] }),
], [(CONTENT - 300) / 2, 300, (CONTENT - 300) / 2]);

const subject = p([t("Subject: ", { bold: true }), t("[One sentence on what is offered, for whom, and where it is delivered.]")], { before: 240, after: 160, line: 300 });

// Items table
const W = [500, CONTENT - 500 - 1000 - 900 - 1500 - 1600, 1000, 900, 1500, 1600];
const th = (s, w, right) => cell([p(t(s.toUpperCase(), { size: 15, bold: true, color: WHITE, characterSpacing: 30 }), { align: right ? AlignmentType.RIGHT : AlignmentType.LEFT })], w, { shading: INK, pad: 120 });
const td = (s, w, o = {}) => cell([p(t(s, { size: 18 }), { align: o.right ? AlignmentType.RIGHT : AlignmentType.LEFT }), ...(o.sub ? [p(t(o.sub, { size: 15, color: MUTED }), { before: 20 })] : [])], w, { borders: { top: noBorder, left: noBorder, right: noBorder, bottom: hair }, shading: o.shade ? PALE : undefined, pad: 110 });
const itemRow = (n, desc, sub, qty, unit, price, total, shade) => new TableRow({ children: [td(n, W[0], { shade }), td(desc, W[1], { sub, shade }), td(qty, W[2], { right: true, shade }), td(unit, W[3], { shade }), td(price, W[4], { right: true, shade }), td(total, W[5], { right: true, shade })] });
const items = table([
  new TableRow({ tableHeader: true, children: [th("#", W[0]), th("Description", W[1]), th("Qty", W[2], true), th("Unit", W[3]), th("Unit price", W[4], true), th("Total", W[5], true)] }),
  itemRow("1", "[Item description]", "[Part number, pack size, specification]", "0", "[unit]", "0.00", "0.00"),
  itemRow("2", "[Item description]", "[Detail]", "0", "[unit]", "0.00", "0.00", true),
  itemRow("3", "[Item description]", "[Detail]", "0", "[unit]", "0.00", "0.00"),
  itemRow("4", "[Delivery / installation / service line, if any]", "[Detail]", "1", "lot", "0.00", "0.00", true),
], W);

const totRow = (k, v, grand) => new TableRow({ children: [
  cell([p(t(k, { size: grand ? 22 : 18, bold: !!grand, color: grand ? WHITE : "111214" }))], 2600, { shading: grand ? INK : undefined, borders: grand ? noBorders : { top: noBorder, left: noBorder, right: noBorder, bottom: hair }, pad: 90 }),
  cell([p(t(v, { size: grand ? 22 : 18, bold: !!grand, color: grand ? WHITE : "111214" }), { align: AlignmentType.RIGHT })], 1900, { shading: grand ? INK : undefined, borders: grand ? noBorders : { top: noBorder, left: noBorder, right: noBorder, bottom: hair }, pad: 90 }),
] });
const totals = new Table({ rows: [totRow("Subtotal", "0.00"), totRow("Discount", "0.00"), totRow("Net", "0.00"), totRow("Sales tax, 16%", "0.00"), totRow("Total, JOD", "0.00", true)], width: { size: 4500, type: WidthType.DXA }, columnWidths: [2600, 1900], layout: TableLayoutType.FIXED, alignment: AlignmentType.RIGHT, borders: noBorders });

const termCell = (h, body) => cell([label(h), p(t(body, { size: 17, color: "2A2C30" }), { line: 260, after: 160 })], (CONTENT - 300) / 2, { pad: 100, padx: 0 });
const terms = table([
  new TableRow({ children: [termCell("Validity", "30 days from the date of this offer. Prices are subject to the manufacturer's price list at the time of order confirmation."), cell([p(t(""))], 300), termCell("Payment", "50% with the purchase order, 50% on delivery. Bank transfer to Diken Bros Co., account details on the invoice.")] }),
  new TableRow({ children: [termCell("Delivery", "Ex-stock items within 5 working days of order confirmation. Delivery by Diken company vehicles to the address above."), cell([p(t(""))], 300), termCell("Warranty and returns", "Genuine products with manufacturer warranty. Unopened, undamaged goods returnable within 14 days.")] }),
], [(CONTENT - 300) / 2, 300, (CONTENT - 300) / 2]);

const note = p(t("Prices in Jordanian Dinars. Sales tax at the prevailing rate. This offer is confidential and intended for the addressee. Acceptance by signature below or by purchase order referencing the offer number.", { size: 16, color: MUTED }), { before: 200, line: 260 });

const signCell = (title, rows) => cell([label(title), p(t(""), { after: 300 }), ...rows.map(([k, v]) => p([t(k + "  ", { size: 17, color: MUTED }), t(v || "______________________________", { size: 17, color: v ? "111214" : "C9CCD1" })], { before: 80 }))], (CONTENT - 300) / 2, { borders: { top: hair, bottom: noBorder, left: noBorder, right: noBorder }, pad: 120, padx: 0 });
const sign = table([new TableRow({ children: [signCell("Accepted for the client", [["Name", ""], ["Title", ""], ["Signature", ""], ["Date", ""]]), cell([p(t(""))], 300), signCell("For Diken Bros Co.", [["Name", "[Your name]"], ["Title", "[Title]"], ["Signature", ""], ["Date", ""]])] })], [(CONTENT - 300) / 2, 300, (CONTENT - 300) / 2]);

const doc = new Document({
  creator: "Diken Bros", title: "Price Offer",
  styles: { default: { document: { run: { font: FONT, size: 20 } } } },
  sections: [{
    properties: { page: { size: { width: PAGE_W, height: 16838 }, margin: { top: 2200, bottom: 1500, left: MARGIN, right: MARGIN, header: 500, footer: 500 } } },
    headers: { default: header }, footers: { default: footer },
    children: [meta, p(t(""), { after: 120 }), parties, subject, items, p(t(""), { after: 60 }), totals, p(t(""), { after: 120 }), terms, note, p(t(""), { after: 200 }), sign],
  }],
});

Packer.toBuffer(doc).then((buf) => { fs.writeFileSync(path.join(__dirname, "Diken-Price-Offer-Template.docx"), buf); console.log("written Diken-Price-Offer-Template.docx"); });
