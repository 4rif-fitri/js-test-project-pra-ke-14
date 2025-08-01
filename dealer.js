var brandlist = new Array("porsche", "volkswagen", "audi", "bmw");
let bilangan_customer = 0
function newClient() {
  if(bilangan_customer == 10)return
  bilangan_customer++
  var preference = Math.floor(Math.random() * 4);
  var time = Math.floor(Math.random() * 100 + 1);
  var client = Math.floor(Math.random() * 10 + 1);
  $("#clients_queue").append(
    '<div class="client client_' +
      client +
      '"><span class="preference">Client for ' +
      brandlist[preference] +
      "</span></div>"
  );
  setTimeout(function () {
    newClient();
  }, time);
}

let bilangan_kereta = {porsche: 4, volkswagen: 6, audi: 5, bmw:3}
let harga_kereta = {porsche: 1000, volkswagen: 2000, audi: 3000, bmw:4000}
let customer

let sta = {client: 0,cars: 0,rm: 0}

let arr_petak_kereta, arr_sold
let selected, car_selected

let petak_cashier
let pop_container, pop_content, btn_yes, btn_no
let exit
let clients_served, cars_sold, amount
let pop_container_2, pop_content_2, h2, btn_ok
function info_petak(){
  for (let i = 0; i < arr_petak_kereta.length; i++) {
    // console.log(arr_petak_kereta);
    arr_petak_kereta[i].addEventListener("dragover", e=> e.preventDefault())
    arr_petak_kereta[i].addEventListener("drop",drop)
    arr_petak_kereta[i].dataset.index = i
    
    if(i < 4){
      arr_petak_kereta[i].dataset.jenama = "porsche"
    }else if(i < 10){
      arr_petak_kereta[i].dataset.jenama = "volkswagen"
    }else if(i < 15){
      arr_petak_kereta[i].dataset.jenama = "audi"
    }else if(i < 18){
      arr_petak_kereta[i].dataset.jenama = "bmw"
    }
  }
}

function get_cus(){
  customer =document.querySelector(".client")
  customer.draggable = "true"
  customer.dataset.status_view = "belum"
  customer.addEventListener("dragstart",dragstart)  
  customer.addEventListener("dragend",dragend)
}
function clue(){
  arr_petak_kereta.forEach(element => {
    // console.log(element);
    if(element.dataset.jenama == car_selected){
      element.style.backgroundColor = "lightgreen"
    }
  });
}
function dragstart(e){
  selected = e.target
  car_selected = selected.textContent.split(" ")[2]
  selected.dataset.orang = "orang"
  // console.log({selected});
  // console.log({car_selected});
  clue()
}
function dragend(){
  arr_petak_kereta.forEach(element => {
    element.style.backgroundColor = "lightcoral"
  })
  }
function drop(e){
  let index_petak = e.target.dataset.index
  let jenama_petak = e.target.dataset.jenama
  let petak_terget = e.target
  console.log(index_petak);
  
  
  
  let index_selected =  e.target.dataset.orang
  console.log({index_selected});
  if(index_selected == "orang"){
    mesej("inline","Sori Ade Orang")
    return
  }

    // console.log({index_petak});
    // console.log({jenama_petak});
    // console.log({car_selected});

    // let status = selected.dataset.status_view
    // let jamae = selected.dataset.jenam_pilihan

    // console.log({status});
    // console.log(index);
    // console.log(jamae);

  if(bilangan_kereta[car_selected] <= 0 && jenama_petak != car_selected){
      e.target.append(selected)
      selected.dataset.status_view = "sudah"
      selected.dataset.index = index_petak
      selected.dataset.jenam_pilihan = jenama_petak
      bilangan_customer--
      newClient()
      get_cus()
      mesej("inline","Sila ke kaunter")

  }else if(bilangan_kereta[car_selected] != 0 && jenama_petak == car_selected){    
    e.target.append(selected)
    selected.dataset.status_view = "sudah"
    selected.dataset.index = index_petak
    selected.dataset.jenam_pilihan = jenama_petak
    bilangan_customer--
    newClient()
    get_cus()
    mesej("inline","Sila ke kaunter")
  }else{ 
    // alert("salah")
    mesej("inline","Sori, Salah kereta")
    return
  }
}

function update_ui(){
  clients_served.textContent = sta["client"] + " client"
  cars_sold.textContent = sta["cars"] + " cars"
  amount.textContent = "RM " + sta["rm"]
}

function keluar(){
  pop_container.style.display = "none"
  pop_content.style.display = "none"
  
  sta["client"]++
  update_ui()
  selected.remove()
  bilangan_customer--
  get_cus()
  newClient()
}
function beli(){
  
  selected.style.transform = "translate(0,-20rem)"
  pop_container.style.display = "none"
  pop_content.style.display = "none"

  let index =  selected.dataset.index
  let jamae = selected.dataset.jenam_pilihan
  sta["cars"]++
  sta["rm"] += harga_kereta[jamae]
    

    // console.log(index);
    // console.log({jamae});
    arr_sold[index].style.display = "flex"
    arr_petak_kereta[index].style.display = "none"
    bilangan_kereta[jamae]--
    setTimeout(keluar,1000)
  // arr_sold[selected.dataset.index].style,display = "flex"
}

function drop_kaunter(e){
   
  if(selected.dataset.status_view == "sudah"){
    e.target.append(selected)
    pop_container.style.display = "flex"
    pop_content.style.display = "inline"
    selected.style.zIndex = 30
    
    btn_yes.addEventListener("click",beli)
    btn_no.addEventListener("click",keluar)
  }else{
    // alert("amaran")
    mesej("inline","Sori, pergi Ke kereta dulu")
  }
}
function tutup_pop(){
  mesej("none")
  btn_ok.removeEventListener("click", tutup_pop)
}
function mesej(display,text){
  pop_container_2.style.display = display
  pop_content_2.style.display = display
  h2.textContent = text
  btn_ok.addEventListener("click", tutup_pop)
}
function main(){
  newClient()
  clients_served = document.getElementById("clients_served")
  cars_sold = document.getElementById("cars_sold")
  amount = document.getElementById("amount")

  exit = document.querySelector("#exit")
  arr_sold = document.querySelectorAll("#sold")
  arr_petak_kereta = document.querySelectorAll(".petak")
  petak_cashier = document.querySelector(".petak_cashier")
  pop_container = document.querySelector(".pop_container")
  pop_content = document.querySelector(".pop_content")
  btn_yes = document.querySelector("#yes")
  btn_no = document.querySelector("#no")
  btn_yes.removeEventListener("click",beli)
  btn_no.removeEventListener("click",keluar)

  pop_container_2 = document.querySelector(".pop_container_2")
  pop_content_2 = document.querySelector(".pop_content_2")
  h2 = document.querySelector("#h2")
  btn_ok = document.querySelector("#ok")

  exit.addEventListener("dragover",e=> e.preventDefault())
  exit.addEventListener("drop",keluar)
  petak_cashier.addEventListener("dragover",e=> e.preventDefault())
  petak_cashier.addEventListener("drop",drop_kaunter)
update_ui()
  get_cus()
  info_petak()
}

$("document").ready(function (e) {
  main()
});
