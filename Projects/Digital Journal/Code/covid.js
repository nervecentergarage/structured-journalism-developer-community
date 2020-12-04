var dateLabel=[];
var casesArray=[];
var config;
var myLineChart;
var stateData;
var dictionaryData={};
var jsonData;

function initStateData(){
	dictionaryData["AL"]="Alabama";
	dictionaryData["AK"]="Alaska";
	dictionaryData["AZ"]="Arizona";
	dictionaryData["AR"]="Arkansas";
	dictionaryData["CA"]="California";
	dictionaryData["CO"]="Colorado";
	dictionaryData["CT"]="Connecticut";
	dictionaryData["DE"]="Delaware";
	dictionaryData["DC"]="District of Columbia";
	dictionaryData["FL"]="Florida";
	dictionaryData["GA"]="Georgia";
	dictionaryData["HI"]="Hawaii";
	dictionaryData["ID"]="Idaho";
	dictionaryData["IL"]="Illinois";
	dictionaryData["IN"]="Indiana";
	dictionaryData["IA"]="Iowa";
	dictionaryData["KS"]="Kansas";
	dictionaryData["KY"]="Kentucky";
	dictionaryData["LA"]="Louisiana";
	dictionaryData["ME"]="Maine";
	dictionaryData["MD"]="Maryland";
	dictionaryData["MA"]="Massachusetts";
	dictionaryData["MI"]="Michigan";
	dictionaryData["MN"]="Minnesota";
	dictionaryData["MS"]="Mississippi";
	dictionaryData["MO"]="Missouri";
	dictionaryData["MT"]="Montana";
	dictionaryData["NE"]="Nebraska";
	dictionaryData["NV"]="Nevada";
	dictionaryData["NH"]="New Hampshire";
	dictionaryData["NJ"]="New Jersey";
	dictionaryData["NM"]="New Mexico";
	dictionaryData["NY"]="New York";
	dictionaryData["NC"]="North Carolina";
	dictionaryData["ND"]="North Dakota";
	dictionaryData["OH"]="Ohio";
	dictionaryData["OK"]="Oklahoma";
	dictionaryData["OR"]="Oregon";
	dictionaryData["PA"]="Pennsylvania";
	dictionaryData["RI"]="Rhode Island";
	dictionaryData["SC"]="South Carolina";
	dictionaryData["SD"]="South Dakota";
	dictionaryData["TN"]="Tennessee";
	dictionaryData["TX"]="Texas";
	dictionaryData["UT"]="Utah";
	dictionaryData["VT"]="Vermont";
	dictionaryData["VA"]="Virginia";
	dictionaryData["WA"]="Washington";
	dictionaryData["WV"]="West Virginia";
	dictionaryData["WI"]="Wisconsin";
	dictionaryData["WY"]="Wyoming";
}

async function getData(){

	
	var endpoint = "https://api.covidtracking.com/v1/us/daily.json";
	//var endpoint = "http://localhost:5000/getAllData"
	var data = await fetch(endpoint);
	data = await data.json();
	
	return data;

}

function addHeader(){
	
	document.getElementById('data_table').append(document.createElement('tr'));
	headers=['Date','Positive','PositiveIncrease','DeathsCell'];
	headers.forEach(element=>{
	
		var header = document.createElement('th');
		header.innerHTML = element;
		document.getElementById('data_table').append(header);
	
	})	

}

async function getStateData(){
	var stateName = document.getElementById("stateName").value;
	if(stateName==="")
		stateName="PA"
	
	//var data = await fetch('http://localhost:5000/getPA');
	var data = await fetch(`https://api.covidtracking.com/v1/states/${stateName}/current.json`);
	data = await data.json();
	stateData=data;
	stateWiseData();
	return data;
}

function populateStates(){
	var states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
	var firstState = document.getElementById("firstState");
	var secondState = document.getElementById("secondState");
	var stateName = document.getElementById("stateName");
	states.forEach(element=>{
		var option = document.createElement('option');
		option.value=element;
		option.text=dictionaryData[element];				
		firstState.append(option);	
		
		option = document.createElement('option');
		option.value=element;
		option.text=dictionaryData[element];		 
		secondState.append(option);
		
		option = document.createElement('option');
		option.value=element;
		option.text=dictionaryData[element];	
		stateName.append(option);
	})

}

async function renderData(){
	initStateData();
	populateStates();
	dateLabel=[];
	casesArray=[];	
	stateData = await getStateData();
	stateWiseData();
	jsonData = await getData();
	addHeader();	
	jsonData.forEach(element=>{
		var newRow = document.createElement('tr');
		
		var dateCell = document.createElement('td');
		var positiveCell = document.createElement('td');
		var positiveIncreaseCell = document.createElement('td');		
		var deathsCell = document.createElement('td');
		
		dateCell.innerHTML = element["date"];
		dateLabel.push(element["date"]);
		casesArray.push(element["positive"]);
		positiveCell.innerHTML = element["positive"];		
		positiveIncreaseCell.innerHTML = element["positiveIncrease"];
		deathsCell.innerHTML = element["death"];
		
		newRow.append(dateCell);
		newRow.append(positiveCell);
		newRow.append(positiveIncreaseCell);
		newRow.append(deathsCell);
		
		document.getElementById("data_table").append(newRow);
		document.getElementById("startDateTime").max=today_date();
		document.getElementById("endDateTime").max=today_date();
		document.getElementById("cStartDate").max=today_date();
		document.getElementById("cEndDate").max=today_date();		
		
	});
	
	dateLabel=dateLabel.reverse();
	casesArray=casesArray.reverse();
	config.data.labels=dateLabel;
	config.data.datasets[0].data=casesArray;
	myLineChart.update();
	
	lastXDays(7);
}

