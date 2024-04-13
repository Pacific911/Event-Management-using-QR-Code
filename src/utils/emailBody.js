const qrCodeBody = (qrCode) => `
  <body style="display: flex; flex-direction: column; align-items: center; font-family: Arial, Helvetica, sans-serif;">
    <p>Here is your QR code:</p>
    <img src="${qrCode}" alt="QR Code" style="width: 200px; height: auto;">
  </body>
`;

export default { qrCodeBody };
