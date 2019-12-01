import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import { EmployeeService } from 'src/app/services/employee.service';
import { NgForm } from '@angular/forms';

import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-add-emp',
  templateUrl: './add-emp.component.html',
  styleUrls: ['./add-emp.component.css']
})
export class AddEmpComponent implements OnInit {

  constructor(public dialogbox: MatDialogRef<AddEmpComponent>,
    private service:EmployeeService,
    private snackBar:MatSnackBar) { }

public listItems: Array<string> = [];

    ngOnInit() {
      this.resetForm();
      this.dropdownRefresh();
        }

        dropdownRefresh(){
this.service.getDepDropDownValues().subscribe(data=>{
  console.log(data);
  data.forEach(element => {
    
    this.listItems.push(element["DepartmentName"]);
  });
})
        }
      
        resetForm(form?:NgForm){
          if(form!=null)
          form.resetForm();
      
          this.service.formData = {
            EmployeeID:0,
            EmployeeName:'',
            Department:'',
            MailID:'',
            DOJ:null
          }
        }

        onClose(){
          this.dialogbox.close();
          this.service.filter('Register click');
        }

        onSubmit(form:NgForm){
    
          this.service.addEmployee(form.value).subscribe(res=>
            {
              this.resetForm(form);
              this.snackBar.open(res.toString(), '', {
                duration:5000,
                verticalPosition:'top'
              });
            }
            )
        }

}
