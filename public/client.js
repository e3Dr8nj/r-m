
/*
// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('hello world :o');

let dreams = [];

// define variables that reference elements on our page
const dreamsList = document.getElementById('dreams');
const dreamsForm = document.forms[0];
const dreamInput = dreamsForm.elements['dream'];

// a helper function to call when our request for dreams is done
const getDreamsListener = function() {
  // parse our response to convert to JSON
  dreams = JSON.parse(this.responseText);

  // iterate through every dream and add it to our page
  dreams.forEach( function(row) {
    appendNewDream(row.dream);
  });
}

// request the dreams from our app's sqlite database
const dreamRequest = new XMLHttpRequest();
dreamRequest.onload = getDreamsListener;
dreamRequest.open('get', '/getDreams');
dreamRequest.send();

// a helper function that creates a list item for a given dream
const appendNewDream = function(dream) {
  const newListItem = document.createElement('li');
  newListItem.innerHTML = dream;
  dreamsList.appendChild(newListItem);
}

// listen for the form to be submitted and add a new dream when it is
dreamsForm.onsubmit = function(event) {
  // stop our form submission from refreshing the page
  event.preventDefault();

  // get dream value and add it to the list
  dreams.push(dreamInput.value);
  appendNewDream(dreamInput.value);

  // reset form 
  dreamInput.value = '';
  dreamInput.focus();
};
*/

const testForm = document.forms[1];


