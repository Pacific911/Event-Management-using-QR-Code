const qrCodeBody = (qrCode, user, eventName) => `
  <body>
  <div style="margin: auto ; font-family: Arial, Helvetica, sans-serif; padding: 20px;">  
  <h2 style = "color:#4285f4;">Hey ${user}</h2>
    <p style = "color: #202124;">Your registration to <b>${eventName}</b>  is confirmed</p>
    <p style = "color: #202124;">Here is your qr-code below:</p>
    </div>
    <img src="${qrCode}" alt="QR Code" style="width: 200px; height: auto;">
  </body>
`;

export default { qrCodeBody };
