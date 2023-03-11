import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormControlName, Validators } from '@angular/forms';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';



@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryform = new FormGroup({
    userInputCategory:new FormControl('',Validators.required),
  })


  get userInputCategory(){
    return this.categoryform.get('userInputCategory');
  }

  categoryArray!: Array<any>;
  formCategory!: string;
  formStatus: string = 'Add';
  categoryId!: string;
  



  constructor( private categoryService: CategoriesService ){}

  ngOnInit() {
    this.categoryService.loadData().subscribe( val => {
      console.log(val);
      this.categoryArray = val; 
    });
  }

  onSubmit(formData: any){

    let categoryData: Category = {
      category: formData.value,
    }

    if( this.formStatus == 'Add'){
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if( this.formStatus == 'Edit'){
      this.categoryService.updateData(this.categoryId,categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }

    // let subCategoryData = {
    //   SubCategory: 'subCategory1'
    // }
    // this.afs.collection('categories').add(categoryData).then(docRef =>{
    //   console.log(docRef);

    //   // this.afs.doc(`categories/${docRef.id}`).collection('subCategories').add(subCategoryData)

    //   this.afs.collection('categories').doc(docRef.id).collection('subCategories').add(subCategoryData).then(docRef1 =>{
    //     console.log(docRef1);

    //     // this.afs.doc(`categories/${docRef.id}/subCategories/${docRef1.id}`).collection('subsubcategories').add(subCategoryData)

    //     this.afs.collection('categories').doc(docRef.id).collection('subCategories').doc(docRef1.id).collection('subsubcategories').add(subCategoryData).then(docRef2 =>{
    //       console.log("Second Level Subcategory Added Successfully");
    //     })
    //   })
    // })
    // .catch(err => { console.log(err) })
}

onEdit(userInputCategory: any, id: any){
  this.formCategory = userInputCategory;
  this.formStatus = 'Edit';
  this.categoryId = id;
}

onDelete(id: any){
  this.categoryService.deleteData(id)
  
}


}