trigger EventTeamMemberTrigger1 on Event_Team_Member__c (before update) {
if (Trigger.isBefore && Trigger.isUpdate) {
        EventTeamMemberTrgHandler.handleBeforeUpdate(Trigger.new, Trigger.oldMap);
    }
}