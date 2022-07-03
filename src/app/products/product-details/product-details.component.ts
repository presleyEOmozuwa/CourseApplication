import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICourse } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/productServices/course.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  course: Observable<ICourse> = null;
  courseId: string = null;
    
  constructor(private courseService: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCourseWithId();
  }

  getCourseWithId(){
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.course = this.courseService.getCourseById(this.courseId);
  }

}
