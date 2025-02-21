public class EventTeamMemberTrgHandler {
    
   public static void handleBeforeUpdate(List<Event_Team_Member__c> newRecords, Map<Id, Event_Team_Member__c> oldRecords) {
        List<Event_Team_Member__c> newTeamMembers = new List<Event_Team_Member__c>();

        for (Event_Team_Member__c tm : newRecords) {
            Event_Team_Member__c oldRecord = oldRecords.get(tm.Id);

            // Check if the Event_Details__c field has been updated
            if (tm.Event_Details__c != oldRecord.Event_Details__c) {
                // Create a new Team_Member__c record
                Event_Team_Member__c newTeamMember = new Event_Team_Member__c();
                newTeamMember.Name = tm.Name; // Copy Name from the updated record
                newTeamMember.Event_Details__c = tm.Event_Details__c; // Copy Event_Details__c from the updated record
                newTeamMember.Contact_Information__c = tm.Contact_Information__c; // Copy Contact Info from the updated record
                newTeamMember.Events_Managers__c = tm.Events_Managers__c; // Copy Manager from the updated record
                newTeamMember.Event_Start_Date__c = tm.Event_Start_Date__c;//optional start date
                // Add any other fields to initialize the new record if needed

                // Reset the Event_Details__c field to its old value
                tm.Event_Details__c = oldRecord.Event_Details__c;
                newTeamMembers.add(newTeamMember);
            }
        }

        if (!newTeamMembers.isEmpty()) {
            try {
                insert newTeamMembers;
            } catch (DmlException e) {
                System.debug('Error creating new Team Member records: ' + e.getMessage());
            }
        }
    }
}