import mjml2html from "mjml";

export const VerifyEmailTemplate = ({name, verifyEmailUrl}) => {
  const mjmlTemplate = `
<mjml>
  <mj-head>
    <mj-attributes>
      <mj-all padding="0px"></mj-all>
      <mj-text font-family="Arial, Helvetica, sans-serif" font-size="14px" color="#555555"></mj-text>
    </mj-attributes>
    <mj-style inline="inline">
      /* Remove global a color to avoid override button */
      a { text-decoration: none; }
    </mj-style>
  </mj-head>
  <mj-body background-color="#f4f4f4" width="600px">
    <mj-section background-color="#ffffff" padding="20px 0">
      <mj-column>
        <mj-text font-size="20px" color="#333333" align="center">
          Hello ${name},
        </mj-text>
        <mj-text font-size="16px" color="#555555" align="center" padding="10px 25px">
          Please verify your email to activate your account.
        </mj-text>
        <mj-button 
          href="${verifyEmailUrl}" 
          background-color="#4CAF50" 
          color="#ffffff" 
          font-family="Arial, Helvetica, sans-serif" 
          font-weight="bold" 
          font-size="16px" 
          padding="20px 25px"
          border-radius="5px"
        >
          Verify Email
        </mj-button>
        <mj-text font-size="14px" color="#777777" align="center" padding-top="20px">
          If you did not request this, please ignore this email.
        </mj-text>
      </mj-column>
    </mj-section>
    <mj-section>
      <mj-column>
        <mj-text font-size="12px" color="#999999" align="center" padding="10px 25px">
          © ${new Date().getFullYear()} Abdur World. All rights reserved.
        </mj-text>
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>
`;


  const { html, errors } = mjml2html(mjmlTemplate);
  if (errors.length) console.log("MJML Errors:", errors);

  return html;
};
