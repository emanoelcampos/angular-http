import { UploadFileService } from './../upload-file.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>;

  constructor(private uploadService: UploadFileService) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    console.log(event);

    const selectedFiles = <FileList>event.target.files;

    //document.getElementById('formFile')!.innerHTML = selectedFiles[0].name;

    const fileNames = [];
    this.files = new Set();
    for (let i=0; i<selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name);
      this.files.add(selectedFiles[i]);
    }
    document.getElementById('formFile')!.innerHTML = fileNames.join(', ');
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.uploadService.upload(this.files, 'http://localhost:8000/upload')
      .subscribe(response => console.log('upload concluído'));
    }
  }

}
