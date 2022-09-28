import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../book.model';
import { BooksService } from '../books.service';

@Component({
  selector: 'app-viewbooks',
  templateUrl: './viewbooks.component.html',
  styleUrls: ['./viewbooks.component.css'],
})
export class ViewbooksComponent implements OnInit {
  bookForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;

  books: Book[];

  constructor(
    private fb: FormBuilder,
    private bookservice: BooksService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getBooks();
    this.bookForm = this.fb.group({
      _id: '',
      bname: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]+[. ]?[A-Za-z .]*')],
      ],
      bauthor: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z]+[. ]?[A-Za-z .]*')],
      ],
      bdate: ['', [Validators.required]],
      bcategory: ['', [Validators.required]],
    });
  }

  getBooks() {
    this.bookservice.getBookList().subscribe((res: Book[]) => {
      console.log(res);
      this.books = res;
    });
  }

  onEditBook(bk: Book) {
    this.editMode = true;
    this.showModal = true;
    this.bookForm.patchValue(bk);
  }

  onbookSubmit() {
    if (this.bookForm.valid) {
      if (this.editMode) {
        this.bookservice.updateBook(this.bookForm.value).subscribe(
          (res) => {
            this.getBooks();
            this.onCloseModal();
            alert('Book Details successfully updated!!!');
            this.bookForm.reset();
            this.editMode = false;
          },
          (err) => {
            console.log(err);
          }
        );
      } else {
        this.bookservice.addBook(this.bookForm.value).subscribe(
          (res) => {
            this.getBooks();
            this.onCloseModal();
            alert('Book Details successfully added!!!');
            this.bookForm.reset();
          },
          (err) => {
            console.log(err);
          }
        );
      }
    } else {
      alert('Please check the Format of each field ');
    }
  }

  onAddBook() {
    this.bookForm.reset();
    this.showModal = true;
  }

  OnExit() {
    this.router.navigate(['/home']);
  }

  onCloseModal() {
    this.showModal = false;
  }

  onDeleteBook(id: any) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.bookservice.deleteBook(id).subscribe(
        (res) => {
          console.log(res);
          this.getBooks();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
