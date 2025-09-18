import React, {useEffect, useState} from "react";

function App(){
  const [vendors, setVendors] = useState([]);
  const [selectVendor, setSelectedVendor] = useState(null);

  //fetch vendors from spring boot backend
  useEffect(() => {
    fetch("https://")
    // fetch("https://134.209.155.202/api/vendors")
    .then((res) => res.json())
    .then((data) => setVendors(data))
    .catch((err) => console.error("Error fetching vendors", err));

  }, []);


  const handleVendorsChange = (e) => {
    const vendorsId = parseInt(e.target.value, 10);
    const vendor = vendors.find((v) => v.vendorId === vendorsId);
    setSelectedVendor(vendor);

  };

  return (
    <div style={{padding: "20px", fontFamily: "Arial" }}>
      <h2>Vendor Invoices</h2>

      {/* Dropdown */}
      <label>
        Select Vendor: {" "}
        <select onChange={handleVendorsChange} defaultValue="">
          <option value="" disabled>
            -- Choose Vendor --
          </option>
          {vendors.map((v) => (
            <option key={v.vendorId} value={v.vendorId}>
              {v.vendorName}
            </option> 

          ))}
 
        </select>
      </label>

      {/* Show invoices if vendor is selected */}
      {selectVendor && (
        <div style={{ marginTop: "20px"}}>
          <h3>Invoices for {selectVendor.vendorName}</h3>
          {selectVendor.invoices && selectVendor.invoices.length > 0 ? (
            <table border="1" cellPadding="8" style={{ borderCollapse: "collapse"}}>
              <thead>
                <tr>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>GST</th>
                  <th>Taxable Value</th>
                  <th>Tds</th>
                  <th>Nature</th>
                  <th>Payment Type</th>
                  <th>Attachement</th>
                  
                </tr>
              </thead>
              <tbody>
                {selectVendor.invoices.map((invoice) => (
                  <tr key={invoice.id}>
                    <td>{invoice.invoiceNumber}</td>
                    <td>{invoice.invoiceDate}</td>
                    <td>{invoice.invoiceAmount}</td>
                    <td>{invoice.totalGst}</td>
                    <td>{invoice.taxableValue}</td>
                    <td>{invoice.tdsAmount}</td>
                    <td>{invoice.natureOfTransaction}</td>
                    <td>{invoice.paymentType}</td>
                    <td>
                      <a href={invoice.attachmentLink} target="_blank" rel="noopener noreferrer">
                        view
                      </a>
                    </td>
          
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No invoices found for this vendor.</p>
          )}
      </div>
      )}
    </div>
  );
}

export default App;