function pickTwoDates(){
		
	startDateTime = document.getElementById("startDateTime").value;
	endDateTime = document.getElementById("endDateTime").value;
	
	startDateTime = startDateTime.replace(/-/g,'');
	endDateTime = endDateTime.replace(/-/g,'');
	if(startDateTime==="" && endDateTime===""){
		alert("Pick one of the dates");
		return;
	}
	
	var startIndex = dateLabel.findIndex(_date=>{return _date==startDateTime});
	if(startIndex==-1){startIndex=0;}
	
	var endIndex = dateLabel.findIndex(_date=>{return _date==endDateTime});
	if(endIndex==-1){endIndex=dateLabel.length-1;}
	console.log(startIndex+" and "+endIndex);
	if(startIndex>endIndex){
		alert("Start Date should be before End Date");
		return;
	}
	
	newDateLabel = dateLabel.slice(startIndex,endIndex);
	newCasesArray = casesArray.slice(startIndex,endIndex);
	config.data.labels=newDateLabel;
	config.data.datasets[0].data=newCasesArray;
	myLineChart.update();
	
	
}

function stateWiseData(){
	
	_stateName = stateMapping();
	document.getElementById("stateWise").innerHTML=`${stateData.deathIncrease} people have died from Coronavirus in ${_stateName} in the past 24 hours, This brings the total number of deaths from the disease to ${stateData.death}, since the start of the pandemic. ${stateData.hospitalizedCurrently} people are currently in ${_stateName} hospitals with Covid-19 complications.${stateData.positive} people have now tested positive for Coronavirus in the state since testing began.`

}

function stateMapping(){
	console.log(dictionaryData);
	var stateCode = document.getElementById('stateName').value;
	console.log(stateCode);
	if(stateCode==="" || stateCode === undefined) 
		return "Pennsylvania";
	else 
		return dictionaryData[stateCode];

}

async function getStateHistoricData(stateCode){
	console.log(stateCode);
	var data = await fetch(`https://api.covidtracking.com/v1/states/${stateCode}/daily.json`);
	data = await data.json();
	return data;
}

function lastXDays(X){
	
	console.log(dateLabel.length);
	console.log(casesArray.length);
	var newDateLabelArray = dateLabel.slice(dateLabel.length-1-X,dateLabel.length-1);
	var newCasesArray = casesArray.slice(casesArray.length-1-X,casesArray.length-1);
	console.log(newDateLabelArray);
	console.log(casesArray);
	
	
	config2.options.title.text=`${X} Day Cases`;
	config2.data.labels=newDateLabelArray;
	config2.data.datasets[0].data=newCasesArray;
	myLineChart2.update();	
	
	
}



async function compareStates(){
	
	var state1 = document.getElementById("firstState").value;
	var state2 = document.getElementById("secondState").value;
	var StartDate = document.getElementById("cStartDate").value;
	var EndDate = document.getElementById("cEndDate").value;
	
	StartDate = StartDate.replace(/-/g,'');
	EndDate = EndDate.replace(/-/g,'');
	
	if(state1=="" || state2=="" || StartDate=="" || EndDate==""){		
		alert('Fields are empty!');
		return;
	}
	if(state1==state2){
		alert("States can't be same");
		return;
	}
	state1Data = await getStateHistoricData(state1);
	state2Data = await getStateHistoricData(state2);
	

	var dateLabel1=[];
	var positiveCases1=[];

	var dateLabel2=[];
	var positiveCases2=[];

	state1Data.forEach(element=>{
		dateLabel1.push(element['date']);
		positiveCases1.push(element['positive']);
	});

	state2Data.forEach(element=>{
		dateLabel2.push(element['date']);
		positiveCases2.push(element['positive']);
	});



	dateLabel1.reverse();
	positiveCases1.reverse();
	dateLabel2.reverse();
	positiveCases2.reverse();
	console.log(dateLabel1);
	console.log(dateLabel2);
	var startIndex1 = dateLabel1.findIndex(_date=>{return _date==StartDate});
	if(startIndex1==-1){startIndex1=0;}
	
	var endIndex1 = dateLabel1.findIndex(_date=>{return _date==EndDate});
	if(endIndex1==-1){endIndex1=dateLabel1.length-1;}


	var startIndex2 = dateLabel2.findIndex(_date=>{return _date==StartDate});
	if(startIndex2==-1){startIndex2=0;}
	
	var endIndex2 = dateLabel2.findIndex(_date=>{return _date==EndDate});
	if(endIndex2==-1){endIndex2=dateLabel1.length-1;}

	config3.data.labels=dateLabel1.slice(startIndex1,endIndex1);

	config3.data.datasets[0].data=positiveCases1.slice(startIndex1,endIndex1);
	config3.data.datasets[0].label=state1;
	config3.data.datasets[1].data=positiveCases2.slice(startIndex1,endIndex1);
	config3.data.datasets[1].label=state2;

	myLineChart3.update();
	
}

function today_date(){
	var _date = new Date();	
	var newMonth=((_date.getMonth()+1).toString().length==2)?(_date.getMonth()+1).toString():"0"+(_date.getMonth()+1).toString();
	var newDate=(_date.getDate().toString().length==2)?_date.getDate().toString():"0"+_date.getDate().toString();
	var modifiedDate = _date.getFullYear()+"-"+newMonth+"-"+newDate;
	return modifiedDate;
}
