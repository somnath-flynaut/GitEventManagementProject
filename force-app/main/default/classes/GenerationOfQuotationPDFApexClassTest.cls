@isTest
public class GenerationOfQuotationPDFApexClassTest {
    @isTest
    public static void method1(){
        Account ac = new Account();
        ac.Name='test acc';
        insert ac;
        
        Opportunity opp = new Opportunity();
        opp.Name='test opty';
        opp.CloseDate=date.today();
        opp.StageName='Qualification';
        insert opp;
       
        Quote__c qc = new Quote__c();
        qc.Email__c='test@stetig.com';
        qc.Account__c=ac.Id; 
        qc.Phone__c='+91 9876543210';
        qc.Opportunity_Name__c=opp.Id;
qc.Created_Date__c = System.today();
        insert qc;
        
        GenerationOfQuotationPDFApexClass.sendemailmethod(qc.Id);
    }
    
    
}