let glitch=true;
let obj_arr_new="";
function Obj(e){
         let arr=e.split('r:');
//-------------
       console.log(glitch!='true');
       let part1='';
        
       console.log('glitch'); part1=arr[0].split('\n');//for win else for glitch
//-----------------------------------
         part1.pop();
         for(var i=0;i<part1.length;i++){ 
            let name = part1[i].slice(0,1);
            let str= part1[i].slice(2);
            if(name=='w'||name=='s'||name=='a'){
                this[name]=str.split('/');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else
            if(name=='q'){
                this[name]=str.split('&');
                if(this[name][this[name].length-1]==' '||this[name][this[name].length-1]==''){this[name].pop();};
            }else{ this[name]=str;};//
         
        };//for end
//--------------------
     
     if(this.s) this.s=this.s.join('\n');     
     //this.r=arr[1].trim().split('\n  ');//for win else for glitch 
    this.r=arr[1].trim().split('\n  ').join('\n');
//--------------------  
    //this.r.pop();
  };
function generate(obj_arr){
  let str2='';
   str2+='<form name="testForm" method="post" action="/addData" target="frame">';
    str2+=' <input type="submit" value="Submit" class ="submitStick">';
   str2+='<div value="0">Login:<textarea name="avtorization[login]"   rows="1" cols="30">Log</textarea> Password: <textarea name="avtorization[pass]"   rows="1" cols="30">qwerty</textarea></div>';
  
   let i=0;
obj_arr.map(e=>{
       e.id=i++;
       e.type="not set";
      // str2+='<hr>';
       str2+='<div id="'+e.id+'">';
       str2+='<div class="inv2" id="border2'+e.id+'">'+'<hr><p id="p4_'+e.id+'" class="a_inl" onclick="show('+e.id+')">&#9998</p></div>';
       str2+='<div class="inv2" id="trigg'+e.id+'">';
  
      str2+='<div id="id_number"class="inl" name="'+e.id+'[_id]" value=e.id>ID'+i +'    </div>';
       str2+='<div class="inl">Название:<textarea name="'+e.id+'[n]" id="n'+e.id+'"  class="bl" rows="1" cols="30">'+e.n+'</textarea></div>';
       str2+='<div class="inl">Emoji:<textarea name="'+e.id+'[e]" id="e'+e.id+'"  class="bl"  rows="1" cols="30">'+e.e+'</textarea></div>';
       
       str2+='<div class="inl">Тип:<textarea name="'+e.id+'[type]" id="type'+e.id+'"  class="bl"  rows="1" cols="30" >'+e.type+'</textarea></div><br>';
       
       
       str2+='Слова (или их части) триггеры:<br>';
       str2+='</div>';
       str2+='<p id="p3_'+e.id+'" class="a_inl" onclick="show('+e.id+')">&#9998</p><textarea name="'+e.id+'[w]" id="w'+e.id+'" rows="2" cols="120" >'+e.w+'</textarea><p id="p1_'+e.id+'" class="a_inl" onclick="showRestTriggers('+e.id+')">&#x2795</p><br>';
       str2+='<div class="inv" id="triggers'+e.id+'">';
       str2+='Все слова которые должны присутсвовать во входной фразе:<br><textarea name="'+e.id+'[q]" id="q'+e.id+'" row="2" cols="120">'+e.q+'</textarea><br>';
       str2+='Слова хотябы одно из которых должно присутствовать во входной фразе:<br><textarea name="'+e.id+'[a]" id="a'+e.id+'"  row="2" cols="120">'+e.a+'</textarea><br>';
       str2+='</div>';
       str2+='<div class="inv2" id="trigg2'+e.id+'">';
       str2+='Основные фразы ответа:<br><textarea name="'+e.id+'[r]" id="r'+e.id+'"  rows="10" cols="120">'+e.r+'</textarea><p id="p2_'+e.id+'" class="a_inl" onclick="showRest('+e.id+')">&#x2795</p><br>';
       str2+='<div class="inv" id="rest'+e.id+'">';
       str2+='Фразы следующие за основной:<br><textarea name="'+e.id+'[s]" id="s'+e.id+'" rows="10"  cols="120" >'+e.s+'</textarea>';
       str2+='</div>';
       str2+='</div>';
       str2+='<div class="inv2" id="border'+e.id+'">'+'<hr><br></div>';
       str2+='</div>';
      
     });
     
      str2+='</form>';
   return str2;
};//
const dreamsForm = document.forms[0];
  const dreamInput = dreamsForm.elements['dream'];
  const textOutput=document.getElementById('text_out');
function save(testForm){
    const Request=new XMLHttpRequest();
 
  
Request.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
     
     let str = this.responseText;
};
   Request.open("POST","/addData",true);
 Request.send(testForm);
}};
function loadSome(){
  
  let fd;


  
  const Request=new XMLHttpRequest();
 
  
Request.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
     
     let str = this.responseText;
     console.log(dreamInput.value);
     let arr=this.responseText.split("***"); arr.pop(); arr.shift();
     let str2='';
     let obj_arr=[];
     arr.map(e=>{obj_arr.push(new Obj(e));});
     let i=0;
     /*
     obj_arr.map(e=>{
       str2+='<hr>';
      str2+='<div class="inl">ID'+i++ +'    </div>';
       str2+='<div class="inl">Название:<textarea  class="bl" rows="1" cols="30">'+e.n+'</textarea></div>';
      str2+='<div class="inl">Emoji:<textarea  class="bl"  rows="1" cols="30">'+e.e+'</textarea></div><br>';
       str2+='Фразы следующие за основной:<textarea rows="10"  cols="120" >'+e.s+'</textarea><br>';
       str2+='Слова (или их части) триггеры:<textarea rows="2" cols="120">'+e.w+'</textarea><br>';
       str2+='Основные фразы ответа:<textarea rows="10" cols="120">'+e.r+'</textarea><br>';
       str2+='<br>';
     });
     */
     str2=generate(obj_arr);
     let pos_start=str.indexOf(dreamInput.value); console.log(pos_start);
     let pos_end=str.indexOf("***",pos_start);console.log(pos_end);
     str = str.slice(pos_start,pos_end);
    //let cnt=obj_arr.findAll(e=>e.w.indexOf(dreamInput.value)!=-1);
     
     //textOutput.innerHTML=generate(cnt);
     //console.log(cnt);
     
     document.getElementById("pi").innerHTML=str2;
     obj_arr_new=obj_arr;
     
   };
};
 Request.open("GET","/source_m.txt",true);
 Request.send();

};

