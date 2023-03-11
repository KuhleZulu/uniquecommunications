import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor( private storage: AngularFireStorage, private afs: AngularFirestore, private toastr: ToastrService  ) { }

  uploadImage(selectedImage: any, PostData: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload( filePath, selectedImage ).then(() => {
      console.log('Post image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(URL => {
        PostData.postImgPath = URL;
        console.log(PostData);

        this.saveData(PostData);
        
      })
    })
  }

  saveData(PostData: any) {
    this.afs.collection('posts').add(PostData).then(docRef => {
      this.toastr.success('Data uploaded successfully');
    });
  }

  loadData(){
    return this.afs.collection('posts').snapshotChanges().pipe(
        map(actions => {
          return actions.map(a=>{
  
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return{ id, data}
  
          })
        })
      )
    }


  
}
