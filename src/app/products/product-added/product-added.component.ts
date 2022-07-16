import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { LoginService } from 'src/app/core/authServices/login.service';
import { ICourse } from 'src/app/core/models/course.interface';
import { CourseService } from 'src/app/core/productServices/course.service';

@Component({
  selector: 'app-product-added',
  templateUrl: './product-added.component.html',
  styleUrls: ['./product-added.component.css']
})
export class ProductAddedComponent implements OnInit {

  course: Observable<ICourse>;
  constructor(private loginService: LoginService, private route: ActivatedRoute, private courseService: CourseService) { }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(){
    const courseId: string = this.route.snapshot.paramMap.get('courseId');
    this.course = this.courseService.getCourseById(courseId);
  }

}
