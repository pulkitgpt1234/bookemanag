function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}
  
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }
  function openAddBook()
  {
      open("add-book.html","_self");
  }
  function openUpdateBook()
  {
      let bookId=document.getElementById('search-id').value;
      let i,flag=0;
      for(i=0;i<arr.length;i++)
      {
        if(arr[i].id==bookId)
        {
          localStorage.setItem('to_update',i);
          open("update-book.html","_self");
          flag=1;
          break;
        }
      }
      if(flag==0)
      {
        alert('id not found');
      }
      
  }
  document.getElementById('dropdown-btn').onclick=myFunction;
  document.getElementById('add').onclick=openAddBook;
  document.getElementById('update').onclick=openUpdateBook;

  let arr = JSON.parse(localStorage.getItem('books'));


  function fetchTable()
  {
      if(arr!=null)
      {
            for(let i=1;i<=arr.length;i++)
            {
                let table=document.getElementById('book-table');
                let row=table.insertRow(i);
                var cell1=row.insertCell(0);
                var cell2=row.insertCell(1);
                var cell3=row.insertCell(2);
                var cell4=row.insertCell(3);
                var cell5=row.insertCell(4);
                cell1.innerHTML=i;  
                cell2.innerHTML="<img src='"+arr[i-1].image+"' alt='book image'>";
                cell3.innerHTML=arr[i-1].title;
                cell4.innerHTML=arr[i-1].id;
                cell5.innerHTML=arr[i-1].price;
            }
      }
  }
  window.onload=fetchTable;
  function searchBook()
  {
    let key=document.getElementById('search-ip').value;
    let indicesList=[];
    for(let i=0;i<arr.length;i++)
    {
        if(arr[i].title.includes(key))
        {
            let index=i;
            indicesList.push(index);
        }
    }
    if(indicesList.length>0)
    {

        clearTable();
        for(let i=0;i<indicesList.length;i++)
        {
          let table=document.getElementById('book-table');
          let row=table.insertRow(1);
          var cell1=row.insertCell(0);
          var cell2=row.insertCell(1);
          var cell3=row.insertCell(2);
          var cell4=row.insertCell(3);
          var cell5=row.insertCell(4);
          cell1.innerHTML=i+1;
          cell2.innerHTML="<img src='"+arr[indicesList[i]].image+"' alt='book image'>";
          cell3.innerHTML=arr[indicesList[i]].title;
          cell4.innerHTML=arr[indicesList[i]].id;
          cell5.innerHTML=arr[indicesList[i]].price;
        }
    }
    else
    {
      alert("book not found");
    }
  }
  document.getElementById('search-btn').onclick=searchBook;
  
  function clearTable()
  {
      let table=document.getElementById('book-table');
      for(let i=0;i<arr.length;i++)
      {
        table.deleteRow(1);
      }
  }
  function priceSort()
  {
      arr.sort((a,b)=>(parseInt(a.price)>parseInt(b.price)? 1:-1));
      clearTable();
      fetchTable();
  }
  function titleSort()
  {
      arr.sort((a,b)=>(a.title>b.title?1:-1));
      clearTable();
      fetchTable();
  }
  document.getElementById('price-sort').onclick=priceSort;
  document.getElementById('title-sort').onclick=titleSort;