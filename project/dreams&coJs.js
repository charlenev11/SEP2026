function getCart(){
var saved=localStorage.getItem("cart");
if(saved==null){
return[];
}
return JSON.parse(saved);
}

function saveCart(cart){
localStorage.setItem("cart",JSON.stringify(cart));
}

function addToCart(button){
var id=button.getAttribute("data-id");
var name=button.getAttribute("data-name");
var price=Number(button.getAttribute("data-price"));
var qty=Number(document.getElementById("qty-"+id).value);

if (isNaN(qty) || qty<1){
alert("Please enter a quantity of 1 or more.");
return;
}

var cart=getCart();
var found=false;

for (var i=0; i<cart.length; i++){
if (cart[i].id==id){
cart[i].qty=cart[i].qty+qty;
found=true;
}
}

if(found==false){
cart.push({id:id, name:name, price:price, qty:qty });
}

saveCart(cart);
alert(name+" was added to your cart.");
}

function changeQty(index, value){
var cart=getCart();
var qty=Number(value);

if(qty>=1){
cart[index].qty=qty;
saveCart(cart);
}
showCart();
}

function removeItem(index){
var cart=getCart();
cart.splice(index,1);
saveCart(cart);
showCart();
}

function placeOrder(){
alert("Thank you for the order!");
saveCart([]);
showCart();
}

function showCart(){
var tbody=document.getElementById("cartitems");
if (tbody==null){
return;
}

var cart=getCart();
var rows="";
var total=0;

for(var i=0; i<cart.length; i++){
var subtotal=cart[i].price*cart[i].qty;
total=total+subtotal;

rows=rows+"<tr>";
rows=rows+"<td>"+cart[i].name+"</td>";
rows=rows+"<td>"+cart[i].price.toFixed(2)+"</td>";
rows =rows+'<td><input type="number" min=1 value="'+cart[i].qty + '" onchange="changeQty(' + i + ', this.value)"></td>';
rows =rows+"<td>"+subtotal.toFixed(2)+"</td>";
rows =rows+'<td><button type="button" onclick="removeItem(' + i + ')">Remove</button></td>';
rows =rows+"</tr>";
}

tbody.innerHTML=rows;
document.getElementById("carttotal").innerHTML=total.toFixed(2);

if(cart.length==0){
document.getElementById("carttable").style.display="none";
document.getElementById("checkout").style.display="none";
document.getElementById("emptymessage").style.display="block";
} else{
document.getElementById("carttable").style.display="table";
document.getElementById("checkout").style.display="inline-block";
document.getElementById("emptymessage").style.display="none";
}
}

showCart();