import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from '../models/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private httpClient: HttpClient) { }

  getAllCourses(): Observable<ICourse[]>{
    const url: string = 'https://localhost:7016/api/course/items/products';
     return this.httpClient.get<any>(url);
  }

  getCourseById(courseId: string): Observable<ICourse>{
    const url: string = 'https://localhost:7016/api/course/getbyid/' + courseId;
     return this.httpClient.get<any>(url);
  }
}
