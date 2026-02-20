import { ZardButtonComponent } from '@/shared/components/button/button.component';
import { Component, inject, signal } from '@angular/core';
import { ZardDialogService } from '@/shared/components/dialog/dialog.service';

import { ZardIconComponent } from '@/shared/components/icon/icon.component';
import { CreateTask } from '@/shared/custom-components/task/create-task/create-task';
import { TaskBoard } from '@/shared/custom-components/task/task-board/task-board';
import { TaskTable } from '@/shared/custom-components/task/task-table/task-table';
import { ProjectService } from '@/services/project';
import { ActivatedRoute, Router } from '@angular/router';
import { Project, ProjectListResponse, ProjectResponse } from '@/types/project';

@Component({
  selector: 'app-project',
  imports: [ZardButtonComponent, ZardIconComponent, TaskTable, TaskBoard],
  templateUrl: './project.html',
})
export class ProjectComponent {
  constructor(
    private dialogService: ZardDialogService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}
  projectName: string = '';
  activeView = signal<'board' | 'table'>('board');

  ngOnInit() {
    const projectId = this.route.snapshot.paramMap.get('projectId');

    console.log('Project ID:', projectId);

    if (!projectId) {
      console.log('No projectId found in route');
      return;
    }

    if (projectId) {
      this.projectService.getProjectById(projectId).subscribe({
        next: (res: any) => {
          console.log('API response:', res);
          this.projectName = res.name;
          console.log('Project Name Set To:', this.projectName);
        },
        error: (err) => {
          console.error('Failed to load project', err);
        },
      });
    }
  }

  openTask() {
    this.dialogService.create({
      zTitle: 'Create Task',
      zDescription: 'Create your own task',
      zContent: CreateTask,
      zWidth: '425px',
      zOkText: null,
      zCancelText: null,
      zClosable: true,
    });
  }
}
