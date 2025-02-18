public class GenerationOfQuotationPDFApexClass {
    @AuraEnabled(cacheable = true)
    public static String sendemailmethod(Id recid) {
        String message = '';
        if (String.isNotBlank(recid)) {
            List<Quote__c> quotelist = [SELECT Id, Name, Email__c,Created_Date__c,Expiration_Date__c,Quote_Number__c, Account__r.Name FROM Quote__c WHERE Id = :recid];

            if (!quotelist.isEmpty()) {
                String quoteEmail = quotelist[0].Email__c;
                if (String.isNotBlank(quoteEmail)) {
                    // Generate PDF only if not in a test context
                    Blob pdfBlob;
                    if (!Test.isRunningTest()) {
                        PageReference pageRef = Page.GenerationOfQuotationPDFOnVFpage; // Ensure this VF page exists
                        pageRef.getParameters().put('id', recid);
                        pdfBlob = pageRef.getContentAsPDF();
                    } else {
                        pdfBlob = Blob.valueOf('Mock PDF Content');
                    }

                    // Create the email attachment
                    Messaging.EmailFileAttachment attach = new Messaging.EmailFileAttachment();
                    attach.setContentType('application/pdf');
                    attach.setFileName('QuoteDetails.pdf');
                    attach.setBody(pdfBlob);

                    // Prepare email body
                    String accountName = quotelist[0].Account__r != null ? quotelist[0].Account__r.Name : 'Customer';
                  
                    String body = '<b>Dear</b> ' + accountName +','+ '<br/><br/>' +
    'I hope this message finds you well.<br/>' +
    'Please find attached the quotation for the services discussed regarding your upcoming event.<br/>' +
    'This quotation outlines the details and associated costs for your review.<br/><br/>' +
  
    '💥<b>Key Details</b>💥' +'<br/>' + 
                        
    ' <b>Quote No:</b> ' + quotelist[0].Quote_Number__c + '<br/>' + 
   '<b>Current date:</b> ' + quotelist[0].Created_Date__c.format() + '<br/>' + 

                        '<b>Expiry date:</b>'+ quotelist[0].Expiration_Date__c.format()+ '<br/>' +
                        
    '<b>Attached:</b> A detailed quote document with further information.<br/>' +
    'If you have any questions, require adjustments, or need additional information, feel free to reach out to us.<br/>' +
    'We’re here to ensure all your event needs are met seamlessly.<br/>' +
    'We look forward to the opportunity to work with you.<br/><br/>' +
    '<b>Best regards</b>,<br/>' +
    '<b>Event Management Team</b>';

                   
                   
                    // Create and send the email
                    Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                    mail.setToAddresses(new List<String>{quoteEmail});
                    mail.setSubject('Quotation for Your Event Planning Needs');
                    mail.setHtmlBody(body);
                    mail.setFileAttachments(new List<Messaging.EmailFileAttachment>{attach});
                    Messaging.sendEmail(new List<Messaging.SingleEmailMessage>{mail});
                }
            }
        }
        return message;
    }
}