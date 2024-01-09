public class memberpackagesprice {
     @AuraEnabled(cacheable=true)
    public static List<Member_Registration__c> getRegistration(String className) {
        return [Select Id, Name, Name__c, Packages__c, Address__c, Email__c, Contact__c, Package_Price__c, Amount_to_paid__c, Balanced__c from Member_Registration__c where Gym_Classes__r.Name=:className];
        }
    @AuraEnabled(cacheable=true)
    public static List<Gym_Classes__c> getAllClasses() {
        return[Select Id, Name, Images__c from Gym_Classes__c];
        }
} 