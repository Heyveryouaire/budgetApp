
class Budget{
    constructor(){
        this.budgetInput = document.getElementById("budgetInput")
        this.depenseTitle = document.getElementById("depenseTitle")
        this.depenseInput = document.getElementById("depenseInput")
        this.budget = document.getElementById("budget")
        this.depense = document.getElementById("depense")
        this.sommes = document.getElementById("balance")
        this.list = document.getElementById("list")
        this.id = 0
        this.depenseList = []
        this.totalDepense = 0
    }

    add(){
        if(this.budgetInput.value >= 0){
            this.budget.textContent = this.budgetInput.value
            this.budget.classList.add("green")
            this.budgetInput.value = ""
            this.balance()
        }
        else if(this.budgetInput.value < 0 || this.budgetInput.value === "" || isNaN(this.budgetInput.value) ){
            console.log("Impossible d'avoir un nombre négatif ou vide")
            this.budgetInput.value = ""
        }
       
    }

    balance(){
        if(parseInt(this.budget.textContent) > parseInt(this.depense.textContent)){
            this.sommes.classList.remove("red")
            this.sommes.classList.remove("black")
            this.sommes.classList.add("green")
        }else if(parseInt(this.budget.textContent) < parseInt(this.depense.textContent)){
            this.sommes.classList.remove("green")
            this.sommes.classList.remove("black")
            this.sommes.classList.add("red")
        }else{
            this.sommes.classList.remove("green")
            this.sommes.classList.remove("red")
            this.sommes.classList.add("black")
        }
            this.sommes.innerHTML = parseInt(this.budget.textContent - this.totalDepense)
    

    }

    spent(){

        if(this.depenseTitle.value === ""){
            console.log("Il faut un titre")
        }else if(this.depenseInput.value < 0 || this.depenseInput.value === "" || isNaN(this.depenseInput.value)){
            console.log("Entrer un nombre valide")
        }
        else{
            this.listDepense()
            this.depense.textContent = this.totalDepense
            this.depense.classList.add("red")
            this.depenseInput.value = ""
            this.depenseTitle.value = ""
            this.balance()

        }

    
    }

    listDepense(){
        let tableauDepense = { 
            libelle : this.depenseTitle.value,
            depense : parseInt(this.depenseInput.value),
            id : this.id
        }
        this.depenseList.push(tableauDepense)
        this.id++

        let ligne = document.createElement("tr")
        ligne.id = `${this.id}`
        let nom = document.createElement("td")
        let somme = document.createElement("td")
        let edit = document.createElement("td")
        let del = document.createElement("td")

        nom.innerHTML = `${this.depenseTitle.value}`
        somme.innerHTML = `${this.depenseInput.value}`

        const self = this
        edit.innerHTML = `<button>Edit</button>`
        del.innerHTML = `<button>Delete</button>`
        
        edit.addEventListener("click", function(e){
            e.preventDefault()
            self.editElt(this.parentElement.id, this.parentElement)
        })
        del.addEventListener("click", function(e){
            e.preventDefault()
            self.removeElt(this.parentElement.id, this.parentElement)
            //sself.list.removeChild(this.parentElement)
        })

        ligne.appendChild(nom)
        ligne.appendChild(somme)
        ligne.appendChild(edit)
        ligne.appendChild(del)

        this.list.appendChild(ligne)

        this.totalDepense  = this.depenseList.reduce((acc, curr) => {
            acc += curr.depense
            return acc
        },0)

    }

    removeElt(elt, eltDel){
        // Recréation du tableau sans celui supprimer
        let arr = this.depenseList.filter(item => item.id != elt-1)
        this.depenseList = arr
        // Recalcule de la somme des dépenses
        this.totalDepense  = this.depenseList.reduce((acc, curr) => {
            acc += curr.depense
            return acc
        },0)

        const self = this

        if(eltDel !== ""){
            self.list.removeChild(eltDel)

        }
        this.balance()
        this.depense.textContent = this.totalDepense
      
    }

    editElt(elt, eltDel){

        let arr = this.depenseList.filter(item => item.id == elt-1)
        this.depenseInput.value = arr[0].depense
        this.depenseTitle.value = arr[0].libelle
        
        this.depenseTitle.focus()

        this.removeElt(elt, eltDel)

        console.log(arr)
      
    }

}

let budget = new Budget

// Button
const budgetValid = document.getElementById("budgetValid")
const depenseValid = document.getElementById("depenseValid")

budgetValid.addEventListener("click", function(e){
    e.preventDefault()
    budget.add()

})
depenseValid.addEventListener("click", function(e){
    e.preventDefault()
    budget.spent()
})
