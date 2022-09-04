function openPrevPage() {
    open("index.html", "_self");
}

function checkBookId(id)
{
    if(id.length!=5)
        return true;
    for(let i=0;i<id.length;i++)
    {
        if(id[i]<'0'&&id[i]>'9')
            return true;
    }
    return false;
}

document.getElementById('back-btn').onclick = openPrevPage;
function addBook() {
    const input = document.querySelector('input[type="file"]');
    const reader = new FileReader();
    if(input.files[0]!=null||input.files[0]!=undefined)
    {
        reader.readAsDataURL(input.files[0]);
    }
    else
    {
        alert('insert image');
    }
    reader.onload = function () {
        let bookImage = reader.result;
        let bookTitle = document.getElementById('addbook-title').value.toLowerCase();
        let bookId = document.getElementById('addbook-id').value;
        let bookPrice = document.getElementById('addbook-price').value;
        let arr = JSON.parse(localStorage.getItem('books'));
        
        let flag = 0;
        
        if (arr === undefined || arr === null) {
            arr = [];
        }
        if (bookPrice == "" || bookTitle == "" || bookId == "") {
            alert('Input Missing');
        }
        else if(checkBookId(bookId))
        {
            alert('id should be 5 characters');
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].title == bookTitle || arr[i].price==bookPrice||arr[i].id==bookId)
                {
                    flag=1;
                    break;
                }
            }
            if(flag==0)
            {
                let bookDetails = { "image": bookImage, "title": bookTitle, "id": bookId, "price": bookPrice };
                arr.push(bookDetails);
                localStorage.setItem("books", JSON.stringify(arr));
                openPrevPage();
            }
            else
            {
                alert('already exists');
            }
        }

    }
    
}
document.getElementById('add-book-btn').onclick = addBook;
