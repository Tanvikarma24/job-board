import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, startWith } from 'rxjs/operators';
import { JobService } from 'src/app/services/job.service';
import { Job } from 'src/app/models/job.model';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];
  searchControl = new FormControl('');

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService.getJobs().subscribe((data) => {
      this.jobs = data;
      this.filteredJobs = data;
    });

    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        debounceTime(300),
        map((value) => value?.toLowerCase() || ''),
        map((term) =>
          this.jobs.filter((job) =>
            job.title.toLowerCase().includes(term)
          )
        )
      )
      .subscribe((results) => {
        this.filteredJobs = results;
      });
  }
}
