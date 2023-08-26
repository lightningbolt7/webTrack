let inputBtn = document.getElementById("input-btn")
let myLeads=[]
let inputEl = document.getElementById("input-el")
let ulEl = document.getElementById("ul-el")
let clearEl = document.getElementById("clear-btn")
let saveEL = document.getElementById("save-tab-btn")
let leadsFromLocalStorage = JSON.parse( localStorage.getItem("Leads") )

if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    update()
}

saveEL.addEventListener("click",function(){
    chrome.tabs.query({active: true,currentWindow: true}, function(tab){
        Add(tab[0].url)
        localStorage.setItem("Leads",JSON.stringify(myLeads))
        update()
    })
})
inputEl.addEventListener("keypress",function(event){
    
    if(event.code=="Enter"){
       Add(inputEl.value)
    }
})
inputBtn.addEventListener("click",function(){
    Add(inputEl.value)
})
clearEl.addEventListener("click",function(){
    localStorage.clear()
    myLeads=[]
    update()
})
function update(){
    let LeadStr=""
    for(let i=0;i<myLeads.length;i++){
        LeadStr+=myLeads[i]
    }
    ulEl.innerHTML=LeadStr
    inputEl.value=""
   
}
function Add(link){
    if(link){
        myLeads.push("<a href='"+link+"' target='_blank'><li>"+link+"</li></a>")
        localStorage.setItem("Leads",JSON.stringify(myLeads))
        update()
    }
}