function getFocus(){
  let cnt = [];
     obj_arr_new.map(e=>{if(e.w.join(',').indexOf(dreamInput.value.trim())!=-1){cnt.push(e.id)};});
     textOutput.innerHTML='';
     console.log(cnt);
  document.getElementById(cnt[0]).focus();
  document.getElementById(cnt[0]).scrollIntoView();
};
function show(id){
  
  if(document.getElementById("trigg"+id).style.display=="none"){
     document.getElementById("trigg"+id).style.display="inline";
     document.getElementById("trigg2"+id).style.display="inline";
    document.getElementById("border"+id).style.display="inline";
    document.getElementById("border2"+id).style.display="inline";
    //if(document.getElementById("triggers"+id).style.display="none"){showRestTriggers(id);};
     document.getElementById("p3_"+id).innerHTML="";
     document.getElementById("p4_"+id).innerHTML="🆗";
  }else{
     if(document.getElementById("triggers"+id).style.display="inline"){showRestTriggers(id);};
     document.getElementById("trigg"+id).style.display="none";
     document.getElementById("trigg2"+id).style.display="none";
    document.getElementById("border"+id).style.display="none";
    document.getElementById("border2"+id).style.display="none";
     document.getElementById("p3_"+id).innerHTML="&#9998";
  };
};
function showRestTriggers(id){
  
  if(document.getElementById("triggers"+id).style.display=="none"){
     document.getElementById("triggers"+id).style.display="inline";
    // if(document.getElementById("trigg"+id).style.display=="none"){show(id);};
     document.getElementById("p1_"+id).innerHTML="&#x2796";
  }else{
     
     document.getElementById("triggers"+id).style.display="none";
    
     document.getElementById("p1_"+id).innerHTML="&#x2795";
  };
};
function showRest(id){
    if(document.getElementById("rest"+id).style.display=="none") {
     document.getElementById("rest"+id).style.display="inline";
     document.getElementById("p2_"+id).innerHTML="&#x2796";
  }else{
     
     document.getElementById("rest"+id).style.display="none";
     document.getElementById("p2_"+id).innerHTML="&#x2795";
  };
};
function change(){
  let b_url='"https://livewallpaperhd.com/wp-content/uploads/2017/08/Anime-Re-Zero-Wallpaper-Emilia.jpg"';
  document.body.style.backgroundImage =(document.body.style.backgroundImage=='url('+b_url+')')?'url(" ")':'url('+b_url+')';

};
//function save(){
 // let fs =require("fs");
 // let mindBD=require('./mindBD');
 // mindBD.run();
 // document.getElementById("output").innerHTML="saved";
//};


function save(){
  
  
  

};


//----------
function loadSome2(){
  

  let fd;


  
  const Request=new XMLHttpRequest();
 
  
Request.onreadystatechange=function(){
   if(this.readyState==4 && this.status==200){
     let parser = new DOMParser();
 let xmlDoc = parser.parseFromString(this.responseText,"text/xml");
     
     //let xmlDoc=parseFromString();
     let x = xmlDoc.getElementsByTagName("trigger");
     //console.log(xmlDoc);
     let doc=this.responseXML;
     let txt="";
     let path="/triggers/trigger";
      var nodes = doc.evaluate(path, doc, null, XPathResult.ANY_TYPE, null);
     var arr_obj=[];
     var result = nodes.iterateNext();
     while (result) {
           let newJXON ={};
           for(let i=0;i<result.childNodes.length;i++){
               newJXON[result.childNodes.item(i).nodeName]=result.childNodes.item(i).childNodes[0].nodeValue;
            };
            
            result = nodes.iterateNext();
            console.log(newJXON);
            arr_obj.push(newJXON);
        } 
    let triggers_arr= doc.getElementsByTagName("trigger");
     console.log(arr_obj);
     txt = generate(arr_obj);
     //console.log(triggers_arr[0]);
    // let r = JSON.parse(this.responseText);
     //console.log(r);
   // console.log(doc);
    // console.log(txt);
     document.getElementById('pi').innerHTML=txt;
      
   };
     
     
   
};
 Request.open("GET","/triggers.xml",true);
 Request.send();

};
//---------------constructor xmltojsobj
function xmlToObj(xml){
  //console.log(xml.childNodes[0]);

};
//----