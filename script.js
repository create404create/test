document.getElementById("searchButton").addEventListener("click", searchNumber);

async function searchNumber(){

const number = document.getElementById("phoneInput").value.trim();

const loader = document.getElementById("loader");

const error = document.getElementById("error");

loader.style.display="block";

error.innerText="";

try{

// TCPA API

const tcpaResponse = await fetch("https://api.uspeoplesearch.site/tcpa/v1?x=" + number);

const tcpa = await tcpaResponse.json();

document.getElementById("state").innerText = tcpa.state || "N/A";

if(tcpa.ndnc==="Yes" || tcpa.sdnc==="Yes"){

document.getElementById("dncStatus").innerText="Registered";

}else{

document.getElementById("dncStatus").innerText="Clean";

}

document.getElementById("litigator").innerText = tcpa.type || "No";

document.getElementById("blacklist").innerText = tcpa.listed || "No";


// PERSON API

const personResponse = await fetch("https://api.uspeoplesearch.site/v1/?x=" + number);

const personData = await personResponse.json();

if(personData.count>0){

const person = personData.person[0];

document.getElementById("personName").innerText = person.name || "Unknown";

document.getElementById("personAge").innerText = "Age: " + (person.age || "N/A");

document.getElementById("personStatus").innerText = "Status: " + person.status;

const table = document.getElementById("addressTableBody");

table.innerHTML="";

person.addresses.forEach(addr=>{

table.innerHTML += `
<tr>
<td>${addr.home}</td>
<td>${addr.city}</td>
<td>${addr.state}</td>
<td>${addr.zip}</td>
</tr>
`;

});

}

}catch(e){

error.innerText="API Error. Try again.";

}

loader.style.display="none";

}
