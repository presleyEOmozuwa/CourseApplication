import { Component, OnInit } from '@angular/core';
import { ICourse } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/productServices/course.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  p: number = 1;
  courses: Observable<ICourse[]> = null;
   
   constructor(private courseService: CourseService) { }
  ngOnInit(): void {
    this.getCourseList();
  }
  
  getCourseList(){
    this.courses = this.courseService.getAllCourses();
  }
}
