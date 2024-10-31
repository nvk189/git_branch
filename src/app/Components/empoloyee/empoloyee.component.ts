import { Component, ViewChild, ElementRef, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';

@Component({
  selector: 'app-empoloyee',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './empoloyee.component.html',
  styleUrls: ['./empoloyee.component.css'] // Sửa styleUrl thành styleUrls
})
export class EmpoloyeeComponent implements OnInit {
  employeeFrom: FormGroup = new FormGroup({}); 
 
  constructor(private fb: FormBuilder) {}

  @ViewChild("myModal") model: ElementRef | undefined;
  employeeList : Employee[] = []
  empService = inject(EmployeeService)
  ngOnInit() {
    this.setFormState(); 
    this.getEmployee();
  }

  openModal() {
    const emplModal = document.getElementById("myModal");
    if (emplModal != null) {
      emplModal.style.display = "block";
    }
  }

  closeModal() {
    this.setFormState()
    if (this.model != null) {
      this.model.nativeElement.style.display = "none";
    }
  }

  setFormState() {
    this.employeeFrom = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      status: [false, [Validators.required]],
    });
  }
  getEmployee(){
    this.empService.getAllEmployee().subscribe((res)=>{
      this.employeeList = res;
    })
  }

  formValues:any;
  onSubmit() {
    if (this.employeeFrom.invalid) {
      alert("Nhap thong tin ")
      return;
    } 
    if(this.employeeFrom.value.id == 0){
  
      this.formValues = this.employeeFrom.value
      this.empService.addEmployee(this.formValues).subscribe((res)=>{
  
        alert("Thêm thành công")
        this.getEmployee();
        this.employeeFrom.reset();
        this.closeModal();
      })
    }else{
      this.formValues = this.employeeFrom.value
      this.empService.updateEmployee(this.formValues).subscribe((res)=>{
  
        alert("Cập nhật  thành công")
        this.getEmployee();
        this.employeeFrom.reset();
        this.closeModal();
      })
    }
  }

  OnEdit(emp: Employee){
     this.openModal();
     this.employeeFrom.patchValue(emp)

  }
  onDelete(emp: Employee){
    //  them check yes no
    const Confirm = confirm("Delete employee ok ?" + emp.name)
    if (Confirm){

      this.empService.deleteEmployee(emp.id).subscribe((res)=>{
        alert("Xoa thanh cong");
        this.getEmployee();
      })
    }

  }

  
}
