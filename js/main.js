let elProductList = document.querySelector(".products-list");
let elLoaindgWrapper = document.querySelector(".loading-wrapper");

let searchInput = document.querySelector(".search-input");
let lupaImg = document.querySelector(".lupa-img")
let closeImg = document.querySelector(".close-img")
let elSpan = document.querySelector(".border-right")
let elPopaplist = document.querySelector(".popap-list");

setTimeout(() => elLoaindgWrapper.classList.add("hidden"),1000)

searchInput.addEventListener("click", () =>{
    searchInput.classList.add("w-[90%]");
    searchInput.classList.add("pr-[75px]");
    lupaImg.classList.add("hidden");
    setTimeout(() => {
        elSpan.classList.remove("hidden");
        closeImg.classList.remove("hidden");
    }, 1000)
    
})
closeImg.addEventListener("click", () =>{
    searchInput.classList.remove("w-[90%]");
    searchInput.classList.remove("pr-[75px]");
    elSpan.classList.add("hidden");
    closeImg.classList.add("hidden");
    setTimeout(() => lupaImg.classList.remove("hidden"),800)
})

function getProduct(arr){
    elProductList.innerHTML = null;
        arr.forEach(product => {
            let li = document.createElement("li");
            li.className = "w-[400px] rounded-xl bg-white shadow-2xl p-3"
            li.innerHTML = `
                <img class="h-[200px] object-contain bg-slate-200 rounded-xl mb-5" src="${product.images[0]}" alt="product IMG" width="100%" height="200">
                <div class="px-[20px]">
                    <h2 class="mb-5 text-[23px] font-bold text-yellow-500">${product.title}</h2>
                    <p class="mb-5 line-clamp-2 text-md">${product.description}</p>
                    <div class="flex items-center justify-between">
                        <span class="text-xl font-bold">$${product.price}</span>
                            <button onclick="sendToChatBot(${product.id})" class="text-lg font-bold bg-yellow-500 border border-yellow-500 hover:text-yellow-500 duration-300 py-2 rounded-2xl text-white hover:bg-transparent  w-[50%]">Order</button>
                    </div>
                </div>    
            `
            elProductList.appendChild(li);
        })
        
}
axios("https://dummyjson.com/products").then(res => { getProduct(res.data.products) });




// Chat bot

const TOKEN = "7285271708:AAGoRewrMji_tKzU6AgyAkX3F3jrwoEoNy4"
const CHAT_ID = "-1002188483357"
const HTTP = `https://api.telegram.org/bot${TOKEN}/sendPhoto`

function sendToChatBot(id){
    axios(`https://dummyjson.com/products/${id}`).then(res => {
        console.log(res);
        
        let message = `<b>Product Information</b>\n`
        message += `<b>Title: ${res.data.title}</b>\n`
        message += `<b>Description: ${res.data.description}</b>`
        message += `\n<b>Price: $${res.data.price}</b>`
        axios.post(HTTP, {
            chat_id: CHAT_ID,
            parse_mode: "HTML",
            caption: message,
            photo: res.data.images[0]
        })
        alert("Your shopping is successfully")
    })
}


// search part start

searchInput.addEventListener("input", function(e){
    elPopaplist.innerHTML = null
    let searchQuery = e.target.value.toLowerCase()
    axios.get("https://dummyjson.com/products").then(res => {
        const filteredProducts = res.data.products.filter(item => item.title.toLowerCase().includes(searchQuery))
        if(searchInput.value == ""){
            getProduct(res.data.products)
        }
        else{
            if(filteredProducts.length && searchQuery){
                elPopaplist.classList.remove("h-0")
                elPopaplist.classList.remove("p-0")
                elPopaplist.classList.add("p-2")

                filteredProducts.forEach(product => {
                    let li = document.createElement("li");
                    li.id = product.id;
                    li.className = "text-lg line-clamp-1 rounded-lg px-2 font-bold text-black hover:bg-gray-300 duration-300 py-2"
                    li.innerHTML = product.title

                    elPopaplist.appendChild(li)
                    
                    li.addEventListener("click", function(e){
                        let findedProduct = res.data.products.find(item => item.id == e.target.id);
                        searchInput.value = findedProduct.title 
                        getProduct([findedProduct])
                        elPopaplist.classList.remove("p-2")
                        elPopaplist.classList.add("h-0")
                        elPopaplist.classList.add("p-0")
                    })
                    
                })
            }
            else{
                elPopaplist.classList.remove("p-2")
                elPopaplist.classList.add("h-0")
            }
        }
    })

})

searchInput.addEventListener("blur", function(){
    setTimeout(() => {
        elPopaplist.classList.add("h-0")
       elPopaplist.classList.add("p-0")
       elPopaplist.classList.remove("p-2")
       }, 400)
})

// search part end
