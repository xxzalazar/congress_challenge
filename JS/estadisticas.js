if(document.getElementById("senate_c")){
    var congreso="senate"
}else{
    var congreso="house"
}
$(document).ready(
        $.ajax({
            url: `https://api.propublica.org/congress/v1/113/${congreso}/members.json`,
            headers: {
                "X-API-Key": "DzmPm0VNooCWB3qw2qegS6KXunF3Mbqvocd4E6OY"
            },
            success: function(info){
                var data=info.results[0].members
                mi_programa(data)
               
            }
        }),
)

function mi_programa(datos){
    var app = new Vue({
        el: '#app',
        data: {
            total: 0,
            democratas: 0,
            republicanos:0,
            independientes:0,
            dem_vwp:0,
            rep_vwp:0,
            ind_vwp:0,
            tot_vwp:0,
            miembros_masaus:[],
            miembros_menosaus:[],
            mas_leales:[],
            menos_leales:[],
            lista_miembros:[],
        }
    })

    app.total= datos.length
    var dr=[]
    var dd=[]
    var di=[]
    
    datos.map(miembro =>{
        if(miembro.party=='R'){
            app.republicanos+=1
            dr.push(miembro.votes_with_party_pct)  
        }else if(miembro.party=='D'){
            app.democratas+=1
            dd.push(miembro.votes_with_party_pct)
        }else{   
            if (miembro.party=='ID'){
            app.independientes+=1
            di.push(miembro.votes_with_party_pct)}
        }   
        app.lista_miembros.push(miembro)
    })
       
    
    function porc(arr){
        var suma=0
        if(arr.length== 0){
            return 0
        }else
        {
            for(var i=0; i<arr.length;i++){
                suma+= arr[i] 
        }}        
        return suma/arr.length
        
    }

    app.rep_vwp=parseFloat(porc(dr).toFixed(2))
    app.dem_vwp=Number(porc(dd).toFixed(2))
    app.ind_vwp=Number(porc(di).toFixed(2))
    
    console.log(app.rep_vwp)
    
    function totalporc(){
        var dsum=0
        if(di==0){
            dsum= (app.rep_vwp + app.dem_vwp)/2        
        }else{
            dsum= (app.rep_vwp + app.dem_vwp + app.ind_vwp)/3   
        }
        return dsum
    }
    app.tot_vwp=totalporc(di).toFixed(2)
 
    var porcentaje1= datos.length*0.10

    //ordeno de manor a mayor y viceversa

    function ordenar(p1,prop){
        ordenar_miembros=datos
    if(p1===0){  
        ordenar_miembros.sort((a,b)=>(b[prop]-a[prop]))
        return ordenar_miembros.slice(0,porcentaje1)
    }else if(p1===1){
        ordenar_miembros.sort((a,b)=>(a[prop]-b[prop]))
        return ordenar_miembros.slice(0,porcentaje1)
    }}
    
    app.miembros_menosaus=ordenar(1,"missed_votes_pct")
    app.miembros_masaus=ordenar(0,"missed_votes_pct")
    app.menos_leales=ordenar(1,"votes_with_party_pct")
    app.mas_leales=ordenar(0,"votes_with_party_pct")
    
    //calculo de la cantidad de votos en los que acompañó a su partido
    
    app.mas_leales.map(miembro=> {
        miembro.votos_wp=Math.ceil((miembro.total_votes*miembro.votes_with_party_pct)/100)
    })
    
    app.menos_leales.map(miembro=> {
        miembro.votos_wp=Math.ceil((miembro.total_votes*miembro.votes_with_party_pct)/100)
    })
    
} 