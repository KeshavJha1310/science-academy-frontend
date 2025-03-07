// src/services/communicationService.js
import { BehaviorSubject } from 'rxjs';


class CommunicationService {
  constructor() {
   
    this.addedTeacherFlagSubject = new BehaviorSubject(false);
    this.addedTeacher$ = this.addedTeacherFlagSubject.asObservable()

    this.addedExamFlagSubject = new BehaviorSubject(false);
    this.addedExam$ = this.addedExamFlagSubject.asObservable();

  }

  // Method to send data
  setAddTeacherFlag(flag) {
    if(flag){
        this.addedTeacherFlagSubject.next(flag);
        }
  }

  setAddExamFlag(flag){
    if(flag){
        this.addedExamFlagSubject.next(flag);
    }
  }



}

// Export an instance of the service
export const communicationService = new CommunicationService();
