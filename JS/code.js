if(document.getElementById("senate_c")){
$(document).ready(
    $.ajax({
        url: "https://api.propublica.org/congress/v1/113/senate/members.json",
        headers: {
            "X-API-Key": "DzmPm0VNooCWB3qw2qegS6KXunF3Mbqvocd4E6OY"
        },
        success: function(info){
            var data=info.results[0].members
            console.log(data) 
            tablas(data)
            if(document.getElementById("house_c")){
                $(document).ready(
                    $.ajax({
                        url:"https://api.propublica.org/congress/v1/113/house/members.json",
                        headers:{
                            "X-API-KEY": "DzmPm0VNooCWB3qw2qegS6KXunF3Mbqvocd4E6OY"
                        },
                        success: function(info){
                            var data=info.results[0].members
                            console.log(data) 
                            
                        }
                    })
                )
            }
        }
    }),
)}


function tablas(members){
    for(var i=0; i< members.length ;i++){
        const name= members[i].first_name+' '+members[i].last_name  
        const link= members[i].url
        const party= members[i].party
        const state= members[i].state
        const years_in_office=members[i].seniority
        const vw_party= members[i].votes_with_party_pct
        const filas=document.createElement("tr")
        const col1= document.createElement("td")
        var a = document.createElement('a')
        col1.appendChild(a)
        a.href = link
        a.innerText= name    
        const col2=document.createElement("td")
        col2.innerText=party
        const col3= document.createElement("td")
        col3.innerText=state
        const col4=document.createElement("td")
        col4.innerText=years_in_office
        const col5=document.createElement("td")
        col5.innerText=vw_party
        filas.appendChild(col1)
        filas.appendChild(col2)
        filas.appendChild(col3)
        filas.appendChild(col4)
        filas.appendChild(col5)
        cuerpo_tabla.appendChild(filas)
    }
}