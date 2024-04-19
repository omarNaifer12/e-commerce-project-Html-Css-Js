var allCategory=new Map();
var smartPhones=[{Category:"SmartPhones",Name:"phone1",Prix:950,link:"img/product07.png"}];
var laptops=[{Category:"Laptops",Name:"laptop1",Prix:1000,link:"img/shop01.png"}];
var cameras=[{Category:"cameras",Name:"camera1",Prix:100,link:"img/shop02.png"}];
var accessories=[{Category:"accessories",Name:"accessorie1",Prix:100,link:"img/shop03.png"}];
allCategory.set('smartPhones', smartPhones);
allCategory.set('laptops', laptops);
allCategory.set('cameras',cameras);
allCategory.set('accessories',accessories);


var items=document.getElementById("allItems")

function createObjectItem(name,prix,Link,category){
    return {
        Category:category,
        Name:name,
        Prix:prix,
        link:Link
    };
}
function MakeItems(name,prix,link,category){

            var dataUser=`<div class="col-md-3 col-xs-6">
            <div class="product">
                <div class="product-img">
                    <img src="${link}" alt="">
                    <div class="product-label">
                        <span class="new">NEW</span>
                    </div>
                </div>
                <div class="product-body">
                    <p class="product-category">${category}</p>
                    <h3 class="product-name"><a href="#">${name}</a></h3>
                    <h4 class="product-price">${prix+"$ "}<del class="product-old-price">$990.00</del></h4>
                    <div class="product-rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                    </div>
                    <div class="product-btns">
                    <button class="edit">Edit</button>
                    <button class="add-to-compare"><i class="fa fa-exchange"></i><span class="tooltipp">add to compare</span></button>
                    <button class="delete">delete</button>
                    </div>
                </div>
                <div class="add-to-cart">
                    <button class="add-to-cart-btn"><i class="fa fa-shopping-cart"></i> add to cart</button>
                </div>
            </div>
        </div>`
        items.insertAdjacentHTML('beforeend', dataUser);

        }

        function fullingAllListItems(){
            items.innerHTML="";  
            allCategory.forEach(function(value,key){
                value.forEach(function(item){
                    MakeItems(item.Name,item.Prix,item.link,item.Category)
                })
            })
        }
        function fullingAllListItem(categorys){
            items.innerHTML="";  
            categorys.forEach(function(value,key){
                value.forEach(function(item){
                    MakeItems(item.Name,item.Prix,item.link,item.Category)
                })
            })
        }
    function    fullingSmartPhonesList(){
        items.innerHTML="";  
        allCategory.get("smartPhones").forEach(function(item){
                MakeItems(item.Name,item.Prix,item.link,item.Category)
            })
        }
        function    fullingLaptopsList(){
            items.innerHTML="";  
            allCategory.get("laptops").forEach(function(item){
                MakeItems(item.Name,item.Prix,item.link,item.Category)
            })
        } function    fullingCamerasList(){
            items.innerHTML="";  
            allCategory.get("cameras").forEach(function(item){
                MakeItems(item.Name,item.Prix,item.link,item.Category)
            })
        } function    fullingAccessoriesList(){
            items.innerHTML="";  
            allCategory.get("accessories").forEach(function(item){
                MakeItems(item.Name,item.Prix,item.link,item.Category)
            })
        }

var add=document.getElementById("add");
add.addEventListener("click",function(){
    fullingAllListItems()
})

 function addOneItem(name,prix,Link,category){
   var object= createObjectItem(name,prix,Link,category);
  var arr=allCategory.get(category);
   arr.push(object);
   
  return allCategory
}
function updateItem(link,prix,name){
   allCategory.forEach(function(value,key){
        value.forEach(function(item){
            if(item.link===link){
                item.Name=name;
                item.Prix=prix;
            }
        })
    })
return false;
}
function DeleteItem(link){

    allCategory.forEach(function(value,key){
       for (let i = 0; i < value.length; i++) {
        if(link===value[i].link){
            value.splice(i,1);
        }
        
       }
    })
    return allCategory;
}
function returnAllFilteringItems(name){
   var map=new Map();

    allCategory.forEach(function(value,key){
      var data=(value.filter(function(item){
            var nameItem=(item.Name).toUpperCase();
            return nameItem.indexOf(name.toUpperCase())!==-1;
        })
    )
map.set(key,data);  

}
)
return map;
}
function filterItemsByCharOrString(){
    var name=document.getElementById("filter").value;
var items=new Map();
items=returnAllFilteringItems(name);
if(allCategory.length!==0){
fullingAllListItem(items);
}
}

ainer
items.addEventListener("click", function(event) {
  
    if (event.target.classList.contains("delete")) {
       
        var currentItem = event.target.closest(".product");
        if (currentItem) {
          
            var itemImage = currentItem.querySelector(".product-img img");
            if (itemImage) {
              
                var src = itemImage.getAttribute("src");
                console.log("Image src:", src);
           
                var result = confirm("Are you sure you want to delete this item?");
                if (result) {
                  
                    DeleteItem(src);
                    currentItem.remove();
                    storeDataInLocalStorage();
                
                    fullingAllListItems();
                }
            }
        }
    }
});

items.addEventListener("click", function(event) {
    if (event.target.classList.contains("edit")) {
       
        var currentItem = event.target.closest(".product");
        if (currentItem) {
            var itemImage = currentItem.querySelector(".product-img img");
            if (itemImage) {
                
                var src = itemImage.getAttribute("src");
               localStorage.setItem("src",src);
               window.location.href="frmEdit.html";
      }
        }
    }
});
function UpdateItemWhenClickedButton() {   
    if(localStorage.length!==0)
    allCategory=retrieveDataFromLocalStorage();
   const name=document.getElementById("Name").value;
   const prix=document.getElementById("Prixs").value;
  const src=localStorage.getItem("src");
   updateItem(src,parseInt(prix),name);
   storeDataInLocalStorage();
}

function addItemWhenClickButton() {
    if(localStorage.length!==0)
    allCategory=retrieveDataFromLocalStorage();
    var name = document.getElementById("name").value;
    var prix = document.getElementById("prix").value;
    var link = document.getElementById("link").value;
    var category = document.getElementById("category").value;
  
 addOneItem(name, parseInt(prix),link,category)
    
    storeDataInLocalStorage();
   
}

function mapToArray(map) {
    return Array.from(map.entries());
  }

  function arrayToMap(array) {
    return new Map(array);
  }

  function storeDataInLocalStorage() {
   
    const dataToStore = mapToArray(allCategory);
    localStorage.setItem('allCategory', JSON.stringify(dataToStore));
    console.log(dataToStore);
  }

  function retrieveDataFromLocalStorage() {
    const storedData = JSON.parse(localStorage.getItem('allCategory'));
return   arrayToMap(storedData);
  }
  function data(){
  allCategory=retrieveDataFromLocalStorage()
  fullingAllListItems();
  }
  allCategory=retrieveDataFromLocalStorage()
  fullingAllListItems();
  function redirectToFormPage(){
   
    window.location.href="frmAdd.html"
}
