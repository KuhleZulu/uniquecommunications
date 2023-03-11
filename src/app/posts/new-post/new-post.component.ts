import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  permalink: string = '';
  imgSrc: any = './assets/Placeholder-image.png';
  selectedImg: any;
  categories: any = [];
  postForm!: FormGroup;

  constructor( private categoryService: CategoriesService, private fb: FormBuilder, private postService: PostsService ) { 
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      permalink: ['', Validators.required],
      exerpt: ['', [Validators.required, Validators.minLength(50)]],
      category: ['', Validators.required],
      postImg: ['' , Validators.required],
      content: ['', Validators.required]
    })
   } 

  ngOnInit() { 
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc(){
    return this.postForm.controls;
  }

  onTitleChanged($event: any){
    const title = $event.target.value;
    // code to close space in the permalink
    this.permalink = title.replace(/\s/g, '-');
  }

  showPreview($event: any){
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imgSrc = e.target.result;
  }
  reader.readAsDataURL($event.target.files[0]);
  this.selectedImg = $event.target.files[0];
}

onSubmit(){
  
  const c = this.categories.find((x: any) => x.id === this.postForm.value.category);
  console.log(c);
  

  const PostData: Post = {
    title: this.postForm.value.title,
    permalink: this.postForm.value.permalink,
    category: {category:c.data.category.userInputCategory,categoryId: c.id},
    postImgPath: '',
    excerpt: this.postForm.value.exerpt,
    content: this.postForm.value.content,
    isFeatured: false,
    views: 0,
    status: 'new',
    createdAt: new Date()
  }

  this.postService.uploadImage(this.selectedImg, PostData);
  this.postForm.reset();
  this.imgSrc = './assets/Placeholder-image.png';
  
}





}
