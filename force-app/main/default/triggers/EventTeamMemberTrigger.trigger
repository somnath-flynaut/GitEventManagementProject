trigger EventTeamMemberTrigger on Event_Team_Member__c (before insert, before update, after insert, after update) {
    
   
if (Trigger.isBefore) {
        if (Trigger.isInsert || Trigger.isUpdate) {
            EventTeamMemberHelper.populateEventDetails(Trigger.new);
        }
    }

    if (Trigger.isAfter) {
        if (Trigger.isInsert || Trigger.isUpdate) {
            EventTeamMemberHelper.sendNotificationEmails(Trigger.new, Trigger.oldMap);
        }
    }
    
    
}