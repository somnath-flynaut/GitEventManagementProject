public class EventController {
    @AuraEnabled(cacheable=true)
    public static List<Event_Details__c> getPastEvents() {
        return [SELECT Id, Name, End_Date_Time__c, Event_Date_Time__c, Static_Image_URL__c, Venues__r.Name 
                FROM Event_Details__c 
                WHERE End_Date_Time__c < TODAY 
                ORDER BY End_Date_Time__c DESC LIMIT 4];
    }
    @AuraEnabled(cacheable=true)
    public static List<Event_Details__c> getUpcomingEvents() {
        return [SELECT Id, Name, Event_Date_Time__c, Static_Image_URL__c, Venues__r.Name 
                FROM Event_Details__c 
                WHERE Event_Date_Time__c > TODAY 
                ORDER BY Event_Date_Time__c DESC LIMIT 4];
    }
    @AuraEnabled(cacheable=true)
    public static List<Event_Details__c> getEventDetails(Id eventId) {
        return [SELECT Id, Name, Event_Date_Time__c, Static_Image_URL__c, Venues__r.Name, Event_Description__c 
                FROM Event_Details__c 
                WHERE Id = :eventId LIMIT 1];
    }
    @AuraEnabled(cacheable=true)
public static List<Event_Details__c> findEventsByName(String eventName) {
    String searchKey = (eventName != null && eventName.trim() != '') ? ('%' + eventName + '%') : '%';

    return [SELECT Id, Name, Event_Date_Time__c
            FROM Event_Details__c
            WHERE Name LIKE :searchKey
            AND Event_Date_Time__c <= TODAY
            ORDER BY Event_Date_Time__c DESC
            LIMIT 10];
}

     
@AuraEnabled(cacheable=true)
public static Decimal ticketprice(Id EvtId ){
    
    Event_Details__c Evt = [SELECT Event_Ticket_Price__c 
    FROM Event_Details__c WHERE Id = :EvtId LIMIT 1];
    return Evt.Event_Ticket_Price__c;
}
}