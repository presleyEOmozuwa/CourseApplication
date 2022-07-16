export interface ICartTrackers{
   addedCourseId: string;
   removedCourseId: string;
   newlyAdded: boolean;
   alreadyAdded: boolean;
   isDoneAdded: boolean;
   isDoneRemoved: boolean;
   itemCounter: number;
   message: string;
}