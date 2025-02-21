public class EventTeamMemberHelper {
  // Method to populate Event Details in Event Team Member
    public static void populateEventDetails(List<Event_Team_Member__c> teamMembers) {
        Set<Id> eventDetailIds = new Set<Id>();

        for (Event_Team_Member__c member : teamMembers) {
            if (member.Event_Details__c != null) {
                eventDetailIds.add(member.Event_Details__c);
            }
        }

        if (!eventDetailIds.isEmpty()) {
            Map<Id, Event_Details__c> eventDetails = new Map<Id, Event_Details__c>(
                [SELECT Id, Event_Date_Time__c, End_Date_Time__c 
                 FROM Event_Details__c 
                 WHERE Id IN :eventDetailIds]
            );

            for (Event_Team_Member__c member : teamMembers) {
                if (member.Event_Details__c != null && eventDetails.containsKey(member.Event_Details__c)) {
                    Event_Details__c detail = eventDetails.get(member.Event_Details__c);
                    member.Event_Start_Date__c = detail.Event_Date_Time__c;
                    member.Event_End_Date__c = detail.End_Date_Time__c;
                }
            }
        }
    }

    // Method to send notification emails
    public static void sendNotificationEmails(List<Event_Team_Member__c> teamMembers, Map<Id, Event_Team_Member__c> oldMap) {
        Set<Id> eventDetailIds = new Set<Id>();

        for (Event_Team_Member__c member : teamMembers) {
            if (member.Event_Details__c != null && 
                (oldMap == null || oldMap.get(member.Id).Event_Details__c != member.Event_Details__c)) {
                eventDetailIds.add(member.Event_Details__c);
            }
        }

        if (!eventDetailIds.isEmpty()) {
            Map<Id, Event_Details__c> eventDetails = new Map<Id, Event_Details__c>(
                [SELECT Id, Name, Event_Date_Time__c, End_Date_Time__c, Venues__c, 
                        Events_Managers__r.Name, Events_Managers__r.Phone_Number__c, Events_Managers__r.Email__c 
                 FROM Event_Details__c 
                 WHERE Id IN :eventDetailIds]
            );

            List<Messaging.SingleEmailMessage> emails = new List<Messaging.SingleEmailMessage>();

            for (Event_Team_Member__c member : teamMembers) {
                if (member.Event_Details__c != null && eventDetails.containsKey(member.Event_Details__c)) {
                    Event_Details__c detail = eventDetails.get(member.Event_Details__c);
                    if (detail.Events_Managers__c != null) {
                        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
                        email.setToAddresses(new String[] {member.Email__c}); // Replace with actual field for team member email
                        email.setSubject('Event Notification: ' + detail.Name);
                        email.setPlainTextBody(
                            'Hello,\n\n' +
                            'You have been associated with the following event:\n\n' +
                            'Event Name: ' + detail.Name + '\n' +
                            'Start Date: ' + detail.Event_Date_Time__c + '\n' +
                            'End Date: ' + detail.End_Date_Time__c + '\n' +
                            'Venue: ' + detail.Venues__c + '\n\n' +
                            'Event Manager Details:\n' +
                            'Name: ' + detail.Events_Managers__r.Name + '\n' +
                            'Phone: ' + detail.Events_Managers__r.Phone_Number__c + '\n' +
                            'Email: ' + detail.Events_Managers__r.Email__c + '\n\n' +
                            'Thank you.'
                        );
                        emails.add(email);
                    }
                }
            }

            if (!emails.isEmpty()) {
                Messaging.sendEmail(emails);
            }
        }
    }
}