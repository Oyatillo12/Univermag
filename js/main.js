let elProductList = document.querySelector(".products-list");
let elLoaindgWrapper = document.querySelector(".loading-wrapper");
setTimeout(() => elLoaindgWrapper.classList.add("hidden"),1000)

function getProduct(){

    axios("https://dummyjson.com/products").then(res => {
        res.data.products.forEach(product => {
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
        
    })
}
getProduct()




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
