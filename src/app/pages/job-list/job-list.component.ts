import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.model';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs : Job [] = [];

  constructor(private jobservice: JobService){}

  ngOnInit(): void {
    this.jobservice.getJobs().subscribe((data) => {
      this.jobs = data;
    });
  }
}
