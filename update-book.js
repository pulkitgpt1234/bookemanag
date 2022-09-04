function onBackPressed()
{
    open("index.html","_self");
}
document.getElementById('back-btn').onclick=onBackPressed;
let arr=JSON.parse(localStorage.getItem('books'));
let bookIdx=localStorage.getItem('to_update');
function loadBookDetails()
{
    if(arr!=null && bookIdx!=null)
    {
        document.getElementById('updatebook-title').value=arr[bookIdx].title;
        document.getElementById('updatebook-price').value=arr[bookIdx].price;
    }
}
window.onload=loadBookDetails;
function onUpdateClicked()
{
    const input=document.querySelector('input[type="file"]');
    const reader =new FileReader();
    reader.readAsDataURL(input.files[0]?input.files[0]:null);
    reader.onload=function (){
    let updatedImage=reader.result;
    let updatedTitle=document.getElementById('updatebook-title').value.toLowerCase();
    let updatedPrice=document.getElementById('updatebook-price').value;
    if(updatedPrice!=""&&updatedTitle!="")
    {
        arr[bookIdx].title=updatedTitle;
        arr[bookIdx].price=updatedPrice;
        if(updatedImage)
            arr[bookIdx].image=updatedImage;
        localStorage.setItem("books",JSON.stringify(arr));
        localStorage.removeItem("to_update");
        open("bookemanag.html","_self");
    }
    else
    {
        alert('enter details please');
    }
    }
}
document.getElementById('update-book-btn').onclick=onUpdateClicked;