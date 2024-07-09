import Button from "@mui/material/Button";
import html2pdf from "html2pdf.js";

export default function DownloadPdf({ order }) {
  const generateCustomTable = () => {
    const container = document.createElement("div");

    const orderTitle = document.createElement("h1");
    orderTitle.className = "order";
    orderTitle.style.margin = "5px";
    orderTitle.textContent = `Order: ${order.orderMeta.id}`;
    container.appendChild(orderTitle);

    const infoHeading = document.createElement("h3");
    infoHeading.style.margin = "5px";
    infoHeading.textContent = "Info";
    container.appendChild(infoHeading);

    const shippingAddressHeading = document.createElement("h4");
    shippingAddressHeading.style.margin = "5px";
    shippingAddressHeading.textContent = "Shipping address";
    shippingAddressHeading.style.textAlign = "left";
    container.appendChild(shippingAddressHeading);

    const shippingAddressStreetParagraph = document.createElement("p");
    shippingAddressStreetParagraph.style.margin = "5px";
    shippingAddressStreetParagraph.textContent = `${order.orderMeta.shippingAddressStreet} ${order.orderMeta.shippingAddressStreetNr}`;
    container.appendChild(shippingAddressStreetParagraph);

    const shippingAddressCityParagraph = document.createElement("p");
    shippingAddressCityParagraph.style.margin = "5px";
    shippingAddressCityParagraph.textContent = `${order.orderMeta.shippingAddressZipcode} ${order.orderMeta.shippingAddressCity}`;
    container.appendChild(shippingAddressCityParagraph);

    const shippingAddressCountryParagraph = document.createElement("p");
    shippingAddressCountryParagraph.style.margin = "5px";
    shippingAddressCountryParagraph.textContent = `${order.orderMeta.shippingAddressCountry}`;
    container.appendChild(shippingAddressCountryParagraph);

    const divider1 = document.createElement("hr");
    container.appendChild(divider1);

    const billingAddressHeading = document.createElement("h4");
    billingAddressHeading.style.margin = "5px";
    billingAddressHeading.textContent = "Billing address";
    billingAddressHeading.style.textAlign = "left";
    container.appendChild(billingAddressHeading);

    const billingAddressStreetParagraph = document.createElement("p");
    billingAddressStreetParagraph.style.margin = "5px";
    billingAddressStreetParagraph.textContent = `${order.orderMeta.billingAddressStreet} ${order.orderMeta.billingAddressStreetNr}`;
    container.appendChild(billingAddressStreetParagraph);

    const billingAddressCityParagraph = document.createElement("p");
    billingAddressCityParagraph.style.margin = "5px";
    billingAddressCityParagraph.textContent = `${order.orderMeta.billingAddressZipcode} ${order.orderMeta.billingAddressCity}`;
    container.appendChild(billingAddressCityParagraph);

    const billingAddressCountryParagraph = document.createElement("p");
    billingAddressCountryParagraph.style.margin = "5px";
    billingAddressCountryParagraph.textContent = `${order.orderMeta.billingAddressCountry}`;
    container.appendChild(billingAddressCountryParagraph);

    const divider2 = document.createElement("hr");
    container.appendChild(divider2);

    const orderDetailsHeading = document.createElement("h4");
    orderDetailsHeading.style.margin = "5px";
    orderDetailsHeading.style.textAlign = "left";
    orderDetailsHeading.textContent = "Order details";
    container.appendChild(orderDetailsHeading);

    const paymentPeriodParagraph = document.createElement("p");
    paymentPeriodParagraph.style.margin = "5px";
    paymentPeriodParagraph.textContent = `Payment period: ${order.orderMeta.paymentPeriod}`;
    container.appendChild(paymentPeriodParagraph);

    const statusParagraph = document.createElement("p");
    statusParagraph.style.margin = "5px";
    statusParagraph.textContent = `Status: ${order.orderMeta.status}`;
    container.appendChild(statusParagraph);

    const remarkParagraph = document.createElement("p");
    remarkParagraph.style.margin = "5px";
    remarkParagraph.textContent = `Remark: ${
      order.orderMeta.remark == null ? "/" : order.orderMeta.remark
    }`;
    container.appendChild(remarkParagraph);

    const totalPriceParagraph = document.createElement("p");
    totalPriceParagraph.style.margin = "5px";
    totalPriceParagraph.textContent = `Total price: ${order.orderMeta.fullPrice} €`;
    container.appendChild(totalPriceParagraph);

    const btwParagraph = document.createElement("p");
    btwParagraph.style.margin = "5px";
    btwParagraph.textContent = `BTW number: ${order.orderMeta.btw} `;
    container.appendChild(btwParagraph);

    const spatie = document.createElement("br");
    container.appendChild(spatie);

    const productsHeading = document.createElement("h3");
    productsHeading.style.margin = "5px";
    productsHeading.textContent = "Products";
    container.appendChild(productsHeading);

    order.products.forEach((item, index) => {
      const productDiv = document.createElement("div");
      productDiv.style.margin = "5px";

      const productInfoDiv = document.createElement("div");
      productInfoDiv.style.margin = "10px";
      productInfoDiv.style.display = "inline-block";
      productInfoDiv.style.verticalAlign = "top";

      const productNameParagraph = document.createElement("p");
      productNameParagraph.style.margin = "5px";
      productNameParagraph.textContent = `Product: ${item.productName}`;
      productInfoDiv.appendChild(productNameParagraph);

      const quantityParagraph = document.createElement("p");
      quantityParagraph.style.margin = "5px";
      quantityParagraph.textContent = `Quantity: ${item.quantity}`;
      productInfoDiv.appendChild(quantityParagraph);

      const priceParagraph = document.createElement("p");
      priceParagraph.style.margin = "5px";
      priceParagraph.textContent = `Price: ${item.unitPrice} €`;
      productInfoDiv.appendChild(priceParagraph);

      const supplierParagraph = document.createElement("p");
      supplierParagraph.style.margin = "5px";
      supplierParagraph.textContent = `Supplier: ${item.supplier}`;
      productInfoDiv.appendChild(supplierParagraph);

      productDiv.appendChild(productInfoDiv);

      container.appendChild(productDiv);
    });

    return container;
  };

  const generatePdf = () => {
    const element = document.createElement("div");
    element.style.margin = "5px";
    element.appendChild(generateCustomTable());

    const options = {
      filename: `${order.orderMeta.id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      pagebreak: { mode: "avoid-all" },
      html2canvas: { scale: 2 },
    };
    html2pdf().from(element).set(options).save();
  };
  const type = localStorage.getItem("type");
  return (
    <>
      {type === "client" ? (
        <div className="mr">
          <Button className="delawareButton" onClick={generatePdf} data-cy="printInvoice">
            print invoice
          </Button>
        </div>
      ) : null}
    </>
  );
}
