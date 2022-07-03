export interface ICartOperations{
   addedCourseId: string;
   removedCourseId: string;
   newlyAdded: boolean;
   alreadyAdded: boolean;
   isDoneAdded: boolean;
   isDoneRemoved: boolean;
   itemCount: number;
   message: string;

}

export interface ICartTrackers{
    result: ICartOperations
}