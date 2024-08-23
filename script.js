import countryList from "./countries.js";
const baseUrl="https://latest.currency-api.pages.dev/v1/currencies/eur.json";
const dropdowns=document.querySelectorAll('.dropdown select')
const btn=document.querySelector('.msg button')
const fromCurr=document.querySelector('.from select')
const toCurr=document.querySelector('.to select')
const msg=document.querySelector('.msg p')
for(let select of dropdowns){
    for(let currencyCode in countryList){
        let newOption=document.createElement('option')
        newOption.innerText=currencyCode
        newOption.value=currencyCode
        select.append(newOption)
          
    }
    select.addEventListener('change',(e)=>{
        updateFlag(e.target)

    })
     
}


const updateFlag= (element)=>{
    let currencyCode=element.value
    let countryCode=countryList[currencyCode]
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`
    let img=element.parentElement.querySelector('img')
    img.src=newSrc
}
btn.addEventListener('click', async(ev)=>{
    ev.preventDefault(); 
    let amount =document.querySelector('.amount input')
    let amountValue=amount.value
    if(amountValue === "" || amountValue <1)
    {
        amountValue=1;
        amount.value="1"

    }

     const url=`${baseUrl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
     let response =await fetch(url)
     console.log(response)
     let data=await response.json()
     let rate=data[toCurr.value.toLowerCase()]
     let finalAmnt=amountValue * rate;
     msg.innerText=`${amountValue}${fromCurr.value} = ${finalAmnt} ${toCurr.value}`

})


